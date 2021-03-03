import React from "react";
import Link from "next/link";
import Routes from "../../constants/routes";


const NeighborhoodDetails = ({neighborhood}) =>{
    if (!neighborhood){
        return "No se puedo mostrar el comentario";
    }
    return (
        <>
            <div >
                <div >
                    <h1 > {neighborhood.name}</h1>
                    <p>Hora de inicio: {neighborhood.start_time}</p>
                    <p>Hora de fin: {neighborhood.end_time}</p>
                    <p>{neighborhood.link}</p>
                </div>
                <Link href={Routes.NEIGHBORHOODS} >
                    <button>Regresar a la lista de barrios</button>
                </Link>
            </div>

        </>
    );
}
export default NeighborhoodDetails;

export async function getStaticProps(context) {

    console.log('context',context)
    const{neighborhoodId} = context.params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/neighborhoods/${neighborhoodId}`)
    const data = await res.json()

    console.log("data",data)
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            neighborhood:data
        }, // will be passed to the page component as props
    }
}


export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/neighborhoods`);
  const data = await res.json();

  const neighborhoods = data.data;

  const paths = neighborhoods.map((neighborhood) => {
    return { params: { neighborhoodId: "" + neighborhood.id } };
  });

  return {
    paths,
    fallback: true, // See the "fallback" section below
  }
};

