const hre = require("hardhat");

async function main() {
  const krnt = await hre.ethers.deployContract("KRNT");
  await krnt.waitForDeployment();
  console.log(`Deployed at ${krnt.target}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});