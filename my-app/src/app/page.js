import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <p style={{fontSize: "2vw"}}><strong>Adivina la Bandera!</strong></p>
      </div>

      <div className={styles.grid}>
          <Link href="/juego">
          <div className={styles.card}>
            <h2>
                Jugar!!
            </h2>
          </div>
        </Link>
      </div>
    </main>
  );
}
