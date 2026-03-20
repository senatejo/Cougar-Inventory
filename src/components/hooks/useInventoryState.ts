import { useState } from "react";
import type { InventoryMenuDTO, InventoryMenuItemDTO } from "../../DTOs/InventoryMenuDTO";

export function useInventoryState(initialInventories: InventoryMenuDTO[]) {
  const [inventories, setInventories] = useState<InventoryMenuDTO[]>(initialInventories);
  const [selectedItem, setSelectedItem] = useState<InventoryMenuItemDTO | null>(null);

  return {
    inventories,
    setInventories,
    selectedItem,
    setSelectedItem
  };
}
