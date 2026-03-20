import { useEffect, useRef, useState } from "react";
import type { InventoryMenuItemDTO } from "../../DTOs/InventoryMenuDTO";

export function useInventoryDrag() {
  const [draggingItem, setDraggingItem] = useState<InventoryMenuItemDTO | null>(null);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [draggingPos, setDraggingPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // ===============================
  // 🖱️ Mouse Move + Mouse Up
  // ===============================
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingItem || !startPos) return;

      const dx = Math.abs(e.clientX - startPos.x);
      const dy = Math.abs(e.clientY - startPos.y);

      if (dx > 5 || dy > 5) {
        setDraggingPos({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setDraggingItem(null);
      setStartPos(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingItem, startPos]);

  // ===============================
  // 🧹 Drop di luar inventory
  // ===============================
  useEffect(() => {
    const handleGlobalMouseUp = (e: MouseEvent) => {
      if (!draggingItem || !containerRef.current) return;

      const inventories = Array.from(
        document.querySelectorAll(".inventory-container")
      );

      const isInsideInventory = inventories.some(container => {
        const rect = container.getBoundingClientRect();
        return (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );
      });

      if (!isInsideInventory) {
        console.log("Item dropped outside inventory:", draggingItem.ItemId);
        //@ts-ignore
        mp.trigger("DropItem::ClientToServer", draggingItem.ItemId);
        setDraggingItem(null);
        setStartPos(null);
      }
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => document.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [draggingItem]);

  return {
    draggingItem,
    setDraggingItem,
    startPos,
    setStartPos,
    dragginggingPos: draggingPos,
    draggingPos,
    setDraggingPos,
    containerRef
  };
}
