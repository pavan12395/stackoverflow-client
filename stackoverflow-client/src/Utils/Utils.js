import { Skills } from '../Constants/constants';
import {StackOverflowClient} from '../proto/stackoverflow_grpc_web_pb';
import {SignUpRequest,CheckTokenRequest,Authorization,RequestHeaders,GetTokenRequest,LogoutRequest,LoginRequest} from '../proto/stackoverflow_pb';
import {SKILL_NAME,SKILL_DIFFICULTY,Skill} from '../proto/stackoverflow_pb';
export function getGrpcClient()
{
    const client = new StackOverflowClient("http://localhost:9090",null,null)
    console.log(client);
    return client;
}

export async function signUpHandler(client,username,password,description,skills)
{
    const request = new SignUpRequest();
    request.setUsername(username);
    request.setPassword(password);
    request.setDescription(description);
    skills = skills.map((skill)=>
    {
        let new_skill = new Skill();
        new_skill.setSkillname(SKILL_NAME[skill.name])
        new_skill.setDifficulty(SKILL_DIFFICULTY[skill.difficulty])
        return new_skill
    })
    request.setSkillsList(skills);
    let response = await new Promise((resolve,reject)=>
    {
        client.signUp(request,null,(err,response)=>
        {
            if(err)
            {
                reject(err.message);
            }
            else
            {
                response = response.toObject();
                resolve(response)
            }
        });
    });
    console.log(response)
    return response
}

export function statusCodeCheck(response)
{
    if(response.responseheaders.status!=0)
    {
        return response.responseheaders.errormessagesList[0];
    }
    else
    {
        return null;
    }
}

export function AuthorizationFunc(accessToken,refreshToken)
{
    let authorization = new Authorization();
    authorization.setAccesstoken(accessToken);
    authorization.setRefreshtoken(refreshToken);
    return authorization;
}

export function RequestHeadersFunc(authorization)
{
    let requestHeaders = new RequestHeaders()
    requestHeaders.setAuthorization(authorization)
    return requestHeaders;
}

export async function checkTokenHandler(client,accessToken,refreshToken)
{
    let authorization = AuthorizationFunc(accessToken,refreshToken)
    let requestHeaders = RequestHeadersFunc(authorization)
    let request = new CheckTokenRequest()
    request.setRequestheaders(requestHeaders)
    let response = await new Promise((resolve,reject)=>
    {
        client.checkToken(request,null,(err,response)=>
        {
            if(err)
            {
                reject(err.message);
            }
            else
            {
                response = response.toObject();
                resolve(response)
            }
        });
    })
    return response;
}

export async function getTokenHandler(client,refreshToken)
{
    console.log("Calling getToken Handler");
    let authorization = AuthorizationFunc("",refreshToken)
    let requestHeaders = RequestHeadersFunc(authorization)
    let request = new GetTokenRequest();
    request.setRequestheaders(requestHeaders)
    let response = await new Promise((resolve,reject)=>
    {
        client.getToken(request,null,(err,response)=>{
        if(err)
        {
            reject(err.message);
        }
        else
        {
            response = response.toObject();
            resolve(response);
        }});
    });
    return response;

}
export function store(key,value)
{
    window.localStorage.setItem(key,value);
}

export async function logOutHandler(client,accessToken,refreshToken)
{
    console.log("Calling logout handler");
    let authorization = AuthorizationFunc(accessToken,refreshToken)
    let requestHeaders = RequestHeadersFunc(authorization)
    let request = new LogoutRequest();
    request.setRequestheaders(requestHeaders);
    console.log(client);
    let response =await new Promise((resolve,reject)=>
    {
        client.logout(request,null,(err,response)=>
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                response = response.toObject();
                resolve(response);
            }
        });
    });
    return response;
}

export async function loginHandler(client,username,password)
{
    let request = new LoginRequest();
    request.setUsername(username);
    request.setPassword(password);
    let response = await new Promise((resolve,reject)=>
    {
        client.login(request,null,(err,response)=>
        {
            if(err)
            {
                reject(err.message);
            }
            else
            {
                response = response.toObject();
                resolve(response);
            }
        });
    });
    return response;
}