import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { StyledButton } from "./StyledButton";

function Profile() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <div className="py-2 w-[60rem]">
      {isConnected ? (
        <>Connected to: {ensName ?? address}</>
      ) : (
        <StyledButton
          className="p-2 border rounded border-white m-2 mx-auto"
          onClick={() => connect()}
        >
          Connect Wallet
        </StyledButton>
      )}
    </div>
  );
}

export { Profile };
