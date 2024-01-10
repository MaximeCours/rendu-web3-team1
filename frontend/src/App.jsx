import { useEffect, useState } from "react";
import LoginScreen from "./screens/Login/LoginScreen.jsx";
import Quiz from "./screens/Quiz/Quiz.jsx";
import useContract from "./hooks/useContract.js";
import Modal from "./screens/modal/Modal.jsx";
import QuizResult from "./screens/Quiz/QuizResult.jsx";
import { useLoadingStore } from "./stores/loadingStore.js";

function App() {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const { contract, accounts } = useContract();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const quizTitle = "Les bases du web3"; // mettre le nom du quiz
  const timeTaken = 100; // mettre le temps reel
  const score = 100; // mettre le score reel

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et mettre à jour l'état
    if (accounts && accounts.length > 0) {
      setIsLoggedIn(true);
    }
  }, [accounts]);

  useEffect(() => {
    if (contract) {
      // On écoute les événements émis par le smart contract
      contract.on("CorrectAnswer", (details) => {
        setQuizCompleted(true);
        setIsLoading(false);
        alert("Bonne réponse : " + details);
        console.log("Bonne réponse : ", details);
      });

      contract.on("WrongAnswer", (details) => {
        setQuizCompleted(true);
        setIsLoading(false);
        alert("Mauvaise réponse : " + details);
        console.log("Mauvaise réponse : ", details);
      });
    }
  }, [contract]);

  if (isLoading) {
    return <Modal />;
  }

  if (quizCompleted) {
    return (
      <QuizResult quizTitle={quizTitle} score={score} timeTaken={timeTaken} />
    );
  }

  if (isLoggedIn) {
    return <Quiz />;
  }

  return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
}

export default App;
