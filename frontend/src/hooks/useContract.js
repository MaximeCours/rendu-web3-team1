import { useEffect, useState } from "react";
import { ethers } from "ethers";
import JavaScriptQuiz from "../contracts/JavaScriptQuiz.json";
import { useLoadingStore } from "../stores/loadingStore.js";

const useContract = () => {
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      // On prépare la connexion au smart contract
      const contractAddress = "0xE0cBcC25251Ab3888e008BB2E745767eaa2b8b5d";
      const contractABI = JavaScriptQuiz.abi;

      try {
        // On se connecte au wallet de l'utilisateur
        setIsLoading(true);

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(accounts);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(contract);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    initWeb3();
  }, []);

  const loadQuestions = async () => {
    try {
      const loadedQuestions = [
        {
          statement:
            "Quelle est la valeur de la variable y après l'exécution de ce code ?",
          answers: ["1", "2", "3", "4"],
        },
        {
          statement:
            "Quelle est la valeur de la variable x après l'exécution de ce code ?",
          answers: ["7", "9", "2", "4"],
        },
      ];

      return loadedQuestions;
    } catch (error) {
      console.error("Error loading questions:", error);
      throw error;
    }
  };

  const submitAnswers = async (answers) => {
    try {
      setIsLoading(true);
      await contract.submitAnswers(answers);
      console.log("Answers submitted successfully!", answers);
    } catch (error) {
      console.error("Error submitting answers:", error);
      throw error;
    }
  };

  return { accounts, contract, loadQuestions, submitAnswers };
};

export default useContract;
