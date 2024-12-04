type Menu = {
  id: string;
  name: string;
  url: string;
  children?: Menu[];
};

type MenuContextType = {
  menusList: Menu[];
  addMenu: (menu: Menu, parentId?: string) => void;
  updateMenu: (id: string, newName: string, newUrl: string) => void;
  deleteMenu: (id: string) => void;
};

export type { Menu, MenuContextType };
