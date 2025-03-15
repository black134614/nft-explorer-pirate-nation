import Image from "next/image";

type NFT = {
  id: string;
  image_url?: string;
  metadata: { name?: string; description?: string; external_url?: string };
};

function getIpfsUrl(url: string) {
  if (url?.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
}

export default function NFTCard({ nft }: { nft: NFT }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg dark:bg-gray-900 dark:border-gray-800">
      {/* Image */}
      {nft.image_url && (
        <Image
          src={getIpfsUrl(nft.image_url)}
          alt={nft.metadata.name || "Unknown NFT"}
          width={300}
          height={300}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      )}

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-100">{nft.metadata.name || "Unnamed NFT"}</h2>
        <p className="text-sm text-gray-400 mt-1">{nft.metadata.description || "No description available."}</p>

        {/* View Button */}
        <a
          href={nft.metadata.external_url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-center text-white font-semibold"
        >
          View NFT
        </a>
      </div>
    </div>
  );
}
