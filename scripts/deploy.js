const {ethers} = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const quizContrat = await ethers.getContractFactory("JavaScriptQuiz");
  const quiz = await quizContrat.deploy("0x1572b593c53d839d80004aa4b8c51211864104f06ace9e22be9c4365b50655ea");

  console.log("Quiz deployed to:", quiz.target);
  console.log("Quiz deployed to:", quiz.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
