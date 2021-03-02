import Link from "next/link";
import styles from '../../styles/Home.module.css';

const Articles = ({ neighborhoods }) => {
    return (
        <>
            <div >
                <h1>Lista de Barrios</h1>

                <ul>
                    {neighborhoods.map((neighborhood) => (
                        <li>
                            <Link href={`/neighborhoods/${neighborhood.id}`}>{neighborhood.name}</Link>
                        </li>
                    ))}
                </ul>

                <Link href="/" >
                    <button>Volver</button>
                </Link>
            </div>
        </>
    );
};

export default Articles;

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/neighborhoods`);
    const data = await res.json();

    const neighborhoods = data.data;

    return {
        props: {
            neighborhoods,
        },
    };
}
