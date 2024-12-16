import { UniqueIdentifier } from "@dnd-kit/core";
import { FlattenedMenu, Menu } from "./types";
import { arrayMove } from "@dnd-kit/sortable";

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

const flatten = (
  items: Menu[],
  parentId: UniqueIdentifier | null = null,
  depth = 0
): FlattenedMenu[] => {
  return items.reduce<FlattenedMenu[]>((acc, item, index) => {
    if (item.children && item.children.length > 0)
      return [
        ...acc,
        { ...item, parentId, depth, index },
        ...flatten(item.children, item.id, depth + 1),
      ];
    else {
      return [...acc, { ...item, parentId, depth, index }];
    }
  }, []);
};

const flattenTree = (items: Menu[]): FlattenedMenu[] => {
  return flatten(items);
};

const buildTree = (flattenedItems: FlattenedMenu[]): Menu[] | undefined => {
  const root: Menu = { id: "root", children: [], name: "", url: "" };
  const nodes: Record<string, Menu> = { [root.id]: root };
  const items = flattenedItems.map((item) => ({ ...item, children: [] }));

  for (const item of items) {
    const { id, children, name, url } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);

    nodes[id] = { id, name, url, children };
    parent.children!.push(item);
  }

  return root.children;
};

const findItem = (items: Menu[], itemId: UniqueIdentifier) => {
  return items.find(({ id }) => id === itemId);
};

const getDragDepth = (offset: number, indentationWidth: number) => {
  return Math.round(offset / indentationWidth);
};

const getMaxDepth = ({ previousItem }: { previousItem: FlattenedMenu }) => {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
};

const getMinDepth = ({ nextItem }: { nextItem: FlattenedMenu }) => {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
};

const getProjection = (
  items: FlattenedMenu[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number
) => {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem,
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  const getParentId = () => {
    if (depth === 0 || !previousItem) {
      return null;
    }

    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }

    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId;

    return newParent ?? null;
  };

  return { depth, maxDepth, minDepth, parentId: getParentId() };
};

const removeChildrenOf = (items: FlattenedMenu[], ids: UniqueIdentifier[]) => {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children && item.children.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }

    return true;
  });
};

export {
  recursiveAdd,
  recursiveDelete,
  recursiveUpdate,
  flattenTree,
  buildTree,
  getProjection,
  removeChildrenOf,
};
