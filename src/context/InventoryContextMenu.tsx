import { useEffect, useRef, useState } from "react";
import type { InventoryMenuItemDTO } from "../DTOs/InventoryMenuDTO";

interface InventoryContextMenuProps {
  x: number;
  y: number;
  item: InventoryMenuItemDTO;
  onClose: () => void;
  onUse: () => void;
  onRename: () => void;
  onGive: ()=> void;
  onDrop: () => void;
  onSplit: ()=> void;
}

export const InventoryContextMenu = ({
  x,
  y,
  item,
  onClose,
  onUse,
  onRename,
  onDrop,
  onSplit,
  onGive
}: InventoryContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  // Tentukan apakah item bisa digunakan berdasarkan UseFlag
  const canUseItem = item.UseFlag === "Once" || item.UseFlag === "Reusable";
  // Tentukan teks untuk button use berdasarkan item_use dan UseFlag
  let useButtonText;

  useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


switch (true) {
  case item.item_use:
    useButtonText = "Unequip";
    break;
  case canUseItem:
    if (item.ItemType === "Food") {
      useButtonText = "Consume";
    } else if (item.ItemType === "Seeds") {
      useButtonText = "Plant";
    } else {
      useButtonText = "Use";
    }
    break;
  default:
    useButtonText = "Use";
    break;
}



  if (!isOpen) return null;

  return (
    <div 
    ref={menuRef}
      className="fixed bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50 min-w-[150px] text-white"
      style={{ left: x, top: y }}
    >
      <div className="flex flex-col p-1">
        <button 
          className="text-left px-4 py-2 hover:bg-gray-700"
          onClick={() => {
            // Show detailed item info
            console.log("Show item details", item);
            handleClose();
          }}
        >
          Item Details
        </button>
        
        {canUseItem && (
          <button 
            className="text-left px-4 py-2 hover:bg-gray-700"
            onClick={onUse}
          >
            {useButtonText}
          </button>
        )}
        
        <button 
          className="text-left px-4 py-2 hover:bg-gray-700"
          onClick={onRename}
        >
          Rename
        </button>

        <button 
          className="text-left px-4 py-2 hover:bg-gray-700"
          onClick={onGive}
        >
          Give
        </button>
        
        <button 
          className="text-left px-4 py-2 hover:bg-gray-700 text-red-400"
          onClick={onDrop}
        >
          Drop
        </button>

                <button 
          className="text-left px-4 py-2 hover:bg-gray-700 text-red-400"
          onClick={onSplit}
        >
          Split
        </button>
      </div>
    </div>
  );
};