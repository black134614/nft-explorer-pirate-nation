export async function fetchNFTs(address: string) {
  if (!address) return [];

  try {
    const response = await fetch(`/api/nfts?address=${address}`);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching NFT data:", error);
    return [];
  }
}
