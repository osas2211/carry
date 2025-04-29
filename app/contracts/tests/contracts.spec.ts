import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { Contracts } from "../target/types/contracts"
import { BankrunProvider, startAnchor } from "anchor-bankrun"
import { PublicKey } from "@solana/web3.js"
import { expect } from "chai"
import { ProgramTestContext } from "solana-bankrun"

const IDL = require("../target/idl/contracts.json")
const programAddress = new PublicKey("9TYPgvadsErCiq1PiZ3Us9fY52eLFVhTHnZ9gZUNiEVT")


describe("contracts", () => {
  let context: ProgramTestContext
  let provider: BankrunProvider
  let program: Program<Contracts>
  let index = new anchor.BN(2)
  let reward = new anchor.BN(0)
  let eta = new anchor.BN(170947)

  beforeEach(async () => {
    context = await startAnchor("", [{ name: "contracts", programId: programAddress }], [])
    provider = new BankrunProvider(context)
    program = new Program(IDL, provider)
  })

  it("Create a delivery", async () => {
    await program.methods.createDelivery(index, reward, eta).rpc()
    if (!program.provider.publicKey) {
      throw new Error("Provider public key is undefined")
    }
    const [deliveryAddress] = PublicKey.findProgramAddressSync([program.provider.publicKey.toBuffer(), index.toArrayLike(Buffer, "le", 8)], programAddress)
    let delivery = await program.account.delivery.fetch(deliveryAddress)
    console.log(JSON.stringify(delivery))
    expect(delivery.status).eqls("ACTIVE")
  })

  it("Confirm a Delivery", async () => {
    await program.methods.createDelivery(index, reward, eta).rpc()
    await program.methods.confirmDelivery(index).rpc()
    let publicAddress = program.provider.publicKey
    if (!publicAddress) {
      throw new Error("Provider public key is undefined")
    }
    let [deliveryAddress] = PublicKey.findProgramAddressSync([publicAddress.toBuffer(), index.toArrayLike(Buffer, "le", 8)], programAddress)
    let delivery = await program.account.delivery.fetch(deliveryAddress)
    const [vaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), publicAddress.toBuffer(), new anchor.BN(index).toArrayLike(Buffer, "le", 8)],
      program.programId
    )
    // console.log(JSON.stringify(delivery))
    // console.log(vaultPda.toString())
    expect(delivery.status).eqls("DELIVERED")
  })


})
