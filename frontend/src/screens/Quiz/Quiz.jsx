import { useEffect, useState } from "react";
import useContract from "../../hooks/useContract.js";
import "./quiz.css";

const Quiz = () => {
  const { accounts, contract, loadQuestions, submitAnswers } = useContract();
  const [questions, setQuestions] = useState([]);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [answers, setAnswers] = useState([]);
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
    const newSelectedChoices = [...selectedChoices];
    newSelectedChoices[questionIndex] = answerIndex;
    setSelectedChoices(newSelectedChoices);

    const question = questions[questionIndex];
    const answer = question.answers[answerIndex];
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmitAnswers = async () => {
    try {
      await submitAnswers(answers);
      alert(`Answers submitted successfully! ${answers}`);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  function displayQuestions() {
    return questions.map((question, questionIndex) => (
      <li key={questionIndex}>
        <h3>Question {questionIndex + 1}</h3>
        <p>{question.statement}</p>
        <ul>
          {question.answers.map((answer, answerIndex) => (
            <li key={answerIndex}>
              <button
                onClick={() => handleChoiceClick(questionIndex, answerIndex)}
                className={
                  selectedChoices[questionIndex] === answerIndex
                    ? "selected"
                    : ""
                }
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
        <button className="submit" onClick={handleSubmitAnswers}>Valider</button>
      </div>

      {error && <p className="error">{error}</p>}
    </>
  );
};

export default Quiz;
