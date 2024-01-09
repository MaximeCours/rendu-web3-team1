import React, { useState } from 'react';
import '../assets/question.css';

const Question = ({ question, options, onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelectOption(option);
  };

  return (
    <div className="question-container">
      <h2 className="question-text">{question}</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <div
            key={index}
            className={`option ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
