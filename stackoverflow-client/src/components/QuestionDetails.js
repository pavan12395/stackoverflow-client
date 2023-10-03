// QuestionDetails.js

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function QuestionDetails() {
  const questionDetails = useSelector(state=>state.questionDetails);  
  if (!questionDetails) {
    return null;
  }

  const { title, description, rewardRating } = questionDetails;

  return (
    <div className="question-details">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="reward-rating">
        ⭐ Reward Rating: {rewardRating}
      </div>
    </div>
  );
}