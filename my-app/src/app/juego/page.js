import styles from "../page.module.css";
import Link from 'next/link';
import GeneradorBandera from '../components/GeneradorBandera';

export default function Juego()
{
    return(
    <>
        
        <div>
            <h1>Adivina la Bandera</h1>
            <GeneradorBandera/>
        </div>

        <div className={styles.grid}>
            <Link href="/">
                <div className={styles.card}>
                    <h2> Volver </h2>
                </div>
            </Link>
        </div>
    </>
    )
}
