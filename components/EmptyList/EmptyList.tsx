import Link from 'next/link';
import './EmptyList.scss';

const EmptyList = () => {
    return (
        <section className="empty--list">
            <h2 className="header">Menu jest puste</h2>
            <p className="description">W tym menu nie ma jeszcze żadnych linków.</p>
            <Link href="/add"><button className="button">Dodaj pozycję menu</button></Link>
        </section>
    )
}

export default EmptyList;