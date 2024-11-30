import './ManageButtons.scss';

const ManageButtons = () => {
    return (
        <div className="manage--buttons">
            <button className="button -delete">Usuń</button>
            <button className="button -edit">Edytuj</button>
            <button className="button -add">Dodaj pozycję menu</button>
        </div>
    )
}

export default ManageButtons;