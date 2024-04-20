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

export type Item = {
  id: number;
  name: string;
  description?: string;
  price: number;
};

export type Order = {
  id: number;
  user_id: number;
  status: string;
};
