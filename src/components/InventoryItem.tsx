interface InventoryItemProps {
  mode?: "default" | "clothing";
  name?: string;
  quantity?: number;
  weight: number;
  imageSrc: string;
  isBeingUsed?: boolean;
}

export const InventoryItem = ({
  mode = "default",
  name = "nama item",
  quantity = 0,
  weight = 0,
  imageSrc,
  isBeingUsed = false,
}: InventoryItemProps) => {
  const isClothing = mode === "clothing";

  if (isClothing) {
    // 👕 Mode Clothing: hanya icon tanpa background atau teks
    return (
      <div className="relative w-16 h-16 flex items-center justify-center">
        <img
          src={imageSrc}
          alt={name}
          className={`object-contain max-w-full max-h-full pointer-events-none 
            ${isBeingUsed ? "opacity-70" : "opacity-100"}`}
        />

        {/* Optional: indikator USE kecil */}
        {isBeingUsed && (
          <div className="absolute top-0.5 left-0.5 z-10 bg-blue-600/90 px-1 py-0.5 rounded-md">
            <span className="text-[8px] font-bold text-white uppercase">USE</span>
          </div>
        )}
      </div>
    );
  }

  // 📦 Mode Default: versi lengkap
return (
  <div
    className={`relative flex flex-col
      h-20 w-20 
      bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]
      rounded-lg
      overflow-hidden transition-all duration-200 
      border border-red-900/30
      hover:border-red-600/60
      hover:shadow-[0_0_15px_rgba(255,0,0,0.3)]
      hover:scale-[1.02]
      ${isBeingUsed 
        ? "border-green-500/80 shadow-[0_0_12px_rgba(34,197,94,0.3)]" 
        : "border-red-900/30"}`}
  >
    {/* Efek Glow Dalam */}
    <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300" />

    {/* Status USE Badge */}
    {isBeingUsed && (
      <div className="absolute top-1 left-1 z-20">
        <div className="flex items-center gap-1 
                      bg-gradient-to-r from-green-600 to-green-700
                      px-1.5 py-0.5 rounded-full
                      border border-green-400/30
                      shadow-[0_0_8px_rgba(34,197,94,0.5)]">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="text-[8px] font-black text-white uppercase tracking-wide">
            USE
          </span>
        </div>
      </div>
    )}

    {/* Container Gambar dengan Background Pattern */}
    <div className="relative flex items-center justify-center h-[50px] w-full p-2
                    bg-gradient-to-b from-red-950/20 to-transparent">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20
                    bg-[radial-gradient(circle_at_center,_red_1px,_transparent_1px)] 
                    bg-[length:8px_8px]" />
      
      {/* Garis Bawah Gambar */}
      <div className="absolute bottom-0 left-2 right-2 h-px 
                    bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      
      <img
        src={imageSrc}
        alt={name}
        className={`relative h-7 object-contain pointer-events-none 
                   max-w-2xl max-h-full z-10
                   drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]
                   ${isBeingUsed ? "opacity-70" : "opacity-100"}`}
      />
    </div>

    {/* Info Item */}
    <div className="flex flex-col justify-end flex-grow px-1.5 pb-1.5">
      {/* Nama Item dengan Efek Glow saat hover */}
      <h3 className="text-[9px] font-bold text-center leading-tight
                    text-white/90 group-hover:text-white
                    transition-colors duration-200
                    [text-shadow:0_0_5px_rgba(255,0,0,0.3)]">
        {name}
      </h3>

      {/* Quantity dan Weight */}
      <div className="flex justify-between items-center text-[9px] mt-0.5
                    bg-black/40 rounded px-1 py-0.5
                    border border-red-900/20">
        <span className="font-bold text-red-400 flex items-center gap-0.5">
          <span className="text-red-600">×</span>
          {quantity}
        </span>
        <span className="text-gray-300 font-medium flex items-center gap-0.5">
          <span className="text-[8px] text-red-600/80">⚡</span>
          {weight.toFixed(1)}<span className="text-[7px] text-gray-500">kg</span>
        </span>
      </div>
    </div>

    {/* Efek Hover Border Glow */}
    <div className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100
                    pointer-events-none transition-opacity duration-300
                    shadow-[inset_0_0_20px_rgba(255,0,0,0.2)]" />
  </div>
);
};
