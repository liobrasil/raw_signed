const { ethers } = require("ethers");

async function buildAndSignTransaction() {
  // Private key of the sender
  const privateKey = "";

  // Create a wallet
  const wallet = new ethers.Wallet(privateKey);

  // Define the transaction
  const tx = {
    to: "0x659Dc87Afd2E850F4BB243318c4DDE3993b35105", // Replace with recipient address
    value: ethers.parseEther("0.01"), // 0.01 ETH
    gasLimit: 21000, // Standard gas limit for a simple ETH transfer
    gasPrice: ethers.parseUnits("10", "gwei"), // Gas price in gwei
    nonce: 1000, // Get the nonce (transaction count)
    chainId: 56, // Mainnet
  };

  // Sign the transaction
  const signedTx = await wallet.signTransaction(tx);
  console.log("Signed Transaction:", signedTx);
}

buildAndSignTransaction();
