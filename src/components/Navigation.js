import React from "react";
import Link from "next/link";
import { useAuth } from "../lib/auth";
import styles from "@/styles/Home.module.css";
const Navigation = () => {
  const { user, logout, login } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleLogin = async (data) => {
    try {
      const userData = await login({
        email: "admin@prueba.com",
        password: "123123",
      });
      console.log("userdata", userData);
      localStorage.setItem("Token", userData.data.token);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers); //d
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };
  return (
    <div>
      <div className={styles.menu}>

        <h2>
          <Link href="/">Time to Clean</Link>
        </h2>

        <p>
          <Link href="/users">Usuarios -- </Link>
          <Link href="/neighborhoods">Consultar horarios -- </Link>
          <Link href="/login">Gestión de Camiones -- </Link>

          <Link href="/about">Acerca de -- </Link>
          <Link href="/privacity">Privacidad </Link>
        </p>

      </div>
      <div >
        <ul>
          <li>
            <Link href="/login">Iniciar</Link>
          </li>
          <li>
            {user === null ? (
                "..."
            ) : user === false ? (
                <button onClick={handleLogin}>Login</button>
            ) : (
                <>
                  Hola {user.name}
                  <button onClick={handleLogout}>Logout</button>
                </>
            )}
          </li>
        </ul>

      </div>

    </div>
  );
};
export default Navigation;
