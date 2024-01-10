import React, { useEffect, useState } from "react";
import useContract from "./ContractLogic";

const Quiz = () => {
  const { accounts, contract, loadQuestions, submitAnswers } = useContract();
  const [questions, setQuestions] = useState([]);
  const [answersIndex, setAnswerIndex] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedQuestions = await loadQuestions();
        setQuestions(loadedQuestions);
        setAnswers(new Array(loadedQuestions.length).fill(""));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [contract]);

  const handleChoiceClick = (questionIndex, answerIndex) => {
    const newAnswersIndex = [...answersIndex];
    newAnswersIndex[questionIndex] = answerIndex;
    setAnswerIndex(newAnswersIndex);
  };

  const handleSubmitAnswers = async () => {
    try {
      await submitAnswers(answersIndex);
      alert(`Answers submitted successfully! ${answersIndex}`);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  function displayQuestions() {
    return questions.map((question, questionIndex) => (
      <li key={questionIndex}>
        <h3>Question {questionIndex + 1}</h3>
        <p>{question.question}</p>
        <ul>
          {question.choices.map((answer, answerIndex) => (
            <li key={answerIndex}>
              <button
                onClick={() => handleChoiceClick(questionIndex, answerIndex)}
                className={answersIndex[questionIndex] === answerIndex ? "selected" : ""}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </li>
    ));
  }

  return (
    <>
      <div>
        <h1>Quiz App</h1>
        <ul>{displayQuestions()}</ul>
        <button onClick={handleSubmitAnswers}>Valider</button>
      </div>

      {error && <p className="error">{error}</p>}
    </>
  );
};

export default Quiz;
