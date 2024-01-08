import {useEffect, useState} from "react";
import {ethers} from "ethers";
import JavaScriptQuiz from "./contracts/JavaScriptQuiz.json"

function App() {
  const [account, setAccount] = useState('')

  useEffect(() => {
    initWeb3()
  }, [])

  async function initWeb3(){
    const contractAddress = "0xE0cBcC25251Ab3888e008BB2E745767eaa2b8b5d"
    const contractABI = JavaScriptQuiz.abi

    try {
      const account = await window.ethereum.request({method: "eth_requestAccounts"})
      setAccount(account)
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)

      contract
      console.log("Contract:", await contract.question())
    }catch (error){
      console.error(error)
    }
  }

  return <>{account}</>
}

export default App
