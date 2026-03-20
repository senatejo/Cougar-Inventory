import { useEffect, useRef, useState } from "react";
import { InventoryItem } from "./InventoryItem";
import { InventoryContextMenu } from "../context/InventoryContextMenu";
import type { InventoryMenuDTO, InventoryMenuItemDTO } from "../DTOs/InventoryMenuDTO";

interface CraftingInventoryProps {
  inventory: InventoryMenuDTO;
  draggingItem: InventoryMenuItemDTO | null;
  startPos: { x: number; y: number } | null;
  draggingPos: { x: number; y: number };
  setDraggingItem: (item: InventoryMenuItemDTO | null) => void;
  setStartPos: (pos: { x: number; y: number } | null) => void;
  setDraggingPos: (pos: { x: number; y: number }) => void;
  onItemDrop: (inventoryKey: string, orderIndex: number | null) => void;
  onItemUse: (item: InventoryMenuItemDTO) => void;
  onItemRename: (item: InventoryMenuItemDTO) => void;
  selectedItem: InventoryMenuItemDTO | null;
  setSelectedItem: (item: InventoryMenuItemDTO | null) => void;
}

export const CraftingInventory = ({
  inventory,
  draggingItem,
  startPos,
  draggingPos,
  setDraggingItem,
  setStartPos,
  setDraggingPos,
  onItemDrop,
  onItemUse,
  onItemRename,
  selectedItem,
  setSelectedItem
}: CraftingInventoryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    item: InventoryMenuItemDTO;
    orderIndex: number;
  } | null>(null);

  // 🔹 Urutkan item berdasarkan order atau index
  const orderedItems = [...inventory.Items].sort((a, b) => (a.order || 0) - (b.order || 0));
  const [cols, setCols] = useState(6);
  const handleMouseDown = (e: React.MouseEvent, item: InventoryMenuItemDTO) => {
    if (e.button !== 0) return;

    setSelectedItem(item);
    const pos = { x: e.clientX, y: e.clientY };
    setStartPos(pos);
    setDraggingPos(pos);

    const timer = setTimeout(() => {
      if (startPos && (Math.abs(e.clientX - startPos.x) > 5 || Math.abs(e.clientY - startPos.y) > 5)) {
        setDraggingItem({ ...item, InventoryKey: inventory.InventoryKey });
      }
    }, 150);

    const cleanup = () => clearTimeout(timer);
    window.addEventListener("mouseup", cleanup, { once: true });
  };

  const handleMouseUp = (e: React.MouseEvent, orderIndex: number) => {
    if (e.button !== 0 || !draggingItem || !startPos) return;

    const dx = Math.abs(draggingPos.x - startPos.x);
    const dy = Math.abs(draggingPos.y - startPos.y);
    if (dx > 5 || dy > 5) {
      e.stopPropagation(); // ⛔️ Tambahkan ini
      onItemDrop(inventory.InventoryKey, orderIndex);
    }
  };


  const handleMouseMove = (e: React.MouseEvent) => {
    if (!startPos) return;

    const dx = Math.abs(e.clientX - startPos.x);
    const dy = Math.abs(e.clientY - startPos.y);
    const isDrag = dx > 5 || dy > 5;

    if (isDrag && !draggingItem && selectedItem) {
      setDraggingItem({ ...selectedItem, InventoryKey: inventory.InventoryKey });
    }

    if (draggingItem) {
      setDraggingPos({ x: e.clientX, y: e.clientY });
    }
  };



  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;

      let newCols = Math.floor(width / 95); // 90px slot + gap
      newCols = Math.max(3, newCols); // minimum 4

      setCols(newCols);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (

    <main className="relative">
      {inventory.IsLocked && (
        <div className="absolute inset-0 z-50 
        bg-black/40 backdrop-blur-[2px]
        flex items-center justify-center
        cursor-not-allowed">

          <div className="text-red-400 font-bold text-sm tracking-wider
          px-4 py-2 rounded-lg
          bg-black/60 border border-red-500/30
          shadow-[0_0_10px_rgba(255,0,0,0.5)]">
          🔒 Inventory Locked
          </div>
        </div>
      )}

      <div className="flex flex-col select-none 
                  max-w-[25vw] h-[38vw] 
                  min-w-[25vw]
                  overflow-hidden 
                  shadow-2xl 
                  bg-gradient-to-b from-[#0f0f0f] to-[#1a0404]
                  border border-red-900/30
                  rounded-xl">

      {/* Header dengan Efek Merah Menyala */}
      <div className="relative">
        {/* Efek Glow di Header */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10" />

        <div className="flex flex-row items-center justify-between 
                      px-5 py-4
                      bg-gradient-to-r from-black via-red-950/30 to-black
                      border-b-2 border-red-600/40
                      relative">

          {/* Left Section - Inventory Type */}
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-red-600 rounded-full shadow-[0_0_15px_red]" />
            <h1 className="text-xl font-bold text-white tracking-wide
                         [text-shadow:0_0_8px_red,0_0_15px_#ff0000]">
              {inventory.InventoryType}
            </h1>
          </div>

          {/* Right Section - Weight dengan Desain Premium */}
          <div className="flex items-center bg-black/60 rounded-lg 
                      border border-red-800/50 px-3 py-1.5
                      shadow-[inset_0_0_10px_rgba(255,0,0,0.2)]">
            <span className="text-white font-semibold">
              {inventory.Items.reduce((total, item) => total + item.Weight, 0)}
            </span>
            <span className="text-red-500/50 mx-1">/</span>
            <span className="text-gray-400">{inventory.MaxWeight}</span>
            <span className="text-gray-600 ml-1 text-xs">kg</span>
          </div>
        </div>

        {/* Garis Dekoratif */}
        <div className="absolute bottom-0 left-4 right-4 h-px 
                    bg-gradient-to-r from-transparent via-red-600 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden
                    bg-gradient-to-b from-[#0a0a0a] to-[#1a0505]">

        {/* Item Container dengan Custom Scroll */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={(e) => {
            if (e.button === 0 && draggingItem && startPos) {
              const dx = Math.abs(draggingPos.x - startPos.x);
              const dy = Math.abs(draggingPos.y - startPos.y);
              const isDrag = dx > 5 || dy > 5;

              if (isDrag) {
                console.log("Drop di area kosong container");
                onItemDrop(inventory.InventoryKey, null);
              }
            }
          }}
          className="flex-1 overflow-y-auto pr-2 custom-scrollbar"
        >
          {/* Grid Container untuk Items */}
          <div
            className="grid auto-rows-[90px] gap-2 relative"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {/* Background Pattern Halus */}
            <div className="absolute inset-0 pointer-events-none
                        bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.03)_1px,_transparent_1px)] 
                        bg-[length:20px_20px]" />

            {orderedItems.map((item) => (
              <div
                key={item.ItemId}
                className={`relative flex flex-col items-center p-2
                        transition-all duration-200
                        ${draggingItem?.ItemId === item.ItemId
                    ? "opacity-30 scale-95"
                    : "hover:scale-[1.02]"}`}
                onMouseDown={(e) => handleMouseDown(e, item)}
                onMouseUp={(e) => handleMouseUp(e, item.order ?? 0)}
                onContextMenu={(e) => e.preventDefault()}
              >
                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-lg 
                            bg-gradient-to-br from-red-600/20 via-red-500/5 to-transparent
                            opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300
                            border border-red-600/30
                            shadow-[0_0_15px_rgba(255,0,0,0.2)]" />

                {/* Item Component */}
                <InventoryItem
                  name={item.Name}
                  quantity={item.Quantity}
                  imageSrc={item.ItemIcon || "/images/default-item.png"}
                  isBeingUsed={item.item_use}
                  weight={item.Weight}
                />

                {/* Order Badge */}
                {item.order !== undefined && (
                  <div className="absolute -top-1 -right-1 
                              w-5 h-5 
                              bg-gradient-to-br from-red-600 to-red-800
                              rounded-full 
                              flex items-center justify-center
                              border border-red-400/30
                              shadow-[0_0_10px_red]">
                    <span className="text-[10px] font-bold text-white">
                      {item.order + 1}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-3 pt-2 border-t border-red-900/30
                    flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="text-red-500">⏣</span>
            <span className="text-gray-400">
              Items: <span className="text-red-500 font-bold">{orderedItems.length}</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 bg-red-600 rounded-full" />
            <span className="text-gray-600">Inventory</span>
          </div>
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <InventoryContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          item={contextMenu.item}
          onClose={handleCloseContextMenu}
          onUse={() => {
            onItemUse(contextMenu.item);
            handleCloseContextMenu();
          }}
          onRename={() => {
            onItemRename(contextMenu.item);
            handleCloseContextMenu();
          }}
          onDrop={() => {
            //@ts-ignore
            mp.trigger("DropItem::ClientToServer", contextMenu.item.ItemId);
            handleCloseContextMenu();
          }}
          onSplit={() => {
            //@ts-ignore
            mp.trigger("SplitItem::ClientToServer", contextMenu.item.ItemId);
            handleCloseContextMenu();
          }}
          onGive={() => {
            //@ts-ignore
            mp.trigger("GiveItem::ClientToServer", contextMenu.item.ItemId);
            handleCloseContextMenu();
          }}
        />
      )}

      {/* FOOTER BUTTON - Craft dengan Desain Premium */}
      <div className="p-4 bg-gradient-to-b from-black to-[#1a0404] border-t border-red-900/40">
        <button
          onClick={() => {
            //@ts-ignore
            mp.trigger("Inventory::StartCrafting::Craft", inventory.InventoryKey);
          }}
          className="relative w-full py-3.5 group overflow-hidden
                   bg-gradient-to-r from-red-900 to-red-700
                   hover:from-red-800 hover:to-red-600
                   text-white font-bold tracking-wider
                   rounded-lg
                   transition-all duration-300
                   shadow-[0_0_15px_rgba(255,0,0,0.3)]
                   hover:shadow-[0_0_25px_rgba(255,0,0,0.5)]
                   border border-red-500/30
                   hover:border-red-400/50"
        >
          {/* Efek Shimmer */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                      transition-transform duration-1000
                      bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Icon dan Text */}
          <div className="relative flex items-center justify-center gap-2">
            <span className="text-lg">CRAFT</span>
          </div>

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-lg
                      bg-gradient-to-r from-red-600/20 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300" />
        </button>
      </div>
    </div>
    </main>

  );

};
