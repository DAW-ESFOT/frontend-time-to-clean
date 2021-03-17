import React from 'react';
import { useForm } from "react-hook-form";
import withAuth from "../hocs/withAuth";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import translateMessage from '../constants/messages';
import InputLabel from '@material-ui/core/InputLabel';
import api from "@/lib/api";
import {useSnackbar} from "notistack";
const schema = yup.object().shape({
    name: yup
        .string()
        .required("Ingresa el nombre del conductor"),
    lastname: yup
        .string()
        .required("Ingresa el apellido del conductor"),
    email: yup
        .string()
        .email("Ingresa un correo válido")
        .required("Ingresa el correo electrónico del conductor"),
    password: yup
        .string()
        .required("Ingresa la clave")
        .min(6, "La clave debe tener al menos 6 caracteres"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Las claves no coinciden")
        .required("Campo requerido"),
    birthdate: yup
        .date()
        .min ("1973-01-01","Ingresar una fecha válida")
        .max ("2002-01-01", "Ingresar una fecha válida")
        .required("Campo requerido"),
    cellphone: yup
        .number()
        .min(9,"El telefono debe tener 10 digitos")


});
const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.secondary.main,
    },
    cancel:{
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.cancel.main,
    }
}));

const Register = (props)=>{
    const [valSelect, setValSelect] = React.useState('');
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleClick = (message, variant) => {
        enqueueSnackbar(message, {
            variant: variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });
    }

    const classes = useStyles();
    const onSubmit=async (data)=>{
        console.log("data enviar", data);
        const userData = {...data,type:valSelect,role:'ROLE_DRIVER'};
        console.log("userData", userData);
        try {
            const response = await api.post("/register", userData);

            handleClick("Se ha registrado con éxito el usuario", "success");
            console.log("rersponse post users", response);
            console.log("correcto post usuarios");
            props.onCancel();
            return response;
        }catch (error) {
            if (error.response) {
                console.log("errores",error.response);
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                enqueueSnackbar(translateMessage(error.response.data), { variant: "error",  anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },});
                console.log(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    };
    const handleChange = (event) => {
        setValSelect(event.target.value);
        console.log("tipo",event);
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    variant="outlined"
                                    required
                                    color="secondary"
                                    inputRef={register}
                                    fullWidth
                                    id="firstName"
                                    label="Nombre"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastname"
                                    color="secondary"
                                    inputRef={register}
                                    label="Apellido"
                                    name="lastname"
                                    error={!!errors.lastname}
                                    helperText={errors.lastname?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    color="secondary"
                                    inputRef={register}
                                    label="Correo Electronico"
                                    name="email"
                                    autoComplete="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="birthdate"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    color="secondary"
                                    type="date"
                                    inputProps={{
                                        min: "1973-01-01",
                                        max: "2002-01-01"
                                    }}
                                    inputRef={register}
                                    error={!!errors.birthdate}
                                    helperText={errors.birthdate?.message}
                                    id="birthdate"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    color="secondary"
                                    inputRef={register}
                                    id="cellphone"
                                    label="Celular"
                                    name="cellphone"
                                    error={!!errors.cellphone}
                                    helperText={errors.cellphone?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
                                    <Select
                                        labelId="type"
                                        id="type"
                                        name="type"
                                        inputRef={register}
                                        value={valSelect}
                                        onChange={handleChange}
                                        SelectProps={{
                                            native: true,
                                        }}
                                    >
                                        <MenuItem value={'Principal'}>Principal</MenuItem>
                                        <MenuItem value={'Suplente'}>Suplente</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    inputRef={register}
                                    label="Contraseña"
                                    color="secondary"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={!!errors.password_confirmation}
                                    helperText={errors.password_confirmation?.message}
                                />
                            </Grid>
                            <Grid xs={12} item>
                                <TextField
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    label="Confirmar clave"
                                    color="secondary"
                                    inputRef={register}
                                    autoComplete="current-password"
                                    error={!!errors.password_confirmation}
                                    helperText={errors.password_confirmation?.message}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Registrar
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    onClick={props.onCancel}
                                    variant="contained"
                                    className={classes.cancel}
                                >
                                    Cancelar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
};
export default withAuth(Register);