import { useState } from "react";
import { StyledButton } from "./StyledButton";
import initialOrder from "./reservoirOrder.json";
import { erc20ABI, useAccount, usePublicClient } from "wagmi";

import uniswapRouterAbi from "./ABI/uniswapRouter.json";
import { parseUnits } from "viem";
const UNISWAP_RUOTER_CONTRACT = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

const POLYGON_MATIC_ADDRESS = "0x0000000000000000000000000000000000001010";
const POLYGON_USDC_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

function Multicall() {
  const [order, setOrder] = useState(initialOrder);
  const { address } = useAccount();

  const publicClient = usePublicClient();

  const convertAndBuy = async () => {
    const data = await publicClient.readContract({
      account: address ?? "0x0",
      address: POLYGON_MATIC_ADDRESS,
      abi: erc20ABI,
      functionName: "decimals",
    });

    console.log([
      POLYGON_MATIC_ADDRESS,
      POLYGON_USDC_ADDRESS,
      3000,
      address,
      parseUnits("1", data),
    ]);

    const simulateResults = await publicClient.simulateContract({
      account: address ?? "0x0",
      address: UNISWAP_RUOTER_CONTRACT,
      abi: uniswapRouterAbi as any,
      functionName: "exactOutputSingle",
      args: [
        [
          POLYGON_MATIC_ADDRESS,
          POLYGON_USDC_ADDRESS,
          3000,
          address,
          parseUnits("1", data),
        ],
      ],
    });

    console.log(simulateResults);
  };

  return (
    <div className="w-full items-start border rounded p-2 space-y-4">
      <h1 className="font-bold text-xl">Multicall POC</h1>
      <div className="p-2 border rounded">
        <div className="text-black">
          <textarea
            value={JSON.stringify(order || {}, null, 2)}
            rows={10}
            className="w-full"
            onChange={() => {}}
            spellCheck={false}
          />
        </div>
        <StyledButton
          onClick={() => {
            convertAndBuy();
          }}
          disabled={!address}
        >
          Convert and buy
        </StyledButton>
      </div>
    </div>
  );
}

export { Multicall };
