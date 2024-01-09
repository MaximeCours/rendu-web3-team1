import React, { useState } from 'react';
import Question from './Question';

const Quiz = () => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionIndex]: option,
    });
  };

  const questions = [
    {
      question: 'Question 1',
      options: ['Rep 1', 'Rep 2', 'Rep 3', 'Rep 4'],
    }
  ];

  return (
    <div>
      {questions.map((q, index) => (
        <Question key={index} question={q.question} options={q.options} onSelectOption={(option) => handleOptionSelect(index, option)} />
      ))}
      <div>
        <button onClick={() => console.log('Options sélectionnées :', selectedOptions)}>Soumettre</button>
      </div>
    </div>
  );
};

export default Quiz;
