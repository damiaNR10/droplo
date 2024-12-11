import { Menu } from "@/lib/types";
import Image from 'next/image'
import MenuDetails from "./subcomponents/MenuDetails/MenuDetails";
import IconMove from '../../public/img/icon-move.svg';
import './SingleMenu.scss';
import ManageButtons from "./subcomponents/ManageButtons/ManageButtons";
import { useState } from "react";
import AddForm from "../AddForm/AddForm";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"

type Props = {
    menu: Menu,
    menuLevel: number,
}

const SingleMenu = ({ menu, menuLevel }: Props) => {
    const [addMenuFormVisibility, setAddMenuFormVisibility] = useState(false);
    const [editMenuFormVisibility, setEditFormMenuVisibility] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: menu.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <>

            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={`single--menu -level${menuLevel}`}>
                <button className="move">
                    <Image
                        src={IconMove}
                        alt={'Change position'}
                        width={20}
                        height={20}
                    />
                </button>
                <MenuDetails menu={menu} />
                <ManageButtons menu={menu} setAddMenuFormVisibility={setAddMenuFormVisibility} setEditMenuFormVisibility={setEditFormMenuVisibility} />
            </div>
            {
                addMenuFormVisibility &&
                <AddForm menuLevel={menuLevel + 1} parentId={menu.id} setAddMenuFormVisibility={setAddMenuFormVisibility} />
            }
            {
                editMenuFormVisibility &&
                <AddForm menuLevel={menuLevel + 1} menu={menu} setEditFormMenuVisibility={setEditFormMenuVisibility} />
            }


            {
                menu.children && menu.children.length > 0 ?
                    <SortableContext items={menu.children} strategy={verticalListSortingStrategy}>
                        {menu.children.map((submenu) => <SingleMenu menuLevel={menuLevel + 1} key={submenu.id} menu={submenu} />)}
                    </SortableContext>
                    : ''
            }


        </>
    )
}

export default SingleMenu;