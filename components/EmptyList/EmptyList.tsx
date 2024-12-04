// import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import './EmptyList.scss';

type Props = {
    setAddMenuFormVisibility: Dispatch<SetStateAction<boolean>>,
}

const EmptyList = ({ setAddMenuFormVisibility }: Props) => {
    return (
        <section className="empty--list">
            <h2 className="header">Menu jest puste</h2>
            <p className="description">W tym menu nie ma jeszcze żadnych linków.</p>
            <button onClick={() => setAddMenuFormVisibility(true)} className="button">Dodaj pozycję menu</button>
        </section>
    )
}

export default EmptyList;