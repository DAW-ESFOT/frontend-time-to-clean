import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {makeStyles} from "@material-ui/core/styles";
import { Button, Icon, InputBase, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.cancel.main,
    },
    button2: {
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.secondary.main,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
    root2: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

const EditComplaint = (props) => {

    const classes = useStyles();
    const {data, error} = useSWR(`/complaints/${props.id}`, fetcher);
    console.log("Data:", data)
    // console.log("ID Queja:", data.id)
    const [state, setState] = useState("");

    if (error) return <div>No se pudo cargar queja</div>;
    if (!data) return <Loading/>;

    const handleChange = (event) => {
        setState(event.target.value);
    };
    const onSubmit = async (data) => {
        console.log("data",data)
    }

    console.log("Id del barrio", props.id);

    return (
        <>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
            >
                <h2>Edición - Queja #{data.id}</h2>
                <Icon color="secondary" onClick={props.onHandleCloseModal}>cancel</Icon>
            </Grid>
            <form className={classes.root} autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <p>Estado de la queja:</p>
                        <TextField
                            id="outlined-select-currency-native"
                            select
                            label="Estado"
                            required
                            value={state}
                            onChange={handleChange}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                        >
                            <option key="opt1" value="Pendiente">
                                Pendiente
                            </option>
                            <option key="opt2" value="En proceso">
                                En proceso
                            </option>
                            <option key="opt3" value="Atendida">
                                Atendida
                            </option>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <p>Observación:</p>
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={8}
                            defaultValue={data.observation}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                        >
                            Guardar Cambios
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default withAuth(EditComplaint);