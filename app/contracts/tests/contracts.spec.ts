import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { Contracts } from "../target/types/contracts"
import { BankrunProvider, startAnchor } from "anchor-bankrun"
import { PublicKey } from "@solana/web3.js"

const IDL = require("../target/idl/contracts.json")
const programAddress = new PublicKey("9TYPgvadsErCiq1PiZ3Us9fY52eLFVhTHnZ9gZUNiEVT")


describe("contracts", () => {


  it("Create a delivery", async () => {
    const context = await startAnchor("", [{ name: "contracts", programId: programAddress }], [])
    const provider = new BankrunProvider(context)

    const program = new Program<Contracts>(IDL, provider)
    // Add your test here.
    const tx = await program.methods.createDelivery(new anchor.BN(2), new anchor.BN(10), new anchor.BN(10)).rpc()
    if (!program.provider.publicKey) {
      throw new Error("Provider public key is undefined")
    }
    const [deliveryAddress] = PublicKey.findProgramAddressSync([program.provider.publicKey.toBuffer(), new anchor.BN(2).toArrayLike(Buffer, "le", 8)], programAddress)
    let delivery = await program.account.delivery.fetch(deliveryAddress)
    console.log(JSON.stringify(delivery))
    console.log("Your transaction signature", tx)
  })
})
