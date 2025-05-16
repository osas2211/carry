import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useMemo } from "react";
import * as anchor from "@coral-xyz/anchor";

import { Contracts as DeliverProgram } from "@/utils/anchor/contracts";
import idl from "@/utils/anchor/contracts.json";
import { useConnection } from "../../utils/ConnectionProvider";
import { useAnchorWallet } from "@/utils/useAnchorWallet";
import { useMutation, useQuery } from "@tanstack/react-query";
import { alertAndLog } from "../../utils/alertAndLog";
import {
  AssignDeliveryArgs,
  confirmDeliveryArgs,
  CreateDeliveryArgs,
} from "./program-types";
import { useGetTotalUserJobs } from "@/hooks/api-hooks/useDeliveryJobs";

const DELIVERY_PROGRAM_ID = "6uJXKENZwMPUQPnzH7auTcb1Y6GXtbAeK65XPyD2crkj";

export function useDeliveryProgram() {
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const { data } = useGetTotalUserJobs();

  const deliveryProgramId = useMemo(() => {
    return new PublicKey(DELIVERY_PROGRAM_ID);
  }, []);

  const getDeliveryPDA = useCallback(
    (idx: number) => {
      if (!anchorWallet) throw new Error("Not connected");
      const creatorBuf = anchorWallet.publicKey.toBuffer();
      const ixBuf = new anchor.BN(idx).toArrayLike(Buffer, "le", 8);
      const [pda, bump] = anchor.web3.PublicKey.findProgramAddressSync(
        [creatorBuf, ixBuf],
        deliveryProgramId
      );
      return { pda, bump };
    },
    [anchorWallet, deliveryProgramId]
  );

  const provider = useMemo(() => {
    if (!anchorWallet) {
      return;
    }
    return new AnchorProvider(connection, anchorWallet, {
      preflightCommitment: "confirmed",
      commitment: "processed",
    });
  }, [anchorWallet, connection]);

  const deliveryProgram = useMemo(() => {
    if (!provider) {
      return;
    }

    //@ts-ignore
    return new Program<DeliverProgram>(
      idl as DeliverProgram,
      deliveryProgramId,
      provider
    );
  }, [deliveryProgramId, provider]);

  // const deliveryAccount = useQuery({
  //   queryKey: ["get-delivery-account", index],
  //   queryFn: async () => {
  //     if (!deliveryProgram) return null;
  //     const { pda: deliveryPDA } = getDeliveryPDA(index);
  //     return await deliveryProgram.account.delivery.fetch(deliveryPDA);
  //   },
  //   enabled: Boolean(deliveryProgram),
  // });

  const createDelivery = useMutation<string, Error, CreateDeliveryArgs>({
    mutationKey: ["create", "delivery"],
    mutationFn: async ({ index, reward, eta }) => {
      if (!deliveryProgram)
        throw new Error("delivery program not instantiated");

      const { pda: deliveryPDA, bump: _ } = getDeliveryPDA(index);

      return deliveryProgram.methods
        .createDelivery(
          new anchor.BN(index),
          new anchor.BN(reward),
          new anchor.BN(eta)
        )
        .accounts({ delivery: deliveryPDA })
        .rpc();
    },
    onSuccess: (signature) => {
      return [signature];
    },
    onError: (error) => alertAndLog(error.name, error.message),
  });

  const assignDelivery = useMutation<string, Error, AssignDeliveryArgs>({
    mutationKey: ["accept", "delivery"],
    mutationFn: async ({ index, courier }) => {
      if (!deliveryProgram)
        throw new Error("delivery program not instantiated");

      const { pda: deliveryPDA, bump: _ } = getDeliveryPDA(index);

      const courierPubKey = new PublicKey(courier);
      return deliveryProgram.methods
        .assignDeliveryJob(new anchor.BN(index), courierPubKey)
        .accounts({ delivery: deliveryPDA })
        .rpc();
    },
    onSuccess: (signature) => {
      return [signature];
    },
    onError: (error) => alertAndLog(error.name, error.message),
  });

  const confirmDelivery = useMutation<string, Error, confirmDeliveryArgs>({
    mutationKey: ["confirm", "delivery"],
    mutationFn: async ({ index }) => {
      if (!deliveryProgram)
        throw new Error("delivery program not instantiated");

      const { pda: deliveryPDA, bump: _ } = getDeliveryPDA(index);

      return deliveryProgram.methods
        .confirmDelivery(new anchor.BN(index))
        .accounts({ delivery: deliveryPDA })
        .rpc();
    },
    onSuccess: (signature) => {
      return [signature];
    },
    onError: (error) => alertAndLog(error.name, error.message),
  });

  return {
    deliveryProgram,
    deliveryProgramId,
    getDeliveryPDA,
    createDelivery,
    assignDelivery,
    confirmDelivery,
  };
}
