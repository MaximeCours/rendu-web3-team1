import {useEffect, useState} from "react";
import {ethers} from "ethers";
import JavaScriptQuiz from "./contracts/JavaScriptQuiz.json"

function App() {
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
    const contractAddress = "0xc84878373ce21305f37f071a0Bf1F5853d102Fce"
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
      console.log("Answer submitted : ", input)
      setError('')
    } catch (error) {
      setError(error.reason)
    }
  }

  return <>
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
  </>
}

export default App
