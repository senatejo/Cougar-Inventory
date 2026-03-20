export interface InventoryMenuDTO {
  InventoryKey: string;
  InventoryType:
    | "CharacterStorage"
    | "CharacterClothing"
    | "VehicleTrunk"
    | "VehicleDashboard"
    | "PropertyStorage"
    | "WorldObject"
    | "CraftingInventory";
  ItemSlots: number;
  characterkey: string;
  mainInventory: boolean;
  MaxWeight: number;
  Items: InventoryMenuItemDTO[];
}

export interface InventoryMenuItemDTO {
  ItemId: string;
  Name: string;
  ItemType: "General" | "Clothing" | "Weapon" | "Crate" | "Phone" | "Food" | "Seeds" | "Crop" | "card" | "Crop";
  Quantity: number;
  MaxQuantity: number;
  Weight: number;
  item_use: boolean;
  IsInUse: boolean;
  UseFlag: "None" | "Once" | "Reusable";
  ItemIcon: string | null;
  InventoryKey?: string; //Refrence to which inventory this item belongs
  itemPlacement: number;
  order:number;
  Metadata?: string | null;
}