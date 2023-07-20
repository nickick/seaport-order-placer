import { useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { StyledButton } from "./StyledButton";
import { useEffect, useState } from "react";
import { NetworkSwitch } from "./NetworkSwitch";

function Profile() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const [connectString, setConnectString] = useState<string>();

  useEffect(() => {
    setConnectString(ensName ?? address);
  }, [ensName, address]);

  return (
    <div className="py-2 w-full">
      {connectString ? (
        <div className="flex flex-col">
          <div>Connected to: {connectString}</div>
          <div className="flex w-full justify-end">
            Network: &nbsp; <NetworkSwitch />
          </div>
        </div>
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
