import './AddButton.scss';
import Link from 'next/link'

const AddButton = () => {

    return (
        <div className="add--button">
            <Link href={'/add'}><button className="button -rounded">Dodaj pozycję menu</button></Link>
        </div>
    )
}

export default AddButton;