import { useEffect, useState } from "react";
import { ethers } from "ethers";
import JavaScriptQuiz from "../contracts/JavaScriptQuiz.json";
import { useLoadingStore } from "../stores/loadingStore.js";
import { useContractStore } from "../stores/contractStore.js";

const useContract = () => {
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);
  const contract = useContractStore((state) => state.contract);
  const setContract = useContractStore((state) => state.setContract);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!contract) {
      // On se connecte au wallet de l'utilisateur
      (async () => {
        // On prépare la connexion au smart contract
        const contractAddress = "0x6C5bffB2a3954c9ABe696624C318C3247014Fecd";
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
      })();
    }
  }, []);

  const loadQuestions = async () => {
    try {
      const loadedQuestions = await contract.getQuizzes();
      return loadedQuestions;
    } catch (error) {
      console.error("Error loading questions:", error);
      throw error;
    }
  };

  const submitAnswers = async (answers) => {
    try {
      setIsLoading(true);
      await contract.answerQuiz(answers);
    } catch (error) {
      console.error("Error submitting answers:", error);
      throw error;
    }
  };

  return { accounts, contract, loadQuestions, submitAnswers };
};

export default useContract;
