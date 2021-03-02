import Head from 'next/head';
import Link from "next/link";
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Time To Clean</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Recolección de basura
                </h1>
                <div className={styles.grid}>
                    <div className={styles.card}>
                      <h3>
                          <Link href="/neighborhoods">Encuenta tu barrio</Link>
                      </h3>
                      <p>Busca tu barrio y encuentra información sobre el horario de recolección. </p>
                  </div>

                  <div className={styles.card}>
                      <h3>
                          <Link href="/login">Gestión de recolectores</Link>
                      </h3>
                      <p>Si formas parte de la empresa de la EMASEO ingresa para encontrar información.</p>
                  </div>
              </div>
            </main>

          <footer className={styles.footer}>
              <div>
                  <a href="/about" className={styles.textfooter}> Acerca de </a>
                  <a href="/privacity" className={styles.textfooter}> Privacidad </a>
                  <p className={styles.textfooter}>© Time2Clean 2021</p>
              </div>
          </footer>
    </div>
  )
}
