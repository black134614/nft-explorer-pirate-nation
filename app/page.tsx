"use client";

import { useEffect, useState } from "react";
import NFTCard from "./components/NFTCard";
import NFTDetailCard from "./components/NFTDetailCard";
import { fetchNFTs } from "./api/fetchNFTs";

type NFT = {
  id: string;
  image_url?: string;
  animation_url?: string;
  external_app_url?: string;
  media_url?: string;
  metadata: {
    name?: string;
    description?: string;
    external_url?: string;
    attributes: {
      trait_type: string;
      value: string | number | boolean | null;
    }[];
  };
  token: {
    name?: string | null;
    symbol?: string | null;
    type: string;
    address: string;
    holders?: string | null;
    total_supply?: string | null;
  };
  value: string;
};

export default function Home() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSearch = async () => {
    if (!address) return;
    setLoading(true);
    const data = await fetchNFTs(address);
    setNfts(data);
    setLoading(false);
  };

  useEffect(() => {
    async function loadNFTs() {
      const data = await fetchNFTs(address);
      setNfts(data);
      setLoading(false);
    }
    loadNFTs();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white p-8">
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-center text-white neon-text drop-shadow-lg">
        NFT Explorer
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center items-center mt-8">
        <div className="relative w-full max-w-lg">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Enter wallet address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 pl-10 text-white bg-white/10 border border-gray-700 rounded-full shadow-md backdrop-blur-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400"
          />
          {/* Search Icon */}
          <svg
            className="absolute left-3 top-3 w-6 h-6 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.2 10.2a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>
        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg 
          hover:scale-105 hover:shadow-blue-500/50 transition-transform duration-300"
        >
          Search
        </button>
      </div>

      <div className="min-h-full">
        {loading ? (
          <div className="flex justify-center items-center mt-16">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Featured NFTs */}
            <h2 className="text-3xl font-bold text-center mt-12 neon-text">
              {nfts.length > 0 ? "Featured NFTs" : ""}
            </h2>
            {loading && (
              <p className="text-center text-gray-400 mt-4">Loading NFTs...</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
              {nfts.slice(0, 2).map((nft) => (
                <div
                  key={nft.id}
                  className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg"
                >
                  <NFTCard nft={nft} />
                </div>
              ))}
            </div>

            {/* All NFTs */}
            <h2 className="text-3xl font-bold text-center mt-16 neon-text">
              {nfts.length > 0 ? `All NFTs Of ${address}` : ""}
            </h2>

            {/* Masonry Layout using Tailwind `columns` */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 mt-8">
              {nfts.map((nft) => (
                <div
                  key={nft.id}
                  className="break-inside-avoid bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg"
                >
                  <NFTDetailCard nft={nft} />
                </div>
              ))}
            </div>
          </>
        )}
        {/* Footer */}
      </div>

      <footer className="fixed bottom-0 left-0 w-full bg-gray-800 rounded-t-lg shadow-sm p-4">
        <div className="w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-400 sm:text-center">
            © 2025{" "}
            <a
              href="https://www.facebook.com/ov.naul.1"
              className="hover:underline text-blue-400"
            >
              luanvo
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
            <li>
              <a
                href="https://www.facebook.com/ov.naul.1"
                className="hover:underline text-blue-400"
              >
                Contact via Facebook
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
}
