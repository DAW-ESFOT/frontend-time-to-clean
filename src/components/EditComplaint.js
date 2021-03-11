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

const EditComplaint = ( props ) => {

    const { data, error } = useSWR(`/complaints/${props.id}`, fetcher);

    if (error) return <div>No se pudo cargar queja</div>;
    if (!data) return <Loading />;

    console.log("Id del barrio", props.id);

    return (
        <>
            <div>Edición</div>
            <Button color="secondary">Agregar</Button>
            <Button onClick={props.onHandleCloseModal } color="secondary">
                Cancelar
            </Button>
        </>
    );
};

export default withAuth(EditComplaint);