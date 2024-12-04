import { Dispatch, SetStateAction } from 'react';
import './AddButton.scss';

type Props = {
    setAddMenuFormVisibility: Dispatch<SetStateAction<boolean>>
}

const AddButton = ({ setAddMenuFormVisibility }: Props) => {

    return (
        <div className="add--button">
            <button className="button -rounded" onClick={() => setAddMenuFormVisibility(true)}>Dodaj pozycję menu</button>
        </div>
    )
}

export default AddButton;