const {ethers} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const quizContrat = await ethers.getContractFactory("JavaScriptQuiz");
    const quiz = await quizContrat.deploy([
            "2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de",
            "c89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6",
            "2a80e1ef1d7842f27f2e6be0972bb708b9a135c38860dbe73c27c3486c34f4de",
            "c89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6",
            "044852b2a670ade5407e78fb2863c51de9fcb96542a07186fe3aeda6bb8a116d",
            "c89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6",
            "ad7c5bef027816a800da1736444fb58a807ef4c9603b7848673f7e3a68eb14a5",
            "044852b2a670ade5407e78fb2863c51de9fcb96542a07186fe3aeda6bb8a116d",
            "ad7c5bef027816a800da1736444fb58a807ef4c9603b7848673f7e3a68eb14a5",
            "ad7c5bef027816a800da1736444fb58a807ef4c9603b7848673f7e3a68eb14a5",
        ]
    );

    console.log("Quiz deployed to:", quiz.target);
    console.log("Quiz deployed to:", quiz.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
