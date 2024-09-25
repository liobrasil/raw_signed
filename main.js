const { ethers } = require("ethers");

async function buildAndSignTransaction() {
  // ---------------  part 1
  // Private key of the sender
  const privateKey = "";

  // Create a wallet
  const wallet = new ethers.Wallet(privateKey);

  const address = wallet.address;
  console.log("Address:", address);

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

  // ---------------  part 2
  const tx1Raw =
    "0xf8ad82e69c85012a05f200830329189455d398326f99059ff775485246999027b319795580b844a9059cbb0000000000000000000000006df68f71f19081751850160118fc755bfeb036120000000000000000000000000000000000000000000000056bc75e2d631000008193a0ade014e655a2d1645efb5f37a142c2369ab96d2d962861dd353fa33fe15b76cda041b291fb742d07c0d475cb2611e9dd6010bbd052c79f99e73c7f9e3653afb6f7";
  const tx2Raw =
    "0xf8ec8307f58584b8c6fe72830927c094bddbcbaa9cf9603b7055aad963506ede71692f1280b8830000000300000000000000000000000000000000000000000000000087250559b9145f9000000000000000000000000000000000000000000000011f35cc4934f0b52a80bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c55d398326f99059ff775485246999027b319795500006400000000000000000af935e000000000000000008193a0f63bed83d054bdecfb6852f980ed62f35922fe5b68296b603b290a3eff41fabea04b73872c7e68f541bc97eba52abf956eac4a0e198b762e1f9a872336f6748eed";

  const hashTx1Raw = ethers.keccak256(tx1Raw).slice(2);
  console.log("Hash of tx1Raw:", hashTx1Raw);
  const hashTx2Raw = ethers.keccak256(tx2Raw).slice(2);
  console.log("Hash of tx2Raw:", hashTx2Raw);
  console.log(hashTx1Raw + hashTx2Raw);

  const hashedConcat = ethers
    .keccak256("0x" + hashTx1Raw + hashTx2Raw)
    .slice(2);

  // ---------------  mode 1
  const key = new ethers.SigningKey("0x" + privateKey);
  const signatureSerialized = key.sign("0x" + hashedConcat).serialized;
  const signatureCompactSerialized = key.sign(
    "0x" + hashedConcat
  ).compactSerialized;
  console.log("Signature mode 1:", signatureSerialized);
  console.log("Signature mode 1:", signatureCompactSerialized);
  console.log(
    "Signature mode _:",
    "0x83e4b3a6af20e58315554b5bc38a8398cfca44a75d42973a4454378b0dc9cae63c229b52341d1ddfc4e3ad4360e518c1f1363e2d21fcba507e8e2e10e266edd201"
  );
}

buildAndSignTransaction();
