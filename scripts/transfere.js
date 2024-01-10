const hre = require("hardhat");
const {ethers} = require("ethers");


async function main() {
    const privateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
    const wallet = new hre.ethers.Wallet(privateKey, hre.ethers.provider);

    const [sender] = await hre.ethers.getSigners(); // Le premier compte préfinancé
    const receiverAddress = "0x2409a32E84D30926d8CB213e36cf88d468439BEe"; // Remplacez par votre adresse

    const amount = hre.ethers.parseEther("1.0"); // Montant en ETH à envoyer


    const tx = await wallet.sendTransaction({
        to: receiverAddress,
        value: amount
    });

    console.log(`Transaction hash: ${tx.hash}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

