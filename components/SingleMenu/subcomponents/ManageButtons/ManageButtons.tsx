import { Menu } from '@/lib/types';
import './ManageButtons.scss';
import { useContext } from 'react';
import { AddMenuContext } from '@/app/page';

type Props = {
    menu: Menu,
}

const ManageButtons = ({ menu }: Props) => {
    const { deleteMenu } = useContext(AddMenuContext);

    return (
        <div className="manage--buttons">
            <button className="button -delete" onClick={() => deleteMenu(menu.id)}>Usuń</button>
            <button className="button -edit">Edytuj</button>
            <button className="button -add">Dodaj pozycję menu</button>
        </div>
    )
}

export default ManageButtons;