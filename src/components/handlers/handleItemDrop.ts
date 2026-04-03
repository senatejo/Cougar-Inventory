import { InventoryMenuDTO, InventoryMenuItemDTO } from "@/DTOs/InventoryMenuDTO";
import { isProduction } from "@/utils/Utilities";

interface HandleItemDropParams {
  draggingItem: InventoryMenuItemDTO;
  inventories: InventoryMenuDTO[];
  targetInventoryKey: string;
  targetOrder: number | null;
  onFinish?: () => void;
}

export function handleItemDrop({
  draggingItem,
  inventories,
  targetInventoryKey,
  targetOrder,
  onFinish
}: HandleItemDropParams) {

  const toInv = inventories.find(inv => inv.InventoryKey === targetInventoryKey);
  if (!toInv) return;

  const fromInv = inventories.find(inv => inv.InventoryKey === draggingItem.InventoryKey);
  const isFromClothing = fromInv?.InventoryType === "CharacterClothing";
  const isToClothing   = toInv.InventoryType === "CharacterClothing";

  const targetItem =
    targetOrder != null
      ? toInv.Items.find(i => i.order === targetOrder)
      : undefined;

  // ===============================
  // 👕 DARI CLOTHING INVENTORY
  // ===============================
  if (isFromClothing) {
    // ❌ target clothing tapi item bukan clothing
    if (isToClothing && draggingItem.ItemType !== "Clothing") {
      console.warn("❌ Non-clothing ke clothing");
      onFinish?.();
      return;
    }

    // ✅ target slot ADA item
    if (targetItem) {
      const samePlacement =
        targetItem.ItemType === "Clothing" &&
        targetItem.itemPlacement === draggingItem.itemPlacement;

      // ❌ beda placement / bukan clothing
      if (!samePlacement) {
        console.log("👕 Placement beda → cari slot kosong");

        const usedOrders = toInv.Items.map(i => i.order);
        let emptyOrder = 0;
        while (usedOrders.includes(emptyOrder)) emptyOrder++;

        sendMove(draggingItem, targetInventoryKey, emptyOrder);
        onFinish?.();
        return;
      }
    }

    // ✅ slot kosong ATAU placement sama
    sendMove(
      draggingItem,
      targetInventoryKey,
      draggingItem.itemPlacement
    );
    onFinish?.();
    return;
  }

  // ===============================
  // 📦 STORAGE NORMAL
  // ===============================
  let newOrder = targetOrder;

  if (newOrder == null || isNaN(newOrder)) {
    const usedOrders = toInv.Items.map(i => i.order);
    let i = 0;
    while (usedOrders.includes(i)) i++;
    newOrder = i;
  }

  sendMove(draggingItem, targetInventoryKey, newOrder);
  onFinish?.();
}

// ===============================
// 🔌 Helper
// ===============================
function sendMove(
  item: InventoryMenuItemDTO,
  toInventory: string,
  toOrder: number
) {
  console.log("📤 Move item:", {
    from: item.InventoryKey,
    to: toInventory,
    order: toOrder,
    
  });

  if (!isProduction()) return;

  //@ts-ignore
  mp.trigger("MoveItem::ClientToServer", JSON.stringify({
    fromInventory: item.InventoryKey,
    toInventory,
    fromOrder: item.order,
    toOrder,
    itemId: item.ItemId
  }));
}
