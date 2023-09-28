import {StackOverflowClient} from '../proto/stackoverflow_grpc_web_pb';
import {GreetRequest} from '../proto/stackoverflow_pb';

console.log(StackOverflowClient)



export async function getGrpcClient()
{
    const req = new GreetRequest();
    req.setMessage("hello world");
    console.log(req);
    const client = new StackOverflowClient("http://localhost:8081",null,null)
    console.log(client);
    client.greet(req,null,(err,response)=>
    {
        console.log(response)
    })
    return client;
}