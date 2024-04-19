export type WarehouseItem = {
  description: string;
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type Warehouse = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  items?: WarehouseItem[];
};
