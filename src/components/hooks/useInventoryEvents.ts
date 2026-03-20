import { useEffect } from "react";
import type {
  InventoryMenuDTO,
  InventoryMenuItemDTO
} from "../../DTOs/InventoryMenuDTO";
import { EventController } from "../../utils/EventController";

export function useInventoryEvents(
  setInventories: React.Dispatch<React.SetStateAction<InventoryMenuDTO[]>>,
  draggingItem: InventoryMenuItemDTO | null,
  setDraggingItem: (item: InventoryMenuItemDTO | null) => void
) {
  
useEffect(() => {
const HandlerServerItemUpdate = (data: { itemId: string; order: number; inventoryKey: string, ItemUse: boolean }) => {
  console.log("ItemUpdate", data);

  setInventories(prev => {
    let newInv = [...prev];
    //@ts-ignore
    let itemFound = false;

    // 1) Loop seluruh inventory
    for (let i = 0; i < newInv.length; i++) {
      const inv = newInv[i];
      const idx = inv.Items.findIndex(it => it.ItemId === data.itemId);

      if (idx !== -1) {
        itemFound = true;

        const item = inv.Items[idx];

        // 2) Jika inventory key berubah → pindahin item
        if (item.InventoryKey !== data.inventoryKey) {
          console.log("Item pindah inventory:", item.ItemId);

          // Hapus dari inventory lama
          newInv[i] = {
            ...inv,
            Items: inv.Items.filter(it => it.ItemId !== item.ItemId)
          };

          // Masukkan ke inventory target hanya kalau inventory itu ADA di UI
          const targetIndex = newInv.findIndex(t => t.InventoryKey === data.inventoryKey);
          if (targetIndex !== -1) {
            newInv[targetIndex] = {
              ...newInv[targetIndex],
              Items: [
                ...newInv[targetIndex].Items,
                { ...item, InventoryKey: data.inventoryKey, order: data.order, item_use: data.ItemUse }
              ]
            };
          } else {
            // 3) Jika inventory key tidak cocok di UI → ITEM DIHAPUS DARI UI
            console.log("InventoryKey tidak ada di UI → hapus item dari UI");
          }

        } else {
          // 4) Inventory sama → cukup update order nya
          if (item.order !== data.order || item.item_use !== data.ItemUse) {
            const cloned = [...inv.Items];
            cloned[idx] = {
              ...item,
              order: data.order,
              item_use: data.ItemUse
            };

            newInv[i] = {
              ...inv,
              Items: cloned
            };
          }
        }

        break;
      }
    }

    return newInv;
  });
};

    // Handler untuk event dari server - Item Move/Update
  const handleServerItemMove = (data: string) => {
    console.log("HandleServerItemMove dipanggil");
    try {
      const updatedItem: InventoryMenuItemDTO = JSON.parse(data);

      // 🔒 pastikan setiap kali ada update, kita pakai salinan baru (deep clone)
      const clonedUpdatedItem = JSON.parse(JSON.stringify(updatedItem));

      setInventories(prevInventories => {
        const newInventories = [...prevInventories];
        let itemFoundInAnyInventory = false;

        // Iterasi semua inventory yang ada
        for (let i = 0; i < newInventories.length; i++) {
          const inv = newInventories[i];
          const itemIndex = inv.Items.findIndex(item => item.ItemId === clonedUpdatedItem.ItemId);

          // Jika item ditemukan di inventory ini
          if (itemIndex !== -1) {
            itemFoundInAnyInventory = true;

            // 🔁 Jika inventory key berubah (item pindah antar inventory)
            if (inv.InventoryKey !== clonedUpdatedItem.InventoryKey) {
              console.log(`Item ${clonedUpdatedItem.ItemId} pindah dari ${inv.InventoryKey} ke ${clonedUpdatedItem.InventoryKey}`);

              // Hapus item dari inventory lama
              newInventories[i] = {
                ...inv,
                Items: inv.Items.filter(item => item.ItemId !== clonedUpdatedItem.ItemId)
              };

              // Cari inventory target berdasarkan InventoryKey baru
              const targetInventoryIndex = newInventories.findIndex(
                targetInv => targetInv.InventoryKey === clonedUpdatedItem.InventoryKey
              );

              if (targetInventoryIndex !== -1) {
                console.log(`Menambahkan item ke inventory ${clonedUpdatedItem.InventoryKey}`);

                const existingItemInSlot = newInventories[targetInventoryIndex].Items.find(
                  item => item.order === clonedUpdatedItem.order
                );

                // 🧠 Gunakan deep clone agar tiap item tidak share referensi
                const clonedItems = newInventories[targetInventoryIndex].Items.map(item => ({ ...item }));

                if (existingItemInSlot) {
                  newInventories[targetInventoryIndex] = {
                    ...newInventories[targetInventoryIndex],
                    Items: clonedItems.map(item =>
                      item.order === clonedUpdatedItem.order ? clonedUpdatedItem : item
                    )
                  };
                } else {
                  newInventories[targetInventoryIndex] = {
                    ...newInventories[targetInventoryIndex],
                    Items: [...clonedItems, clonedUpdatedItem]
                  };
                }
              }
            } else {
              // 📦 Item diupdate dalam inventory yang sama
              const clonedItems = [...inv.Items.map(item => ({ ...item }))];
              clonedItems[itemIndex] = clonedUpdatedItem;

              newInventories[i] = {
                ...inv,
                Items: clonedItems
              };
            }

   
          }
        }

        // Jika item belum ada di UI manapun (misalnya baru ditambahkan)
        if (!itemFoundInAnyInventory) {
          const targetInventoryIndex = newInventories.findIndex(
            inv => inv.InventoryKey === clonedUpdatedItem.InventoryKey
          );

          if (targetInventoryIndex !== -1) {
            console.log(`Menambahkan item baru ke inventory ${clonedUpdatedItem.InventoryKey}`);

            const clonedItems = newInventories[targetInventoryIndex].Items.map(item => ({ ...item }));
            const existingItemInSlot = clonedItems.find(item => item.order === clonedUpdatedItem.order);

            if (existingItemInSlot) {
              newInventories[targetInventoryIndex] = {
                ...newInventories[targetInventoryIndex],
                Items: clonedItems.map(item =>
                  item.order === clonedUpdatedItem.order ? clonedUpdatedItem : item
                )
              };
            } else {
              newInventories[targetInventoryIndex] = {
                ...newInventories[targetInventoryIndex],
                Items: [...clonedItems, clonedUpdatedItem]
              };
            }
          }
        }

        return newInventories;
      });

      // Jika sedang dragging item yang sama, update juga
      if (draggingItem && draggingItem.ItemId === updatedItem.ItemId) {
        setDraggingItem(JSON.parse(JSON.stringify(updatedItem)));
      }

    } catch (error) {
      console.error("Error parsing server item update:", error);
    }
  };

  const handleServerItemSwap = (data: string) => {
    console.log("handleServerItemSwap dipanggil");
    try {
      const swapData: {
        item1: InventoryMenuItemDTO;
        item2: InventoryMenuItemDTO;
      } = JSON.parse(data);
      
      const { item1, item2 } = swapData;
      
      setInventories(prevInventories => {
        return prevInventories.map(inv => {
          // Cari item yang perlu diupdate di inventory ini
          const items = [...inv.Items];
          let updated = false;
          
          // Update item1 jika ada di inventory ini
          const item1Index = items.findIndex(item => item.ItemId === item1.ItemId);
          if (item1Index !== -1) {
            items[item1Index] = item1;
            updated = true;
          }
          
          // Update item2 jika ada di inventory ini
          const item2Index = items.findIndex(item => item.ItemId === item2.ItemId);
          if (item2Index !== -1) {
            items[item2Index] = item2;
            updated = true;
          }
          
          // Jika ada perubahan, return inventory yang diupdate
          if (updated) {
            return { ...inv, Items: items };
          }
          
          return inv;
        });
      });
      
      // Update draggingItem jika salah satu item yang diswap sedang didrag
      if (draggingItem) {
        if (draggingItem.ItemId === item1.ItemId) {
          setDraggingItem(item1);
        } else if (draggingItem.ItemId === item2.ItemId) {
          setDraggingItem(item2);
        }
      }
      
    } catch (error) {
      console.error("Error parsing server item swap:", error);
    }
  };

  // Handler untuk event item removal dari server
  const handleServerItemRemove = (itemId: string) => {
    console.log("handleServerItemRemove dipanggil");
    setInventories(prevInventories => {
      return prevInventories.map(inv => {
        return {
          ...inv,
          Items: inv.Items.filter(item => item.ItemId !== itemId)
        };
      });
    });
    
    // Jika item yang dihapus sedang didrag, reset dragging state
    if (draggingItem && draggingItem.ItemId === itemId) {
      setDraggingItem(null);
    }
  };

const handleUnlockInventory = (key: string) => {
  console.log("Unlock inventory:", key);

  setInventories(prev =>
    prev.map(inv =>
      inv.InventoryKey === key
        ? { ...inv, IsLocked: false }
        : inv
    )
  );
};


  const handleNormalizeOrder = (data: string) => {
console.log("handleNormalizeOrder dipanggil");
try {
  const updatedItems: InventoryMenuItemDTO[] = JSON.parse(data);

const groupedByInventory = updatedItems.reduce((acc, item) => {
  if (!item.InventoryKey) return acc; // skip item yang gak punya key

  if (!acc[item.InventoryKey]) acc[item.InventoryKey] = [];
  acc[item.InventoryKey].push(item);
  return acc;
}, {} as Record<string, InventoryMenuItemDTO[]>);


  setInventories(prevInventories => {
    return prevInventories.map(inv => {
      const normalizedItems = groupedByInventory[inv.InventoryKey];
      if (!normalizedItems) return inv; // tidak ada perubahan untuk inventory ini

      // Gantikan semua item dengan list baru yang sudah dinormalisasi
      return {
        ...inv,
        Items: normalizedItems.sort((a, b) => a.order - b.order) // pastikan UI tetap urut
      };
    });
  });

} catch (error) {
  console.error("Error parsing normalize order data:", error);
}
  };

    // Register event handlers menggunakan EventController
    EventController.addListener("ItemUpdate::ServerToClient::CEF", HandlerServerItemUpdate);
    EventController.addListener("ItemMove::ServerToClient::CEF", handleServerItemMove);
    EventController.addListener("ItemSwap::ServerToCLient::CEF", handleServerItemSwap);
    EventController.addListener("ItemRemove::ServerToClient::CEF", handleServerItemRemove);
    EventController.addListener("Inventory::UnlockInventory::Client::CEF", handleUnlockInventory);
    EventController.addListener("Inventory::NormalizeOrder::Client::CEF", handleNormalizeOrder);
    // Cleanup function
return () => {
  EventController.removeListener("ItemUpdate::ServerToClient::CEF", HandlerServerItemUpdate);
  EventController.removeListener("ItemMove::ServerToClient::CEF", handleServerItemMove);
  EventController.removeListener("ItemSwap::ServerToCLient::CEF", handleServerItemSwap);
  EventController.removeListener("ItemRemove::ServerToClient::CEF", handleServerItemRemove);
  EventController.removeListener("Inventory::UnlockInventory::Client::CEF", handleUnlockInventory);
  EventController.removeListener("Inventory::NormalizeOrder::Client::CEF", handleNormalizeOrder);
};
  }, [draggingItem]);

  
}
