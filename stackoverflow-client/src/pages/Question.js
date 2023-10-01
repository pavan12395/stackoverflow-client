import React,{useEffect}  from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Protect } from '../components/Protect';
import { setQuestionTitle,setQuestionDescription,setRatingReward } from '../redux/actions';


export default function Question()
{
    const user = useSelector(state=>state.user);
    const questionTitle = useSelector(state=>state.questionTitle);
    const questionDescription = useSelector(state=>state.questionDescription);
    const questionRatingReward = useSelector(state=>state.questionRatingReward);
    console.log(questionTitle);
    console.log(questionDescription);
    console.log(questionRatingReward);
    const buttonClickHandler = (e)=>
    {
        e.preventDefault();
        console.log("Clicked!");
    }
    const dispatch = useDispatch();
    if(!user)
    {
        return <Protect/>
    }
    return (
        <div>
          <h1>Ask a Question</h1>
          <form>
            <label htmlFor="questionTitle">Question Title:</label>
            <input
              type="text"
              id="questionTitle"
              name="questionTitle"
              value={questionTitle}
              onChange={(e)=>{dispatch(setQuestionTitle(e.target.value))}}
              required
            /><br /><br />
    
            <label htmlFor="questionDescription">Question Description:</label>
            <textarea
              id="questionDescription"
              name="questionDescription"
              value={questionDescription}
              onChange={(e)=>{dispatch(setQuestionDescription(e.target.value))}}
              rows="4"
              cols="50"
              required
            /><br /><br />
    
            <label htmlFor="ratingReward">Rating Reward</label>
            <input
              type="number"
              step="0.01"
              id="ratingReward"
              value={questionRatingReward}
              name="ratingReward"
              onChange={(e)=>{dispatch(setRatingReward(e.target.value))}}
              required
            /><br /><br />
    
            <button type="submit" onClick={buttonClickHandler}>Connect!</button>
          </form>
        </div>
      );
}