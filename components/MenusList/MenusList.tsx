import { Menu } from "@/lib/types";
import SingleMenu from "../SingleMenu/SingleMenu";
import './MenusList.scss';

type Props = {
    menus: Menu[],
}

const MenusList = ({ menus }: Props) => {

    return (
        <section className="menus--list">
            {
                menus.map((menu) => (
                    <SingleMenu menuLevel={0} key={menu.id} menu={menu} />
                ))
            }
        </section>
    )
}

export default MenusList;