import { Menu } from "@/lib/types";
import Image from 'next/image'
import MenuDetails from "./subcomponents/MenuDetails/MenuDetails";
import IconMove from '../../public/img/icon-move.svg';
import './SingleMenu.scss';
import ManageButtons from "./subcomponents/ManageButtons/ManageButtons";

type Props = {
    menu: Menu,
    menuLevel: number,
}

const SingleMenu = ({ menu, menuLevel }: Props) => {

    return (
        <>
            <div className={`single--menu -level${menuLevel}`}>
                <button className="move">
                    <Image
                        src={IconMove}
                        alt={'Change position'}
                        width={20}
                        height={20}
                    />
                </button>
                <MenuDetails menu={menu} />
                <ManageButtons menu={menu} />
            </div>
            {
                menu.children && menu.children.length > 0 ?
                    menu.children.map((submenu) => <SingleMenu menuLevel={menuLevel + 1} key={submenu.id} menu={submenu} />)
                    : ''
            }
        </>
    )
}

export default SingleMenu;