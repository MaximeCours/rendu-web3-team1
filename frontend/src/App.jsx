import { useEffect, useState } from "react";
import LoginScreen from "./screens/Login/LoginScreen.jsx";
import Quiz from "./screens/Quiz/Quiz.jsx";
import useContract from "./hooks/useContract.js";
import Modal from "./screens/modal/Modal.jsx";

function App() {
  const { contract, accounts, isLoading } = useContract();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        alert("Bonne réponse : " + details);
        console.log("Bonne réponse : ", details);
      });

      contract.on("WrongAnswer", (details) => {
        alert("Mauvaise réponse : " + details);
        console.log("Mauvaise réponse : ", details);
      });
    }
  }, [contract]);

  return (
    <>
     {isLoading && (
        <Modal/>     
      )}
      {isLoggedIn ? (
        <Quiz />
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

export default App;
