/**
 * Use multicall to swap on Uniswap from USDC to ETH and then execute a Seaport order in one transaction.
 *
 * - Lists out NFTs available on Goerli NFTs https://goerli.etherscan.io/address/0x932ca55b9ef0b3094e8fa82435b3b4c50d713043
 * - Generates an order for an NFT using the seller wallet
 * - Switches to a buyer wallet
 * - Uses multicall to swap for tokens and buy the NFT
 */

function Multicall() {
  return (
    <div className="w-full items-start border rounded p-2 space-y-4">
      <h1 className="font-bold text-xl">Multicall POC</h1>
      <div>How to use:</div>
      <div className="flex flex-col my-2">
        <ol type="1" className="ml-4" style={{ listStyleType: "decimal" }}>
          <li>
            Get NFTs{" "}
            <a className="underline" href="https://goerli-nfts.vercel.app/">
              here
            </a>
            .
          </li>
          <li>Connect a wallet you want to sell from. Use Goerli network.</li>
          <li>
            Select one of the NFTs you minted to sell. Hit 'Generate order'.
          </li>
          <li>Connect a buyer wallet. Use Goerli network.</li>
          <li>
            Add enough USDC to cover the sell price of the listing, 0.01 ETH.
            <ul className="ml-2" style={{ listStyleType: "circle" }}>
              <li>
                Try using Uniswap to swap 0.15 ETH into USDC.{" "}
                <span className="italic">
                  *Make sure to use Goerli network on Uniswap.*
                </span>
              </li>
            </ul>
          </li>
          <li>Hit 'Submit order'.</li>
        </ol>
      </div>
    </div>
  );
}

export { Multicall };
