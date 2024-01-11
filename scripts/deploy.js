const {ethers} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const quizContrat = await ethers.getContractFactory("JavaScriptQuiz");
    const quiz = await quizContrat.deploy([
            "0x50bc355f69e4718ae1a774386c3274ed8f994c9fefba3f8bcd5affbf06621e59",
            "0xdd9b5c76369780e1d367068c34d05aa94055beb50c57475a38bbbd6656baddb2",
            "0x9a057d3a3d96ae47f60dd12251affcbdabe93ff1e9f15d274b4772a504d27e31",
            "0x6379d10b461d2cca2e84173cf72afcb0f7de6f07bc477ef21c7227374f7f7ae8",
            "0x2b1ce1139abb235f320157390f95cc6d40f46868c2709d4638f25ef5630bff99",
            "0xa16e5d8df4fc964d45eecd506ec61849621fba3b03c8ec14bfa327508edaeb94",
            "0xbcdc00ea4b419947c448405595f3ee4ef348d3d276cc2216f41de8bc0c92a52f",
            "0x518d00cf483043b633111f13d74119768d5f9b9a76f7e6e1b8b2762e014a7588",
            "0xdbd42a7335c54d88de77a8c0863a05743992e9075c89a0bd0c799df3229b94f0",
            "0x85c2378c90944caa23914439255f7a2c66842bb2f8d2150964c470d1e8fca194",
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
