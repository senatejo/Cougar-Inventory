
import { useEffect, useState } from 'react'
import { EventController } from './utils/EventController'
import { NewInventory } from './components/NewInventory'
import type { InventoryMenuDTO } from './DTOs/InventoryMenuDTO'

//@ts-ignore
import { isProduction } from './utils/Utilities'
//@ts-ignore
import dummyInventory from './DataDummy/dummyInventory'
import { useModal } from './contexts/ModalContext'

function App() {
  const [inventories, setInventories] = useState<InventoryMenuDTO[]>([]);
    const { modals, showModal, hideModal, toggleModal } = useModal();

  EventController.addListener("show", show);
  EventController.addListener("hide", hide);
  EventController.addListener("toggle", toggle);

  function show(value: any) {
    showModal(value);
  }

  function hide(value: any) {
    hideModal(value);
  }

  function toggle(value: any) {
    toggleModal(value);
  }

//   useEffect(() => {
//   if (!isProduction()){
// setInventories(dummyInventory);
//   }
// }, []);

  useEffect(() => {
    const handleInventoryData = (data: InventoryMenuDTO[]) => {
      setInventories(data);
    };

    EventController.addListener("NewInventory::SendInventoryData::CLient::CEF", handleInventoryData);

    return () => {
      EventController.removeListener("NewInventory::SendInventoryData::CLient::CEF", handleInventoryData);
    };
  }, []);



useEffect(() => {
  if (!modals.Inventory) {
   setInventories([]);
  }
}, [modals.Inventory]);

    return (
<div 
  className="fixed inset-0 flex items-center justify-center bg-transparent"
  style={{ pointerEvents: 'auto' }}
>

  {inventories.length > 0 && <NewInventory inventories={inventories} />}
</div>

  )
}

export default App
