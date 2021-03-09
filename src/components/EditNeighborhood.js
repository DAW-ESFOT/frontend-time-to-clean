import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import {
    Button,
} from "@material-ui/core";


const useStyles = makeStyles({
    table: {
        minWidth: 600,
    },
});

const EditNeighborhood = ( props ) => {

    const { data, error } = useSWR(`/neighborhoods/${props.id}`, fetcher);

    if (error) return <div>No se pudo cargar el barrio</div>;
    if (!data) return <Loading />;

    console.log("Id del barrio", props.id);

    return (
        <>
            <div>Edición de un barrio</div>
            <Button color="secondary">Agregar</Button>
            <Button onClick={props.onHandleCloseModal } color="secondary">
                Cancelar
            </Button>
        </>
    );
};

export default withAuth(EditNeighborhood);