import type { InventoryMenuDTO } from "../DTOs/InventoryMenuDTO";

const dummyInventory: InventoryMenuDTO[] = [

  {
    InventoryKey: "90b7311d-18bd-470c-a1af-b450367c207e",
    characterkey: "gdagadgadgadgda531351gadgadgda",
    mainInventory: true,
    InventoryType: "CharacterStorage",
    ItemSlots: 40,
    MaxWeight: 20.0,
    IsLocked: false,
    Items: 
    [
            {
        ItemId: "70v2c4a59-8bd1-47ce-9cb3-958eb835e50a",
        InventoryKey: "90b7311d-18bd-470c-a1af-b450367c207e",
        Name: "rexona",
        ItemType: "Seeds",
        Quantity: 1,
        MaxQuantity: 5,
        Weight: 3.0,
        itemPlacement: 0, // ✅ Default 0 untuk non-clothing
        order: 0, // ✅ Urutan pertama di storage
        IsInUse: true,
        item_use: false,
        UseFlag: "Reusable",
        ItemIcon: "./farm/seeds.png",
        
      },
            {
        ItemId: "702qc4a59-8bd1-47ce-9cb3-958eb835e50a",
        InventoryKey: "90b7311d-18bd-470c-a1af-b450367c207e",
        Name: "rexona",
        ItemType: "Seeds",
        Quantity: 1,
        MaxQuantity: 5,
        Weight: 3.0,
        itemPlacement: 0, // ✅ Default 0 untuk non-clothing
        order: 1, // ✅ Urutan pertama di storage
        IsInUse: true,
        item_use: false,
        UseFlag: "Reusable",
        ItemIcon: "./farm/potato.png",
        
      },
      {
        ItemId: "702c4a5e9-8bd1-47cg-9cb3-958eb835e50a",
        InventoryKey: "90b7311d-18bd-470c-a1af-b450367c207e",
        Name: "rexona",
        ItemType: "Seeds",
        Quantity: 1,
        MaxQuantity: 5,
        Weight: 3.0,
        itemPlacement: 0, // ✅ Default 0 untuk non-clothing
        order: 2, // ✅ Urutan pertama di storage
        IsInUse: true,
        item_use: false,
        UseFlag: "Reusable",
        ItemIcon: "./farm/corn.png",
        
      },
      {
        ItemId: "702c4a59-8bd1-47ce-9cb3-958eb835e50a",
        InventoryKey: "90b7311d-18bd-470c-a1af-b450367c207e",
        Name: "rexona",
        ItemType: "Seeds",
        Quantity: 1,
        MaxQuantity: 5,
        Weight: 3.0,
        itemPlacement: 0, // ✅ Default 0 untuk non-clothing
        order: 3, // ✅ Urutan pertama di storage
        IsInUse: true,
        item_use: true,
        UseFlag: "Reusable",
        ItemIcon: "./farm/seeds.png",
        
      },
      {
        ItemId: "96384ca2-f6f8-418c-968a-c0db8213bd95",
        InventoryKey: "90b7311d-18bd-470c-a1af-b450367c207e",
        Name: "kaos hitam",
        ItemType: "Clothing",
        Quantity: 1,
        MaxQuantity: 5,
        Weight: 1.0,
        itemPlacement: 11, // ✅ Masih ada placement untuk jika dipindah ke clothing
        order: 4, // ✅ Urutan kedua di storage
        IsInUse: false,
        item_use: false,
        UseFlag: "None",
        ItemIcon: "./farm/corn.png"
      },
      {
        ItemId: "a485855a-962d-4cb3-890c-1cb35eebcd3e",
        InventoryKey: "90b7311d-18bd-470c-a1af-b450367c207e",
        Name: "Jagung",
        ItemType: "Crop",
        Quantity: 2,
        MaxQuantity: 10,
        Weight: 0.5,
        itemPlacement: 0, // ✅ Default 0
        order: 5, // ✅ Urutan ketiga di storage
        IsInUse: false,
        item_use: false,
        UseFlag: "Reusable",
        ItemIcon: "./farm/corn.png"
      },
      {
        ItemId: "a485855b-962d-4cb3-890c-1cb35eebcd3e",
        InventoryKey: "90b7311d-18bd-470c-a1af-b450367c207e",
        Name: "botol air",
        ItemType: "General",
        Quantity: 2,
        MaxQuantity: 10,
        Weight: 0.5,
        itemPlacement: 0, // ✅ Default 0
        order: 6, // ✅ Urutan ketiga di storage
        IsInUse: false,
        item_use: false,
        UseFlag: "Reusable",
        ItemIcon: "./farm/seeds.png"
      }
    ]
  },
    {
    InventoryKey: "50ded1e4-9f66-4892-88bd-522deed6adee",
    characterkey: "gdagadgadga533dgdagadgadgda",
    mainInventory: true,
    InventoryType: "CharacterClothing",
    ItemSlots: 17,
    MaxWeight: 20.0,
    IsLocked: false,
    Items: [
      {
        ItemId: "a485855a-962d-4cb3-890c-1cb35eebcf2d",
        InventoryKey: "50ded1e4-9f66-4892-88bd-522deed6adee",
        Name: "kaos",
        ItemType: "Clothing",
        Quantity: 1,
        MaxQuantity: 1,
        Weight: 1.0,
        itemPlacement: 11, // ✅ Clothing slot placement (tetap pakai slot system)
        order: 0, // ✅ Untuk clothing, order tidak terlalu penting
        IsInUse: false,
        item_use: false,
        UseFlag: "None",
        ItemIcon: "https://img.lovepik.com/png/20231105/Shirt-Mens-Apparel-clothes-polo-shirt-people_500120_wh860.png"
      }
    ]
  },
  {
    InventoryKey: "50ded1e4-9f66-48351-88bd-522deed6adeee",
    characterkey: "gdagadgadgadgdagadgadgda",
    mainInventory: false,
    InventoryType: "CraftingInventory",
    ItemSlots: 17,
    MaxWeight: 20.0,
    IsLocked: false,
    Items: [
      {
        ItemId: "a485855a-962d-4cb3-890c-1cb35eebef2d",
        Name: "jaket",
        ItemType: "Clothing",
        Quantity: 1,
        MaxQuantity: 1,
        Weight: 2.0,
        itemPlacement: 9, // ✅ Placement untuk armour/jaket
        order: 0, // ✅ Urutan pertama
        IsInUse: false,
        item_use: false,
        UseFlag: "None",
        InventoryKey: "50ded1e4-9f66-48351-88bd-522deed6adee",
        ItemIcon: "https://png.pngtree.com/png-clipart/20230401/original/pngtree-men-s-jacket-clipart-png-image_9016805.png"
      },
      {
        ItemId: "a485855a-962d-4cb3-890c-1cb35eebcs2d",
        Name: "sepatu",
        ItemType: "Clothing",
        Quantity: 1,
        MaxQuantity: 1,
        Weight: 1.5,
        itemPlacement: 6, // ✅ Clothing slot placement (shoes)
        order: 1, // ✅ Urutan kedua
        IsInUse: false,
        item_use: false,
        UseFlag: "None",
        InventoryKey: "50ded1e4-9f66-48351-88bd-522deed6adee",
        ItemIcon: "https://img.pikbest.com/origin/10/48/96/28spIkbEsTdq3.png!sw800"
      },
      {
        ItemId: "b595855a-962d-4cb3-890c-1cb35eebcd4f",
        Name: "sendal",
        ItemType: "Clothing",
        Quantity: 1,
        MaxQuantity: 1,
        Weight: 0.3,
        itemPlacement: 6, // ✅ Juga shoes
        order: 2, // ✅ Urutan ketiga
        IsInUse: false,
        item_use: false,
        UseFlag: "None",
        InventoryKey: "50ded1e4-9f66-48351-88bd-522deed6adee",
        ItemIcon: "https://static.vecteezy.com/system/resources/previews/023/130/919/non_2x/flip-flops-slippers-cartoon-icon-illustration-footwear-fashion-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg"
      }
    ]
  }
];

export default dummyInventory;
