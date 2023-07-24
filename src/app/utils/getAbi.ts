async function getAbi(address: `0x${string}`) {
  const url = `https://api.polygonscan.com/api?module=contract&action=getabi&address=${address}&apiKey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson?.result;
}

export { getAbi };
