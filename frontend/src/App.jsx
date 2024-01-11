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
  const [score, setScore] = useState(0);
  const quizTitle = "Les bases du web3"; // mettre le nom du quiz

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et mettre à jour l'état
    if (accounts && accounts.length > 0) {
      setIsLoggedIn(true);
    }
  }, [accounts]);

  useEffect(() => {
    if (contract) {
      // On écoute les événements émis par le smart contract
      contract.on("AnswerResult", (details) => {
        setQuizCompleted(true);
        setIsLoading(false);
        setScore(parseInt(details.toString()) * 10);
      });
    }
  }, [contract]);

  if (isLoading) {
    return <Modal />;
  }

  if (quizCompleted) {
    return <QuizResult quizTitle={quizTitle} score={score} />;
  }

  if (isLoggedIn) {
    return <Quiz />;
  }

  return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
}

export default App;
