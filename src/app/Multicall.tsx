import { useState } from "react";
import { StyledButton } from "./StyledButton";
import initialOrder from "./reservoirOrder.json";
import { erc20ABI, useAccount, usePublicClient, useWalletClient } from "wagmi";

import uniswapRouterAbi from "./ABI/uniswapRouter.json";
import { parseUnits } from "viem";
import { polygon } from "viem/chains";
const UNISWAP_ROUTER_CONTRACT = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

const POLYGON_MATIC_ADDRESS = "0x0000000000000000000000000000000000001010";
const POLYGON_WMATIC_ADDRESS = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
const POLYGON_USDC_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

function Multicall() {
  const [order, setOrder] = useState(initialOrder);
  const { address } = useAccount();

  const publicClient = usePublicClient({ chainId: polygon.id });
  const walletClient = useWalletClient({ chainId: polygon.id });

  const getDecimals = async () => {
    const [wmaticDecimals, usdcDecimals] = await Promise.all([
      publicClient.readContract({
        account: address ?? "0x0",
        address: POLYGON_WMATIC_ADDRESS,
        abi: erc20ABI,
        functionName: "decimals",
      }),
      publicClient.readContract({
        account: address ?? "0x0",
        address: POLYGON_USDC_ADDRESS,
        abi: erc20ABI,
        functionName: "decimals",
      }),
    ]);

    return [wmaticDecimals, usdcDecimals];
  };

  const getApprovals = async () => {
    const [wmaticDecimals] = await getDecimals();

    const gasEstimate = await publicClient.estimateContractGas({
      account: address ?? "0x0",
      address: POLYGON_WMATIC_ADDRESS,
      abi: erc20ABI,
      functionName: "approve",
      args: [UNISWAP_ROUTER_CONTRACT, parseUnits("1", wmaticDecimals)],
    });

    await walletClient.data?.writeContract({
      account: address ?? "0x0",
      address: POLYGON_WMATIC_ADDRESS,
      abi: erc20ABI,
      functionName: "approve",
      args: [UNISWAP_ROUTER_CONTRACT, parseUnits("1", wmaticDecimals)],
      chain: polygon,
      gas: gasEstimate,
    });
  };

  const swap = async () => {
    const [wmaticDecimals, usdcDecimals] = await getDecimals();

    await walletClient.data?.writeContract({
      account: address ?? "0x0",
      address: UNISWAP_ROUTER_CONTRACT,
      abi: uniswapRouterAbi as any,
      functionName: "exactOutputSingle",
      args: [
        [
          POLYGON_WMATIC_ADDRESS,
          POLYGON_USDC_ADDRESS,
          3000,
          address,
          parseUnits("0.001", usdcDecimals),
          parseUnits("0.002", wmaticDecimals),
          0,
        ],
      ],
      chain: polygon,
    });
  };

  const sequential = async () => {
    await getApprovals();
    await swap();
  };

  const multicall = async () => {};

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
        <div className="flex space-x-2 items-center">
          <StyledButton
            onClick={() => {
              getApprovals();
            }}
            disabled={!address}
          >
            Get approvals
          </StyledButton>
          <StyledButton
            onClick={() => {
              swap();
            }}
            disabled={!address}
          >
            Swap
          </StyledButton>
          <div className="border h-12" />
          <StyledButton
            onClick={() => {
              sequential();
            }}
            disabled={!address}
          >
            Sequential
          </StyledButton>
          <div className="border h-12" />
          <StyledButton
            onClick={() => {
              sequential();
            }}
            disabled={!address}
          >
            Multicall
          </StyledButton>
        </div>
      </div>
    </div>
  );
}

export { Multicall };
