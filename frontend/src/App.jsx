import {useEffect, useState} from "react";
import {ethers} from "ethers";
import JavaScriptQuiz from "./contracts/JavaScriptQuiz.json"
import Login from "./login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState(null)
  const [question, setQuestion] = useState('')
  const [answers, setAnswers] = useState([])
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    initWeb3()
  }, [])

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté et mettre à jour l'état
    if (accounts && accounts.length > 0) {
      setIsLoggedIn(true);
    }
  }, [accounts]);

  useEffect(() => {
    if (contract){
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
  }, [contract])

  async function initWeb3(){
    // On prépare la connexion au smart contract
    const contractAddress = "0xE0cBcC25251Ab3888e008BB2E745767eaa2b8b5d"
    const contractABI = JavaScriptQuiz.abi

    try {
      // On se connecte au wallet de l'utilisateur
      const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
      setAccounts(accounts)
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      setContract(contract)

      // On récupère les données du smart contract (Question et réponses)
      const question = await contract.question()
      let contractAnswers = []
      for (let i = 0; i < 4; i++) {
        contractAnswers.push(await contract.choices(i))
      }
      setAnswers(contractAnswers)
      setQuestion(question)
    }catch (error){
      console.error(error)
    }
  }

  async function handleSubmit() {
    try {
      // On soumet la réponse de l'utilisateur au contrat
      await contract.answerQuiz(input)
      setError('')
    } catch (error) {
      setError(error.reason)
    }
  }

  return <>
  {isLoggedIn ? (
    <>
    <h2>Current account : {accounts[0]}</h2>
    <h3>{question}</h3>
    <ul>
      {answers.map((answer, index) => (
        <li key={index}>{answer}</li>
      ))}
    </ul>
    <input
        type="text"
        placeholder="Your answer"
        value={input}
        onChange={(e) => setInput(e.target.value)}
    />
    <button onClick={handleSubmit}>Submit</button>

    {error && <p className="error">{error}</p>}
    </> )    : (
      <Login onLogin={() => setIsLoggedIn(true)} />
    )}
  </>
}

export default App
