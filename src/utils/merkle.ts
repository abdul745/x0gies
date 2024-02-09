import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { ethers } from "ethers";
import { whitelist } from "./whitelist";
export function merkelRoot() {
  let leaves = whitelist.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  const root = merkleTree.getHexRoot();
  console.log("root", root);
}
export function merkleFunc(address: string) {
  // Whitelist array from you database

  // This variable will contain the signature we need
  let proof = [];
  // Parse params passed to server and get user wallet address

  if (whitelist.includes(address)) {
    const { keccak256 } = ethers.utils;
    let leaves = whitelist.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const root = merkleTree.getHexRoot();
    let hashedAddress = keccak256(address);
    proof = merkleTree.getHexProof(hashedAddress);
    console.log(root, proof);
  }
  return proof;
}
