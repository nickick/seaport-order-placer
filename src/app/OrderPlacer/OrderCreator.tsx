import React, { useEffect } from "react";
import { EIP_712_ORDER_TYPE, domainData } from "./constants";
import { privateKeyToAccount } from "viem/accounts";
import { walletClient } from "../page";
import { StyledButton } from "../StyledButton";

type Props = {
  setOrder: (order: string) => void;
};

const order = {
  offerer: "0xD1d0c59D36be0555B2034c7bb06B2fdCEf37F886",
  zone: "0x0000000000000000000000000000000000000000",
  zoneHash:
    "0x0000000000000000000000000000000000000000000000000000000000000000",
  startTime: "1689185052",
  endTime: "1789185052",
  orderType: 0,
  offer: [
    {
      itemType: 2,
      token: "0x932Ca55B9Ef0b3094E8Fa82435b3b4c50d713043",
      identifierOrCriteria: "24290",
      startAmount: "1",
      endAmount: "1",
    },
  ],
  consideration: [
    {
      itemType: 0,
      token: "0x0000000000000000000000000000000000000000",
      identifierOrCriteria: "0",
      startAmount: "1000000000000000",
      endAmount: "1000000000000000",
      recipient: "0xD1d0c59D36be0555B2034c7bb06B2fdCEf37F886",
    },
  ],
  totalOriginalConsiderationItems: 1,
  salt: "0x000000000000000000000000000000000000000000000000f1fb134a918bb463",
  conduitKey:
    "0x0000000000000000000000000000000000000000000000000000000000000000",
  counter: "0",
};

const OrderCreator = (props: Props) => {
  const createSignedOrder = async () => {
    const signature = await walletClient.signTypedData({
      account: privateKeyToAccount(
        "0xb1bd8f22e4b854ed97d08a87bf07d845b7380419c1f88a722c14439cf9f0fdda"
      ),
      domain: domainData,
      types: EIP_712_ORDER_TYPE,
      primaryType: "OrderComponents",
      message: order,
    });

    props.setOrder(
      JSON.stringify({
        parameters: order,
        signature: signature,
      })
    );
  };

  return (
    <div className="flex space-x-2 justify-start items-start">
      <StyledButton onClick={createSignedOrder}>Create order</StyledButton>
      <StyledButton onClick={() => props.setOrder("")}>
        Clear order
      </StyledButton>
    </div>
  );
};

export { OrderCreator };
