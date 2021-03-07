import React, {useState} from "react";
import withAuth from "@/hocs/withAuth";
import Grid from "@material-ui/core/Grid";
import {
    Card,
    CardActions, Checkbox, Divider,
    FormControlLabel,
    FormGroup, FormHelperText,
    FormLabel,
    makeStyles,
    Paper,
    Radio,
    RadioGroup
} from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {useAuth} from "@/lib/auth";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
    root2: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.secondary.main,
    },
}));

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Ingresa un correo válido")
        .required("Ingresa tu correo electrónico"),
    password: yup
        .string()
        .required("Ingresa tu clave")
        .min(6, "La clave debe tener al menos 6 caracteres"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Las claves no coinciden")
        .required("Required"),
});






const RegisterNeighborhood = () =>{
    const classes = useStyles();
    const [state, setState] = useState({
        gilad: true,
        jason: false,
        antoine: false,
    });

    const {register: doRegister}=useAuth();

    const { register, handleSubmit, control, errors } = useForm({
        resolver: yupResolver(schema),
    });




    const onSubmit = ( data ) =>{
        console.log("data enviar", data)
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    const { lunes, martes, miercoles, jueves, viernes, sabado, domingo } = state;
    const error = [lunes, martes, miercoles, jueves, viernes, sabado, domingo].filter((v) => v).length !== 3;



    return(
        <>
            <div>
                <h1>Creación de un Barrio </h1>
            </div>

            <div>

                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>

                    <Grid spacing={2}>
                        <TextField
                            id="neighborhoodName"
                            name="neighborhoodName"
                            label="Nombre del barrio"
                            variant="outlined"
                            color="secondary"
                            margin="normal"
                        />




                        <TextField
                            id="neighborhoodlink"
                            label="Enlace de google maps"
                            variant="outlined"
                            color="secondary"
                            margin="normal"
                        />
                    </Grid>
                    <Grid>
                        <FormControl required error={error} component="fieldset" className={classes.formControl}>
                            <FormLabel component="legend">Escoga los días ha asignar</FormLabel>
                            <FormGroup margin="normal">
                                <FormControlLabel
                                    control={<Checkbox checked={lunes} onChange={handleChange} name="lunes" />}
                                    label="Lunes"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={martes} onChange={handleChange} name="martes" />}
                                    label="Martes"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={miercoles} onChange={handleChange} name="miercoles" />}
                                    label="Miércoles"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={jueves} onChange={handleChange} name="jueves" />}
                                    label="Jueves"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={viernes} onChange={handleChange} name="viernes" />}
                                    label="Viernes"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={sabado} onChange={handleChange} name="sabado" />}
                                    label="sabado"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={domingo} onChange={handleChange} name="domingo" />}
                                    label="Domingo"
                                />
                            </FormGroup>
                            <FormHelperText>Selecciona tres días</FormHelperText>
                            <TextField
                                id="start_time"
                                name="start_time"
                                label="Hora inicio"
                                type="time"
                                defaultValue="07:00"
                                margin="normal"
                                color="secondary"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                            <TextField
                                id="end_time"
                                name="end_time"
                                label="Hora fin"
                                type="time"
                                defaultValue="12:00"
                                margin="normal"
                                color="secondary"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />


                        </FormControl>
                    </Grid>

                    <Button onSubmit={handleSubmit(onSubmit)}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                    >
                        Crear
                    </Button>
                    <Button onClick={onSubmit}
                        variant="contained">
                        Cancelar
                    </Button>

                </form>

            </div>

        </>
    );
};


export default withAuth(RegisterNeighborhood);