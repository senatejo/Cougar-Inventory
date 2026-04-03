import React from "react";

// =====================
// INTERFACE
// =====================
interface InventoryItem {
  ItemId: string;
  Name: string;
  ItemType: string;
  Quantity: number;
  MaxQuantity: number;
  Weight: number;
  ItemIcon: string | null;
  order: number;
  Metadata?: string | null;
}

interface ItemDetailsProps {
  item: InventoryItem | null;
}

// =====================
// METADATA DETECTOR
// =====================
function detectMetadataType(meta: any): string {
  if (!meta) return "None";

  if (meta.WeaponHash !== undefined) return "Weapon";
  if (meta.OwnerKey !== undefined && meta.CardType !== undefined) return "IDCard";
  if (meta.PlantHash !== undefined) return "Seed";
  if (meta.Items !== undefined && meta.Total !== undefined) return "Receipt";

  return "Unknown";
}

// =====================
// METADATA RENDERERS
// =====================

const WeaponMetadataView = ({ meta }: any) => (
  <div className="flex flex-col gap-1 text-sm">
    <div><b>Weapon Type:</b> {meta.WeaponType}</div>
    <div><b>Hash:</b> {meta.WeaponHash}</div>
    <div><b>Ammo:</b> {meta.AmmoCount}</div>
    <div><b>Serial:</b> {meta.SerialNumber || "None"}</div>
    <div><b>In Use:</b> {meta.InUse ? "Yes" : "No"}</div>
  </div>
);

const IDCardMetadataView = ({ meta }: any) => (
  <div className="flex flex-col gap-1 text-sm">
    <div><b>Name:</b> {meta.OwnerName}</div>
    <div><b>Gender:</b> {meta.Gender}</div>
    <div><b>Birth:</b> {new Date(meta.BirthDate).toLocaleDateString()}</div>
    <div><b>Address:</b> {meta.Address}</div>
    <div><b>Issued:</b> {new Date(meta.IssuedOn).toLocaleString()}</div>
    <div><b>Expire:</b> {new Date(meta.Expire).toLocaleDateString()}</div>
    <div><b>Class:</b> {meta.Class}</div>
  </div>
);

const SeedMetadataView = ({ meta }: any) => (
  <div className="flex flex-col gap-1 text-sm">
    <div><b>Plant Type:</b> {meta.PlantType}</div>
    <div><b>Hash:</b> {meta.PlantHash}</div>
    <div><b>Harvest Time:</b> {meta.HarvestTime} hours</div>
  </div>
);

const ReceiptMetadataView = ({ meta }: any) => (
  <div className="flex flex-col gap-1 text-sm">
    <div><b>Business:</b> {meta.BusinessName}</div>
    <div><b>Seller:</b> {meta.SellerName}</div>
    <div><b>Buyer:</b> {meta.BuyerName}</div>

    <div className="mt-2">
      <b>Items:</b>
      <ul className="list-disc ml-4">
        {meta.Items.map((x: any, i: number) => (
          <li key={i}>{x.Name} x{x.Quantity}</li>
        ))}
      </ul>
    </div>

    <div className="mt-1"><b>Total:</b> {meta.Total}</div>
    <div><b>Notes:</b> {meta.Notes}</div>
  </div>
);

// =====================
// MASTER RENDERER
// =====================

const renderMetadata = (meta: any) => {
  const type = detectMetadataType(meta);

  switch (type) {
    case "Weapon": return <WeaponMetadataView meta={meta} />;
    case "IDCard": return <IDCardMetadataView meta={meta} />;
    case "Seed": return <SeedMetadataView meta={meta} />;
    case "Receipt": return <ReceiptMetadataView meta={meta} />;
    default:
      return (
        <div className="text-gray-400 text-xs">
          No metadata available.
        </div>
      );
  }
};

// =====================
// MAIN COMPONENT
// =====================

