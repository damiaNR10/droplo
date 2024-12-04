"use client"
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
        console.log('inside: ', id, newName, newUrl)
        const updatedList = recursiveUpdate(menusList, id, newName, newUrl);
        setMenusList(updatedList);
    }

    const recursiveAdd = (menus: Menu[], menuToAdd: Menu, parentId: string) => {
        const tmp: Menu[] = menus.reduce((acc: Menu[], cv: Menu) => {
            if (cv.children && cv.children.length > 0) {
                cv.children = recursiveAdd(cv.children, menuToAdd, parentId);
            }
            if (cv.id === parentId) {
                return [...acc, { name: cv.name, url: cv.url, id: cv.id, children: cv.children ? [...cv.children, menuToAdd] : [menuToAdd] }]
            }
            return [...acc, cv];
        }, [])
        return tmp;
    }

    const recursiveUpdate = (menus: Menu[], id: string, newName: string, newUrl: string) => {
        const tmp: Menu[] = menus.reduce((acc: Menu[], cv: Menu) => {
            if (cv.children && cv.children.length > 0) {
                cv.children = recursiveUpdate(cv.children, id, newName, newUrl);
            }
            if (cv.id === id) return [...acc, { ...cv, name: newName, url: newUrl }]
            return [...acc, cv];
        }, [])
        return tmp;
    }

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
    }

    return (
        <MenuContext.Provider value={{ menusList, addMenu, deleteMenu, updateMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

// Custom hook to use the context
export const useMenus = () => useContext(MenuContext);