import { UniqueIdentifier } from "@dnd-kit/core";

type Menu = {
  id: string;
  name: string;
  url: string;
  children?: Menu[];
  collapsed?: boolean;
};

interface FlattenedMenu extends Menu {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

type MenuContextType = {
  menusList: Menu[];
  addMenu: (menu: Menu, parentId?: string) => void;
  updateMenu: (id: string, newName: string, newUrl: string) => void;
  deleteMenu: (id: string) => void;
  setMenusList: React.Dispatch<React.SetStateAction<Menu[]>>;
};

export type { Menu, MenuContextType, FlattenedMenu };
