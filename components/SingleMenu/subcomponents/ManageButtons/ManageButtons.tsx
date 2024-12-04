import { Menu } from '@/lib/types';
import './ManageButtons.scss';
import { useMenus } from '@/context/MenusContext';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    menu: Menu,
    setAddMenuFormVisibility: Dispatch<SetStateAction<boolean>>,
    setEditMenuFormVisibility: Dispatch<SetStateAction<boolean>>
}

const ManageButtons = ({ menu, setAddMenuFormVisibility, setEditMenuFormVisibility }: Props) => {
    const { deleteMenu } = useMenus();

    return (
        <div className="manage--buttons">
            <button className="button -delete" onClick={() => deleteMenu(menu.id)}>Usuń</button>
            <button className="button -edit" onClick={() => { setEditMenuFormVisibility(prevVisibility => !prevVisibility) }}>Edytuj</button>
            <button className='button -add' onClick={() => { setAddMenuFormVisibility(prevVisibility => !prevVisibility) }}>Dodaj pozycję menu</button>
        </div>
    )
}

export default ManageButtons;