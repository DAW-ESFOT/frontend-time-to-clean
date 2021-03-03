import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";

const Trucks = () => {
  const router = useRouter();
  const { articleId } = router.query;
  const { data, error } = useSWR(`/trucks`, fetcher);

  if (error) return <div>No se pudo cargar los camiones</div>;
  if (!data) return <Loading />;

  console.log("data camioens", data);

  return (
    <>
      <h1>Lista de Camiones</h1>
      <ul>
        {data.data.map((truck) => (
          <li>
            <h2>{truck.license_plate} </h2>
            <h5>{truck.working ? "Disponible" : "NO Disponible"}</h5>
            <h5>{truck.type}</h5>
          </li>
        ))}
      </ul>

      <Link href="/">
        <button>Volver</button>
      </Link>
    </>
  );
};

export default withAuth(Trucks);
