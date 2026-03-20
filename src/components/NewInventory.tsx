
import { NewClothingInventory } from "./NewClothingInventory";
import { NewStorageInventory } from "./NewStorageInventory";
import { InventoryItem } from "./InventoryItem";
import { CraftingInventory } from "./CraftingInventory";
import { ItemDetails } from "./ItemDetail";

import type { InventoryMenuDTO } from "../DTOs/InventoryMenuDTO";

import { useInventoryState } from "./hooks/useInventoryState";
import { useInventoryDrag } from "./hooks/useInventoryDrag";
import { useInventoryEvents } from "./hooks/useInventoryEvents";

import { handleItemDrop } from "./handlers/handleItemDrop";

import { useModal } from "@/contexts/ModalContext";

type InventoryType =
  | "CharacterStorage"
  | "CharacterClothing"
  | "VehicleTrunk"
  | "VehicleDashboard"
  | "PropertyStorage"
  | "WorldObject"
  | "CraftingInventory";

const inventoryComponentMap: Partial<Record<InventoryType, React.ComponentType<any>>> = {
  CharacterStorage: NewStorageInventory,
  CharacterClothing: NewClothingInventory,
  CraftingInventory: CraftingInventory
};

export const NewInventory = ({
  inventories: initialInventories
}: {
  inventories: InventoryMenuDTO[];
}) => {
  // ===============================
  // 🧠 STATE
  // ===============================
  const {modals} = useModal();
  const {
    inventories,
    setInventories,
    selectedItem,
    setSelectedItem
  } = useInventoryState(initialInventories);

  // ===============================
  // 🖱️ DRAG
  // ===============================
  const {
    draggingItem,
    setDraggingItem,
    startPos,
    setStartPos,
    draggingPos,
    setDraggingPos,
    containerRef
  } = useInventoryDrag();

  // ===============================
  // 📡 SERVER EVENTS
  // ===============================
  useInventoryEvents(setInventories, draggingItem, setDraggingItem);

  // ===============================
  // 📦 COMMON PROPS
  // ===============================
  const commonProps = {
    draggingItem,
    startPos,
    setDraggingItem,
    setStartPos,
    setDraggingPos,
    draggingPos,
    onItemDrop: (key: string, order: number | null) => {
      if (!draggingItem) return;

      handleItemDrop({
        draggingItem,
        inventories,
        targetInventoryKey: key,
        targetOrder: order,
        onFinish: () => {
          setDraggingItem(null);
          setStartPos(null);
        }
      });
    },
    onItemUse: (item: any) => {
      //@ts-ignore
      mp.trigger("UseItem::ClientToServer", item.ItemId);
    },
    onItemRename: (item: any) => {
      console.log("Rename item", item);
    }
  };

  // ===============================
  // 🎨 RENDER
  // ===============================
  if(modals.Inventory) 
  return (
    <div
      ref={containerRef}
      className="flex items-center justify-evenly select-none max-w-[90vw] max-h-[80vw] inventory-container "
    >
      <div className="flex flex-row h-full w-full gap-4 p-4">

        <ItemDetails item={selectedItem} />

        {inventories.map(inv => {
          const Component =
            inventoryComponentMap[inv.InventoryType as InventoryType] ??
            NewStorageInventory;

          return (
            <Component
              key={inv.InventoryKey}
              inventory={inv}
              {...commonProps}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          );
        })}
      </div>

      {draggingItem && (
        <div
          style={{
            position: "fixed",
            left: draggingPos.x + 5,
            top: draggingPos.y + 5,
            pointerEvents: "none",
            zIndex: 9999
          }}
        >
          <InventoryItem
            name={draggingItem.Name}
            quantity={draggingItem.Quantity}
            imageSrc={draggingItem.ItemIcon || "/images/default-item.png"}
            weight={draggingItem.Weight}
          />
        </div>
      )}
    </div>
  );
};
