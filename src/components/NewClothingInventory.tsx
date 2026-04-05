
import { useRef } from "react";
import { InventoryItem } from "./InventoryItem";
import type { InventoryMenuDTO, InventoryMenuItemDTO } from "../DTOs/InventoryMenuDTO";
import { isProduction } from "@/utils/Utilities";

interface Props {
  inventory: InventoryMenuDTO;
  draggingItem: InventoryMenuItemDTO | null;
  startPos: { x: number; y: number } | null;
  setDraggingItem: (item: InventoryMenuItemDTO | null) => void;
  setStartPos: (pos: { x: number; y: number } | null) => void;
  setDraggingPos: (pos: { x: number; y: number }) => void;
  onItemDrop: (targetInventoryKey: string, targetSlot: number) => void;
  draggingPos: { x: number; y: number };
    onItemUse: (item: InventoryMenuItemDTO) => void;
  onItemRename: (item: InventoryMenuItemDTO) => void;
}

export const NewClothingInventory = ({
  inventory,
  draggingItem,
  startPos,
  setDraggingItem,
  setStartPos,
  setDraggingPos,
  draggingPos
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getItemByPlacement = (placement: number) =>
    inventory.Items.find(item =>
      item.ItemType === "Clothing" &&
      item.itemPlacement === placement
    );

const handleMouseDown = (e: React.MouseEvent, item: InventoryMenuItemDTO | undefined, _placement: number) => {
  if (!item || e.button !== 0) return;

  console.log(e);

  setDraggingItem({ ...item, InventoryKey: item.InventoryKey });
  const pos = { x: e.clientX, y: e.clientY };
  setStartPos(pos);
  setDraggingPos(pos);
};

const handleMouseUp = (e: React.MouseEvent, placement: number) => {
  if (e.button !== 0 || !draggingItem || !startPos) return;

  const dx = Math.abs(draggingPos.x - startPos.x);
  const dy = Math.abs(draggingPos.y - startPos.y);
  
  if (dx > 5 || dy > 5) {
    // Hanya trigger event ke server, TIDAK update UI langsung
    // UI akan diupdate via server response nanti
    if(draggingItem.ItemType !== "Clothing"){
      console.warn("❌ Item non-clothing masuk clothing inventory");
      // Reset dragging state tanpa mengubah inventories
      setDraggingItem(null);
      setStartPos(null);
      setDraggingPos({ x: 0, y: 0 });
      return;
    }
    console.log("🧤 Trigger drop to server, placement:", placement);

    if(isProduction()){
          //@ts-ignore
    mp.trigger("MoveItem::ClientToServer", JSON.stringify({
      fromInventory: draggingItem.InventoryKey,
      toInventory: inventory.InventoryKey,
      fromOrder: draggingItem.order,
      toOrder: placement,
      itemId: draggingItem.ItemId
    }));
    }

    
    // Reset dragging state tanpa mengubah inventories
    setDraggingItem(null);
    setStartPos(null);
    setDraggingPos({ x: 0, y: 0 });
  }
};

  const SlotButton = ({ placement, fallbackIcon }: { placement: number, fallbackIcon: string }) => {
    const item = getItemByPlacement(placement);
    return (
    <div
          className="rounded-full w-16 h-16 bg-red-800/20 flex flex-col items-center justify-evenly border-red-900 border-b-8 hover:bg-gray-500/70 hover:border-gray-600"
          onMouseDown={(e) => handleMouseDown(e, item, placement)}
          onMouseUp={(e) => handleMouseUp(e, draggingItem?.itemPlacement || placement)}
        >
        {item ? (
          <InventoryItem
            mode="clothing"
            name={item.Name}
            quantity={item.Quantity}
            imageSrc={item.ItemIcon || "./images/default-item.png"}
            weight={item.Weight}
          />
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={fallbackIcon}
              className="object-cover w-10 h-10"
            />
            <h1 className="text-white text-pretty font-semibold">{placement}</h1>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full max-w-[550px] flex flex-col inventory-container" ref={containerRef}>
      <div className="flex flex-row justify-evenly w-full">
        <div className="w-32 flex flex-col space-y-7 items-center justify-evenly ">
          <SlotButton placement={1} fallbackIcon="./images/mask.png" />
          <SlotButton placement={3} fallbackIcon="./images/torso.png" />
          <SlotButton placement={4} fallbackIcon="./images/leg.png" />
          <SlotButton placement={5} fallbackIcon="./images/bags.png" />
          <SlotButton placement={6} fallbackIcon="./images/shoes.png" />
          <SlotButton placement={7} fallbackIcon="./images/accessories.png" />
        </div>

        <div className="w-full flex flex-col justify-evenly items-center ">
          <img src="./images/body.png" className="h-[300px]" />
          <div className="grid grid-cols-2 gap-x-20 gap-y-5">
            <SlotButton placement={13} fallbackIcon="./images/glasses.png" />
            <SlotButton placement={14} fallbackIcon="./images/ears.png" />
            <SlotButton placement={15} fallbackIcon="./images/watch.png" />
            <SlotButton placement={16} fallbackIcon="./images/bracelets.png" />
          </div>
        </div>

        <div className="w-32 flex flex-col space-y-7 items-center justify-evenly ">
          <SlotButton placement={8} fallbackIcon="./images/undershirt.png" />
          <SlotButton placement={9} fallbackIcon="./images/armour.png" />
          <SlotButton placement={10} fallbackIcon="./images/decals.png" />
          <SlotButton placement={11} fallbackIcon="./images/tops.png" />
          <SlotButton placement={12} fallbackIcon="./images/hats.png" />
        </div>
      </div>
    </div>
  );
};
