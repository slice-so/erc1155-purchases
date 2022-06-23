import { ethers } from "hardhat"
import addresses from "../addresses.json"
import { ERC1155Purchases } from "../typechain-types/ERC1155Purchases"

// Set these before proceeding
const env = "mainnet"
const initOwner = "" // The account which will operate the contract
const slicerId = 1 // The ID of the slicer that will be able to interact with this contract

async function main() {
  console.log("deploying")

  const CONTRACT = await ethers.getContractFactory("ERC1155Purchases")
  const contract = (await CONTRACT.deploy(
    addresses[env]["ProductsModule"],
    slicerId
  )) as ERC1155Purchases
  await contract.deployed()

  await contract.transferOwnership(initOwner)

  console.log("deploying completed successfully! Address: " + contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
