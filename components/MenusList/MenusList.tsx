import { Menu } from "@/lib/types";
import SingleMenu from "../SingleMenu/SingleMenu";
import './MenusList.scss';
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useMenus } from "@/context/MenusContext";

type Props = {
    menus: Menu[],
}

const MenusList = ({ menus }: Props) => {

    const { getMenuPosition, changeMenusOrder } = useMenus();

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            changeMenusOrder(getMenuPosition(active.id.toString()), getMenuPosition(over ? over.id.toString() : ''));
        }
    }

    return (
        <section className="menus--list">
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
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