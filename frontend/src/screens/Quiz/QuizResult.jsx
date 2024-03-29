import React from "react";
import "./quiz-result.css";

const QuizResult = ({ quizTitle, score }) => {
  return (
    <div className="quiz-completed-screen">
      <div className="content">
        <h2>Félicitations ! Vous avez complété la leçon</h2>
        <p className="quiz-title">{quizTitle}</p>

        <div className="info-container">
          <div className="info-box green">
            <h3>Score</h3>
            <p className="info-value">{`${score} %`}</p>
          </div>
        </div>

        <button onClick={() => window.location.reload()}>Recommencer</button>
      </div>
    </div>
  );
};

export default QuizResult;
