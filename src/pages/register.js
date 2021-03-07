import React from 'react';
import { useForm } from "react-hook-form";
import withAuth from "../hocs/withAuth";
import {useAuth} from "../lib/auth";
import Routes from "../constants/routes";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { Link as MuiLink} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
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
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.primary.main,
    }
}));

const Register = ()=>{
    const [valSelect, setValSelect] = React.useState('');
    const {register: doRegister}=useAuth();
    const { register, handleSubmit, control, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const classes = useStyles();
    const onSubmit=async (data)=>{
        try{
            const userData=await doRegister({...data,type:valSelect,role:'ROLE_DRIVER'});
            console.log('userdata',userData);
        }catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.data.error);
                console.log(error.response.data);
                //d
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
                    <Typography component="h1" variant="h5">
                        Registro Conductores
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    variant="outlined"
                                    required
                                    inputRef={register}
                                    fullWidth
                                    id="firstName"
                                    label="Nombre"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastname"
                                    inputRef={register}
                                    label="Apellido"
                                    name="lastname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    inputRef={register}
                                    label="Correo Electronico"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="birthdate"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    inputRef={register}
                                    id="birthdate"
                                    label="Fecha de Nacimiento"
                                    type="date"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    inputRef={register}
                                    id="cellphone"
                                    label="Celular"
                                    name="cellphone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
                                    <Select
                                        labelId="type"
                                        id="type"
                                        inputRef={register}
                                        value={valSelect}
                                        onChange={handleChange}
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
                                    label="Password"
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
                                    inputRef={register}
                                    autoComplete="current-password"
                                    error={!!errors.password_confirmation}
                                    helperText={errors.password_confirmation?.message}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <Button onSubmit={handleSubmit(onSubmit)}
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
                                type="cancel"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.cancel}
                                href={Routes.USERS}
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