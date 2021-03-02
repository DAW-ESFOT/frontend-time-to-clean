import React from "react";
import Head from 'next/head';
import {useForm} from "react-hook-form";
import Link from "next/link";
import styles from '@/styles/Home.module.css';

export default function Home() {

    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        console.log("data", data);
    };


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

            {/*//Añadir el formulario*/}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="username">Name</label>
                    <input type="text" name="username" id="username" ref={register}/>
                    </div>
                    <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" ref={register}/>
                    </div>
                    <div>
                    <label htmlFor="neighborhood_id">Barrio(id)</label>
                    <input name="neighborhood_id" id="neighborhood_id" ref={register}/>
                    </div>
                    <div>
                    <label htmlFor="complaint">¿Cómo podemos ayudarte?</label>
                    <textarea name="complaint" id="complaint" ref={register}/>
                    </div>
                    <div>
                    <input type="submit"/>
                    </div>
                </form>


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
