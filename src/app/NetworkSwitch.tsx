import { goerli } from "viem/chains";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { StyledButton } from "./StyledButton";

function NetworkSwitch() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const pendingChainName = chains.find(
    (chain) => chain.id === pendingChainId
  )?.name;

  return (
    <div className="flex space-x-2 items-center">
      {chain && <div>{chain.name}</div>}
      {chain && chain.name !== "Goerli" && (
        <StyledButton onClick={() => switchNetwork?.(goerli.id)}>
          Switch to Goerli
        </StyledButton>
      )}
      {isLoading && pendingChainName && (
        <div>Switching to {pendingChainName}...</div>
      )}
    </div>
  );
}

export { NetworkSwitch };
