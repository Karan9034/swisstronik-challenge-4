const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

const CONTRACT_ADDRESS = "0x3E80749cbA11729B31Fb6ec0b76804A416eE77BA";
const NUMBER = 10;

const sendShieldedTransaction = async (signer, destination, data, value) => {
    const RPC_URL = hre.network.config.url;
    const [encryptedData] = await encryptDataField(RPC_URL, data);
    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    });
}

async function main() {
    const [signer] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("KRNT");
    const contract = contractFactory.attach(CONTRACT_ADDRESS);
    const burnTxn = await sendShieldedTransaction(signer, CONTRACT_ADDRESS, contract.interface.encodeFunctionData("burn", [NUMBER]), 0);
    await burnTxn.wait();
    console.log("Transaction Receipt: ", burnTxn);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})