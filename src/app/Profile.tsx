import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

function Profile() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <div className="py-2 w-[40rem]">
      {isConnected ? (
        <>Connected to {ensName ?? address}</>
      ) : (
        <button
          className="p-2 border rounded border-white m-2 mx-auto"
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export { Profile };
