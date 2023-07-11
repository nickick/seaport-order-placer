"use client";

import React, { useState } from "react";
import { getContract, pad } from "viem";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { getWalletClient, getPublicClient } from "@wagmi/core";
import { goerli } from "viem/chains";
import seaportAbi from "./seaport-abi.json";

const OrderPlacer = () => {
  const [order, setOrder] = useState<string>();
  const onOrderChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOrder(e.target.value);
  };
  const { address } = useAccount();

  let parsedOrder;
  try {
    parsedOrder = JSON.parse(order ?? "");
  } catch {
    parsedOrder = {};
  }

  const { config } = usePrepareContractWrite({
    address: "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC",
    abi: seaportAbi,
    functionName: "validate", // "fulfillOrder",
    args: [parsedOrder], // [parsedOrder, pad("0x0")]
    enabled: true,
  });

  const { write } = useContractWrite(config);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    write?.();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8 w-[40rem]">
      <label className="flex flex-col space-y-2">
        <p>Seaport order object</p>
        <textarea
          placeholder={`{"parameters":{"offerer":"0x7650d62F7BFbAED06892832953CB12d54eA9A466","zone":"0x0000000000000000000000000000000000000000","zoneHash":"0x0000000000000000000000000000000000000000000000000000000000000000","startTime":"1689088051","endTime":"115792089237316195423570985008687907853269984665640564039457584007913129639935","orderType":0,"offer":[{"itemType":2,"token":"0x932Ca55B9Ef0b3094E8Fa82435b3b4c50d713043","identifierOrCriteria":"24290","startAmount":"1","endAmount":"1"}],"consideration":[{"itemType":0,"token":"0x0000000000000000000000000000000000000000","identifierOrCriteria":"0","startAmount":"1000000000000000","endAmount":"1000000000000000","recipient":"0xD1d0c59D36be0555B2034c7bb06B2fdCEf37F886"}],"totalOriginalConsiderationItems":1,"salt":"0x000000000000000000000000000000000000000000000000282f6782c702b68d","conduitKey":"0x0000000000000000000000000000000000000000000000000000000000000000","counter":"0"},"signature":"0x0a6e06bea4e684e923a55a7ff47b815dd40a60f6bc76c6564959d190addc5feba9cb4256d68607e9cd66bd6262daf4de59c15dad2e595d84815154e4dc4a37bf"}`}
          rows={10}
          onChange={onOrderChange}
          value={order}
          className="p-4 text-black"
        />
      </label>
      <button
        className="p-2 border rounded border-white m-2 mx-auto disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        disabled={!order || !address}
      >
        Submit order
      </button>
    </form>
  );
};

export { OrderPlacer };
