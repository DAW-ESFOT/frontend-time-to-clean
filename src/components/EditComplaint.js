import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {withStyles, makeStyles} from "@material-ui/core/styles";

import {
    Button, Icon, InputBase, MenuItem, Select, TextField,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
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

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: '0.875rem',
        width: 200,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        fontFamily: [
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },

}))(InputBase);

const EditComplaint = (props) => {

    const classes = useStyles();
    const {data, error} = useSWR(`/complaints/${props.id}`, fetcher);
    console.log("Data:", data)
    // console.log("ID Queja:", data.id)
    const [name, setName] = useState("");

    if (error) return <div>No se pudo cargar queja</div>;
    if (!data) return <Loading/>;

    const handleChangeSelect = event => {
        setName(event.target.value);
    };

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
                <FormControl className={classes.margin}>
                    <p>Estado de la queja:</p>
                    <Select
                        value={name}
                        onChange={handleChangeSelect}
                        input={<BootstrapInput name="state" id="age-customized-select"/>}
                    >
                        <MenuItem value="">
                            <strong>Selecciona un estado</strong>
                        </MenuItem>
                        <MenuItem value="Pendiente">
                            Pendiente
                        </MenuItem>
                        <MenuItem value="En proceso">
                            En proceso
                        </MenuItem>
                        <MenuItem value="Atendida">
                            Atendida
                        </MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.margin}>
                    <p>Observación:</p>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={8}
                        defaultValue={data.observation}
                        variant="outlined"
                        input={<BootstrapInput name="state" id="age-customized-select"/>}
                    />
                </FormControl>
            </form>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
            >
                <div/>
                <Button color="secondary" onClick={props.onHandleCloseModal}>Guardar Cambios</Button>
            </Grid>
        </>
    );
};

export default withAuth(EditComplaint);