import { FlattenedMenu, Menu } from "@/lib/types";
import SingleMenu from "../SingleMenu/SingleMenu";
import './MenusList.scss';
import { closestCenter, DndContext, DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier, } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMenus } from "@/context/MenusContext";
import { buildTree, flattenTree, getProjection, removeChildrenOf } from "@/lib/helpers";
import { useMemo, useState } from "react";

type Props = {
    menus: Menu[],
}

const MenusList = ({ menus }: Props) => {

    const { menusList, setMenusList } = useMenus();
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [overId, setOverId] = useState<UniqueIdentifier | null>(null);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const flattenedItems = useMemo(() => {
        const flattenedTree = flattenTree(menusList);
        const collapsedItems = flattenedTree.reduce<string[]>(
            (acc, { children, collapsed, id }) =>
                collapsed && children && children.length ? [...acc, id] : acc,
            []
        );

        return removeChildrenOf(
            flattenedTree,
            activeId != null ? [activeId, ...collapsedItems] : collapsedItems
        );
    }, [activeId, menusList]);
    const projected =
        activeId && overId
            ? getProjection(
                flattenedItems,
                activeId,
                overId,
                offsetLeft,
                50
            )
            : null;

    const resetState = () => {
        setOverId(null);
        setActiveId(null);
        setOffsetLeft(0);
        document.body.style.setProperty('cursor', '');
    }

    const handleDragStart = ({ active: { id: activeId } }: DragStartEvent) => {
        setActiveId(activeId);
        setOverId(activeId);
        document.body.style.setProperty('cursor', 'grabbing');
    }

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        resetState();

        if (projected && over) {
            const { depth, parentId } = projected;
            const clonedItems: FlattenedMenu[] = JSON.parse(
                JSON.stringify(flattenTree(menusList))
            );
            const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
            const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
            const activeTreeItem = clonedItems[activeIndex];

            clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };

            const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);
            const newItems = buildTree(sortedItems);

            if (newItems) setMenusList(newItems);
        }
    }

    const handleDragOver = (event: DragOverEvent): void => {
        const { over, } = event;
        setOverId(over?.id ?? null);
    }

    return (
        <section className="menus--list">
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
            >
                <SortableContext items={menus} strategy={verticalListSortingStrategy}>
                    {
                        menus.map((menu) => (
                            <SingleMenu menuLevel={0} key={menu.id} menu={menu} />
                        ))
                    }
                </SortableContext>
            </DndContext>
        </section>
    )
}

export default MenusList;