export const ItemDetails: React.FC<ItemDetailsProps> = ({ item }) => {
  if (!item) {
    return (
  <div className="flex flex-col select-none 
    w-[10vw] h-[38vw] 
    bg-gradient-to-b from-[#0f0f0f] to-[#1a0404]
    border border-red-900/40 
    shadow-[0_0_25px_rgba(255,0,0,0.15)]
    rounded-xl
    items-center justify-center 
    p-6
    relative">
    
    {/* Background Pattern Halus */}
    <div className="absolute inset-0 opacity-10
                  bg-[radial-gradient(circle_at_center,_red_1px,_transparent_1px)] 
                  bg-[length:20px_20px]" />

    {/* Empty State Icon */}
    <div className="relative mb-3">
      <div className="w-14 h-14 
                    bg-gradient-to-b from-red-950/40 to-red-900/20
                    rounded-xl
                    border border-red-800/30
                    flex items-center justify-center
                    shadow-inner">
        <span className="text-2xl text-red-700/50">⏣</span>
      </div>
      
      {/* Small Glow Effect */}
      <div className="absolute -inset-1 bg-red-600/10 rounded-full blur-md" />
    </div>

    {/* Text */}
    <div className="text-center space-y-1">
      <div className="text-xs font-medium text-gray-400">
        No Selection
      </div>
      <div className="text-[10px] text-gray-600 max-w-[80%] mx-auto">
        Select an item to view details
      </div>
    </div>

    {/* Subtle Hint */}
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2
                    flex items-center gap-1 text-[8px]
                    bg-black/30 px-2 py-1 rounded-full
                    border border-red-900/20
                    opacity-50">
      <span className="text-red-600">⬆️</span>
      <span className="text-gray-500">click item</span>
    </div>

  </div>
);
  }

  const metadata = item.Metadata ? JSON.parse(item.Metadata) : null;

 return (
  <div className="flex flex-col select-none 
    w-[10vw] h-[38vw] 
    bg-gradient-to-b from-[#0f0f0f] to-[#1a0404]
    border border-red-900/40 
    shadow-[0_0_25px_rgba(255,0,0,0.15)]
    rounded-xl
    p-4 text-white overflow-auto
    custom-scrollbar-detailed">

    {/* Header dengan Efek Glow */}
    <div className="relative mb-4">
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-transparent blur-sm" />
      <div className="relative flex items-center gap-2">
        <div className="w-1 h-6 bg-red-600 rounded-full shadow-[0_0_10px_red]" />
        <h2 className="text-sm font-bold uppercase tracking-wider
                       [text-shadow:0_0_5px_red,0_0_10px_#ff0000]">
          Item Details
        </h2>
      </div>
    </div>

    {/* Icon dengan Frame Premium */}
    <div className="relative mb-4 group">
      {/* Frame Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 
                    rounded-lg opacity-75 group-hover:opacity-100 blur-[2px] 
                    transition-opacity duration-300" />
      
      {/* Image Container */}
      <div className="relative bg-gradient-to-b from-[#1a1a1a] to-black
                    rounded-lg overflow-hidden
                    border border-red-600/30
                    p-3 flex items-center justify-center">
        <img 
          src={item.ItemIcon || ""} 
          alt={item.Name}
          className="h-16 object-contain
                     drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]
                     group-hover:scale-110 transition-transform duration-300" 
        />
      
      </div>
    </div>

    {/* Basic Info dengan Desain Premium */}
    <div className="mb-4 space-y-2">
      {/* Nama Item */}
      <div>
        <div className="text-xs text-gray-500 mb-0.5">NAME</div>
        <div className="text-lg font-black text-white
                      [text-shadow:0_0_5px_rgba(255,0,0,0.3)]">
          {item.Name}
        </div>
      </div>

      {/* Tipe Item */}
      <div>
        <div className="text-xs text-gray-500 mb-0.5">TYPE</div>
        <div className="flex items-center gap-1">
          <span className="text-red-500">⏣</span>
          <span className="text-sm text-gray-300">{item.ItemType}</span>
        </div>
      </div>
    </div>

    {/* Stats Panel */}
    <div className="bg-black/40 rounded-lg p-3 mb-4
                   border border-red-900/30
                   shadow-[inset_0_0_15px_rgba(255,0,0,0.1)]">
      
      {/* Quantity */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400">Quantity</span>
        <div className="flex items-center gap-1">
          <span className="text-red-400 font-bold">{item.Quantity}</span>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300">{item.MaxQuantity}</span>
        </div>
      </div>

      {/* Progress Bar Quantity */}
      <div className="w-full h-1 bg-gray-800 rounded-full mb-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-red-600 to-red-500"
          style={{ width: `${(item.Quantity / item.MaxQuantity) * 100}%` }}
        />
      </div>

      {/* Weight */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-400">Weight</span>
        <div className="flex items-center gap-1">
          <span className="text-red-400">⚡</span>
          <span className="text-white font-medium">{item.Weight}</span>
          <span className="text-gray-500 text-xs">kg</span>
        </div>
      </div>

      {/* Order */}
      {item.order !== undefined && (
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Slot</span>
          <div className="flex items-center gap-1">
            <span className="text-red-400">#</span>
            <span className="text-white font-medium">{item.order}</span>
          </div>
        </div>
      )}
    </div>

    {/* Metadata Panel */}
    {metadata && (
      <div className="relative">
        {/* Header Metadata */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-4 bg-red-600/60 rounded-full" />
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            Additional Details
          </span>
        </div>

        {/* Content Metadata */}
        <div className="bg-black/40 rounded-lg p-3
                      border border-red-900/20
                      space-y-2">
          {renderMetadata(metadata)}
        </div>
      </div>
    )}
  </div>
);
};
