import { Menu } from "@/lib/types";
import Image from 'next/image'
import MenuDetails from "./subcomponents/MenuDetails/MenuDetails";
import IconMove from '../../../public/img/icon-move.svg';
import './SingleMenu.scss';
import ManageButtons from "./subcomponents/ManageButtons/ManageButtons";

type Props = {
    menu: Menu
}

const SingleMenu = ({ menu }: Props) => {
    return (
        <div className="single--menu">
            <button className="move">
                <Image
                    src={IconMove}
                    alt={'Change position'}
                    width={20}
                    height={20}
                />
            </button>
            <MenuDetails menu={menu} />
            <ManageButtons />
            {
                menu.children && menu.children.length > 0 ?
                    menu.children.map((submenu, index) => <SingleMenu key={index} menu={submenu} />)
                    : ''
            }
        </div>
    )
}

export default SingleMenu;