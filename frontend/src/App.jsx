import {useEffect, useState} from "react";
import {ethers} from "ethers";
import JavaScriptQuiz from "./contracts/JavaScriptQuiz.json"

function App() {
  const mockQuestions = [
    {
      statement: "Quelle est la valeur de la variable y après l'exécution de ce code ?",
      answers: [
        "1",
        "2",
        "3",
        "4"
      ]
    },
    {
      statement: "Quelle est la valeur de la variable x après l'exécution de ce code ?",
      answers: [
        "7",
        "9",
        "2",
        "4"
      ]
    },
  
  ]


  const [accounts, setAccounts] = useState([])
  const [contract, setContract] = useState(null)
  const [questions, setQuestions] = useState([])
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [answers, setAnswers] = useState([]);
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

      loadQuestions()
    }catch (error){
      console.error(error)
    }
  }

  

  const loadQuestions = async () => {
    try {
     // const questionsCount = await contract.methods.getQuestionsCount().call();
      const loadedQuestions = [];

     // for (let i = 0; i < questionsCount; i++) {
        //const [statement, answers] = await contract.methods.getQuestion(i).call();
        //loadedQuestions.push({ statement, answers });
     // }

      //setQuestions(loadedQuestions);
      setQuestions(mockQuestions);
      setSelectedAnswers(new Array(loadedQuestions.length).fill(''));
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  

  const submitAnswers = async () => {
    try {
      //await contract.methods.submitAnswers(selectedAnswers).send({ from: 'YOUR_SENDER_ADDRESS' });
      console.log('Answers submitted successfully!', answers);
      alert(`Answers submitted successfully! : ${answers}`);
      setError('')
    } catch (error) {
      setError(error.reason)
      console.error('Error submitting answers:', error);
    }
  };
  

  const handleChoiceClick = (questionIndex, answerIndex) => {
    const question = questions[questionIndex];
    const answer = question.answers[answerIndex];

    const newSelectedChoices = [...selectedChoices];
    newSelectedChoices[questionIndex] = answerIndex;
    setSelectedChoices(newSelectedChoices);
console.log('selectedChoices', selectedChoices)
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };



  function displayQuestions() {
    return  questions.map((question, questionIndex) => (
      <li key={questionIndex}>
        <h3>Question {questionIndex + 1}</h3>
        <p>{question.statement}</p>
        <ul>
          {question.answers.map((answer, answerIndex) => (
            <li key={answerIndex}>
              <button onClick={() => handleChoiceClick(questionIndex, answerIndex)}
              className={selectedChoices[questionIndex] === answerIndex ? 'selected' : ''}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </li>
    ))
  }

  return <>
       <div>
      <h1>Quiz App</h1>
      <ul>
        {displayQuestions()}
      </ul>
      <button onClick={submitAnswers}>Valider</button>
    </div>

    {error && <p className="error">{error}</p>}
  </>
}

export default App
