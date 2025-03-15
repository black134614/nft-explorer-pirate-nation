import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  const API_URL = `https://explorer-proofofplay-boss-mainnet.t.conduit.xyz/api/v2/addresses/${address}/nft?type=ERC-721%2CERC-404%2CERC-1155`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch NFT data" }, { status: 500 });
  }
}
