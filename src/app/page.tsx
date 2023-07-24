"use client";
import { createWalletClient, http } from "viem";
import { goerli, polygon, polygonMumbai } from "viem/chains";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Multicall } from "./Multicall";
import { Profile } from "./Profile";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, mainnet, polygon, polygonMumbai],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export const walletClient = createWalletClient({
  chain: goerli,
  transport: http(
    "https://api.stackup.sh/v1/node/a601f11078b17e25ff6c58f4fe44cd694ec73fcaae61505f9649987c1834f661"
  ),
});

export default function Home() {
  return (
    <WagmiConfig config={config}>
      <main className="flex min-h-screen flex-col items-center p-24 space-y-2">
        <div className="flex w-full h-16 text-right">
          <Profile />
        </div>
        <div className="flex w-full">
          <Multicall />
        </div>
      </main>
    </WagmiConfig>
  );
}
