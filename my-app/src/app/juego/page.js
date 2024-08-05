import styles from "../page.module.css";
import Link from 'next/link';
import GeneradorBandera from '../components/GeneradorBandera';

export default function Juego()
{
    return(
    <>
        
        <div>
            <GeneradorBandera/>
        </div>

        <div className={styles.grid}>
            <Link href="/">
                <div>
                    <button className={styles.buttonVolver}>Volver</button>
                </div>
            </Link>
        </div>
    </>
    )
}
