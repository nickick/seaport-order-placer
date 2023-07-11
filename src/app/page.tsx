"use client";
import { goerli } from "viem/chains";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Profile } from "./Profile";
import { OrderPlacer } from "./OrderPlacer";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
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
