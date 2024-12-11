import { Menu } from "./types";

const recursiveAdd = (menus: Menu[], menuToAdd: Menu, parentId: string) => {
  const tmp: Menu[] = menus.reduce((acc: Menu[], cv: Menu) => {
    if (cv.children && cv.children.length > 0) {
      cv.children = recursiveAdd(cv.children, menuToAdd, parentId);
    }
    if (cv.id === parentId) {
      return [
        ...acc,
        {
          name: cv.name,
          url: cv.url,
          id: cv.id,
          children: cv.children ? [...cv.children, menuToAdd] : [menuToAdd],
        },
      ];
    }
    return [...acc, cv];
  }, []);
  return tmp;
};

const recursiveUpdate = (
  menus: Menu[],
  id: string,
  newName: string,
  newUrl: string
) => {
  const tmp: Menu[] = menus.reduce((acc: Menu[], cv: Menu) => {
    if (cv.children && cv.children.length > 0) {
      cv.children = recursiveUpdate(cv.children, id, newName, newUrl);
    }
    if (cv.id === id) return [...acc, { ...cv, name: newName, url: newUrl }];
    return [...acc, cv];
  }, []);
  return tmp;
};

const recursiveDelete = (id: string, menus: Menu[]) => {
  const tmp: Menu[] = menus.reduce((acc: Menu[], cv: Menu) => {
    if (cv.children && cv.children.length > 0) {
      cv.children = recursiveDelete(id, cv.children);
    }
    if (cv.id === id) {
      return [...acc];
    } else return [...acc, cv];
  }, []);
  return tmp;
};

export { recursiveAdd, recursiveDelete, recursiveUpdate };
