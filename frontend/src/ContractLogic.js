import { useEffect, useState } from "react";
import { ethers } from "ethers";
import JavaScriptQuiz from "./contracts/JavaScriptQuiz.json";

const useContract = () => {
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      // On prépare la connexion au smart contract
      const contractAddress = "0xE0cBcC25251Ab3888e008BB2E745767eaa2b8b5d";
      const contractABI = JavaScriptQuiz.abi;

      try {
        // On se connecte au wallet de l'utilisateur
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccounts(accounts);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(contract);
      } catch (error) {
        console.error(error);
      }
    };

    initWeb3();
  }, []);

  const loadQuestions = async () => {
    try {
      //get questions from the contract
      const loadedQuestions = await contract.quizzes();
      console.log("Questions loaded successfully!", loadedQuestions);
      return loadedQuestions;
    } catch (error) {
      console.error("Error loading questions:", error);
      throw error;
    }
  };

  const submitAnswers = async (answers) => {
    try {
      // Appeler la fonction du contrat pour soumettre les réponses
      // await contract.methods.submitAnswers(answers).send({ from: 'YOUR_SENDER_ADDRESS' });
      console.log("Answers submitted successfully!", answers);
    } catch (error) {
      console.error("Error submitting answers:", error);
      throw error;
    }
  };

  return { accounts, contract, loadQuestions, submitAnswers };
};

export default useContract;
