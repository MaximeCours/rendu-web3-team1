import React from 'react';
import './QuizResult.css'; // Importez le fichier CSS

const QuizResult = ({ quizTitle, score, timeTaken }) => {
    return (
      <div className="quiz-completed-screen">
        <div className="content">
          <h2>{`Félicitations ! Vous avez complété la leçon`}</h2>
          <p className="quiz-title">{quizTitle}</p>
  
          <div className="info-container">
            <div className="info-box green">
              <h3>Score</h3>
              <p className="info-value">{score} %</p>
            </div>
  
            <div className="info-box purple">
              <h3>Temps pris</h3>
              <p className="info-value">{`${timeTaken} secondes`}</p>
            </div>
          </div>
  
          <button onClick={() => window.location.reload()}>Recommencer</button>
        </div>
      </div>
    );
  };

export default QuizResult;
