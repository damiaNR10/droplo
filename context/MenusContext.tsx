"use client"
import { recursiveAdd, recursiveDelete, recursiveUpdate } from '@/lib/helpers';
import menus from '@/lib/placeholder-data';
import { Menu, MenuContextType } from '@/lib/types';
import { arrayMove } from '@dnd-kit/sortable';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export const MenuContext = createContext<MenuContextType>({} as MenuContextType);

export const MenusProvider = ({ children }: { children: ReactNode }) => {
    const [menusList, setMenusList] = useState<Menu[]>(menus);

    const addMenu = (menuToAdd: Menu, parentId?: string) => {

        if (parentId !== undefined) {
            const newMenusList = recursiveAdd(menusList, menuToAdd, parentId);
            setMenusList(newMenusList);
        } else setMenusList((prevMenusList) => { return [...prevMenusList, menuToAdd] });
    }

    const deleteMenu = (id: string) => {
        const newArray = recursiveDelete(id, menusList)
        setMenusList(newArray);
    }

    const updateMenu = (id: string, newName: string, newUrl: string) => {
        const updatedList = recursiveUpdate(menusList, id, newName, newUrl);
        setMenusList(updatedList);
    }

    const getMenuPosition = (id: string) => {
        return menusList.findIndex(menu => menu.id === id);
    }

    const changeMenusOrder = (activeId: number, overId: number) => {
        if (activeId !== overId) {
            setMenusList((menus) => arrayMove(menus, activeId, overId));
        }
    }

    return (
        <MenuContext.Provider value={{ menusList, changeMenusOrder, addMenu, deleteMenu, updateMenu, getMenuPosition }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenus = () => useContext(MenuContext);