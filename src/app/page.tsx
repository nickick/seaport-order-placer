"use client";
import { createWalletClient, http } from "viem";
import { goerli } from "viem/chains";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { OrderPlacer } from "./OrderPlacer";
import { Profile } from "./Profile";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
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
      <main className="flex min-h-screen flex-col items-center p-24">
        <Profile />
        <div className="flex">
          <OrderPlacer />
          <div>
            <pre>
              {/* TODO: make something nice to parse out a seaport order to make this easier to understand */}
            </pre>
          </div>
        </div>
      </main>
    </WagmiConfig>
  );
}
