export interface Item {
  id: number;
  image: string;
  name: string;
  page: string;
}

export interface UsersProps {
  users: Item[];
}

export interface ItemsProps {
  items: Item[];
}
