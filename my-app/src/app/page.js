import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <p style={{ fontSize: "2vw" }}><strong>Adivina la Bandera!</strong></p>
      </div>
      <div className={styles.grid}>
        <Link href="/juego">
          <div className={styles.card}>
            <button className={styles.heading}>Jugar!!</button>
          </div>
        </Link>
      </div>
    </main>
  );
}
