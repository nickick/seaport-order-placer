"use client";

import React, { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import seaportAbi from "../seaport-abi.json";
import { pad, parseEther } from "viem";
import { OrderCreator } from "./OrderCreator";
import { StyledButton } from "../StyledButton";

const OrderPlacer = () => {
  const [order, setOrder] = useState<string>();
  const onOrderChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOrder(e.target.value);
  };
  const { address } = useAccount();

  let parsedOrder: { [key: string]: any } = {};
  try {
    parsedOrder = JSON.parse(order ?? "");
  } catch {}

  const { config } = usePrepareContractWrite({
    address: "0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC",
    abi: seaportAbi,
    functionName: "fulfillOrder", // "fulfillOrder",
    args: [parsedOrder, pad("0x0")], // [parsedOrder, pad("0x0")]
    enabled: Object.keys(parsedOrder).length > 0 && !!address,
    value: parsedOrder.parameters?.consideration?.[0]?.startAmount ?? "0",
  });

  const { write, data } = useContractWrite(config);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    write?.();
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <OrderCreator setOrder={setOrder} />
      </div>
      <form onSubmit={onSubmit} className="space-y-8 w-[60rem]">
        <label className="flex flex-col space-y-2">
          <p>Order object:</p>
          <textarea
            placeholder={`{
"parameters": {
    ...
  },
  "signature": "..."
"}`}
            rows={10}
            onChange={onOrderChange}
            value={order}
            className="p-4 text-black"
          />
        </label>
        <StyledButton type="submit" disabled={!order || !address}>
          Submit order
        </StyledButton>
      </form>
      <div className="text-gray-100 opacity-70 mt-4 w-full overflow-x-auto max-w-[60rem]">
        {Object.keys(parsedOrder).map((key) => (
          <div key={key}>
            {key}: <pre>{JSON.stringify(parsedOrder[key], null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export { OrderPlacer };
