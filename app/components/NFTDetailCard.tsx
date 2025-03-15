import Image from "next/image";

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
    attributes: { trait_type: string; value: string | number | boolean | null }[];
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

function getIpfsUrl(url: string) {
  if (url?.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
}

export default function NFTDetailCard({ nft }: { nft: NFT }) {
  return (
    <div className="relative max-w-md rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-gray-200 p-6 overflow-hidden">
      {/* NFT Image / Video */}
      <div className="relative rounded-lg overflow-hidden">
        {nft.animation_url ? (
          <video src={getIpfsUrl(nft.animation_url)} controls className="w-full rounded-lg" />
        ) : nft.image_url ? (
          <Image
            src={getIpfsUrl(nft.image_url)}
            alt={nft.metadata.name || "Unknown NFT"}
            width={300}
            height={300}
            className="w-full h-64 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
            No Media Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold text-gray-100">{nft.metadata.name || "Unnamed NFT"}</h2>
        <p className="text-sm text-gray-300 mt-1">{nft.metadata.description || "No description available."}</p>
      </div>

      {/* Attributes */}
      <div className="mt-4 p-3 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-300">Attributes</h3>
        <ul className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-400">
          {nft.metadata.attributes.map((attr, index) => (
            <li key={index} className="bg-gray-700 p-2 rounded-lg shadow-sm text-center">
              <span className="block font-medium text-gray-100">{attr.trait_type}</span>
              <span className="block text-gray-400 truncate">{attr.value}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Token Details */}
      <div className="mt-4 text-center text-gray-400 text-sm">
        <p>
          <strong className="text-gray-200">Token Type:</strong> {nft.token.type}
        </p>
        <p>
          <strong className="text-gray-200">Holders:</strong> {nft.token.holders || "N/A"}
        </p>
        <p>
          <strong className="text-gray-200">Total Supply:</strong> {nft.token.total_supply || "N/A"}
        </p>
      </div>

      {/* View on Explorer */}
      <a
        href={nft.external_app_url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-center text-white font-semibold"
      >
        View on Explorer
      </a>
    </div>
  );
}
