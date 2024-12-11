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
  getMenuPosition: (id: string) => number;
  changeMenusOrder: (active: number, over: number) => void;
};

export type { Menu, MenuContextType };
