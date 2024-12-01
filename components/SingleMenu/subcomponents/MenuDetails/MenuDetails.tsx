import { Menu } from "@/lib/types";
import './MenuDetails.scss';

type Props = {
    menu: Menu
}

const MenuDetails = ({ menu }: Props) => {
    return (
        <div className="menu--details">
            <p className="name">{menu.name}</p>
            <p className="url">{menu.url}</p>
        </div>
    );
}

export default MenuDetails;