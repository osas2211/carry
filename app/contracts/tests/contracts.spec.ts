import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { Contracts } from "../target/types/contracts"
import { BankrunProvider, startAnchor } from "anchor-bankrun"
import { PublicKey } from "@solana/web3.js"
import { expect } from "chai"

const IDL = require("../target/idl/contracts.json")
const programAddress = new PublicKey("9TYPgvadsErCiq1PiZ3Us9fY52eLFVhTHnZ9gZUNiEVT")


describe("contracts", () => {


  it("Create a delivery", async () => {
    const context = await startAnchor("", [{ name: "contracts", programId: programAddress }], [])
    const provider = new BankrunProvider(context)

    const program = new Program<Contracts>(IDL, provider)

    let index = new anchor.BN(2)
    let reward = new anchor.BN(100)
    let eta = new anchor.BN(170947)
    const tx = await program.methods.createDelivery(index, reward, eta).rpc()
    if (!program.provider.publicKey) {
      throw new Error("Provider public key is undefined")
    }
    const [deliveryAddress] = PublicKey.findProgramAddressSync([program.provider.publicKey.toBuffer(), index.toArrayLike(Buffer, "le", 8)], programAddress)
    let delivery = await program.account.delivery.fetch(deliveryAddress)
    console.log(JSON.stringify(delivery))
    console.log("Your transaction signature", tx)
    expect(delivery.index.toString()).eqls(index.toString())
  })
})
