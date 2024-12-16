"use client"
import { recursiveAdd, recursiveDelete, recursiveUpdate } from '@/lib/helpers';
import menus from '@/lib/placeholder-data';
import { Menu, MenuContextType } from '@/lib/types';
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

    return (
        <MenuContext.Provider value={{ menusList, addMenu, deleteMenu, updateMenu, setMenusList }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenus = () => useContext(MenuContext);