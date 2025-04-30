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
  let courier: anchor.web3.Keypair

  beforeEach(async () => {
    context = await startAnchor("", [{ name: "contracts", programId: programAddress }], [])
    provider = new BankrunProvider(context)
    program = new Program(IDL, provider)
    courier = anchor.web3.Keypair.generate()

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
    let publicAddress = program.provider.publicKey
    if (!publicAddress) {
      throw new Error("Provider public key is undefined")
    }
    await program.methods.createDelivery(index, reward, eta).rpc()
    await program.methods.acceptDeliveryJob(index, publicAddress).accountsPartial({ courier: courier.publicKey }).signers([courier]).rpc()
    await program.methods.confirmDelivery(index).accountsPartial({ courierAccount: courier.publicKey }).rpc()

    let [deliveryAddress] = PublicKey.findProgramAddressSync([publicAddress.toBuffer(), index.toArrayLike(Buffer, "le", 8)], programAddress)
    let delivery = await program.account.delivery.fetch(deliveryAddress)
    const [vaultPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("escrow"), publicAddress.toBuffer(), new anchor.BN(index).toArrayLike(Buffer, "le", 8)],
      program.programId
    )
    // console.log(JSON.stringify(delivery))
    // console.log(vaultPda.toString())
    expect(delivery.status).eqls("DELIVERED")
  })

  it("Accept Delivery Job", async () => {
    await program.methods.createDelivery(index, reward, eta).rpc()
    let publicAddress = program.provider.publicKey
    if (!publicAddress) {
      throw new Error("Provider public key is undefined")
    }
    await program.methods.acceptDeliveryJob(index, publicAddress).accountsPartial({ courier: courier.publicKey }).signers([courier]).rpc()
    let [deliveryAddress] = PublicKey.findProgramAddressSync([publicAddress.toBuffer(), index.toArrayLike(Buffer, "le", 8)], programAddress)
    let delivery = await program.account.delivery.fetch(deliveryAddress)
    console.log(delivery)
    expect(delivery.status).eqls("IN_PROGRESS")
  })


})
