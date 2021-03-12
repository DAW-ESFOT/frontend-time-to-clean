import {useAuth} from '../lib/auth';
import React from "react";
import withoutAuth from "../hocs/withoutAuth";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Paper} from "@material-ui/core";
import {useSnackbar} from "notistack";

const schema = yup.object().shape({
    email: yup.string().email("Ingrese un email válido").required("El campo email es obligatorio"),
    password: yup.string().required("Ingrese su clave").min(6, "La clave debe tener al menos 6 caracteres"),
});
const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.secondary.main,
    },
}));
const styles = {
    Container: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundImage: `url(${"/fondo-login.png"})`,
        padding:'40px'
    },
    paper: {
        padding: '35px',
    },
};

const login = () => {
    const {login} = useAuth();
    const {register, handleSubmit, errors} = useForm({resolver: yupResolver(schema)});
    const classes = useStyles();
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
    const onSubmit = async (data) => {
        try {
            const userData = await login(data);
            handleClick("El usuario ha ingresado con éxito", "success");
            console.log('userdata', userData);

        } catch (error) {
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
    return (
        <>
            <div style={styles.Container}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Paper elevation={3} style={styles.paper}>
                        <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                        <Typography component="h1" variant="h5" align="center">
                            <strong>Inicie Sesión</strong>
                            <div>Solo personal autorizado</div>
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                id="email"
                                name="email"
                                label="Correo electronico"
                                inputRef={register}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                autoComplete="email"
                                color="secondary"
                                autoFocus
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                inputRef={register}
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                color="secondary"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                            <Button onSubmit={handleSubmit(onSubmit)}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                            >
                                Ingresar
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/contrasenia" color="dark">
                                        <strong>¿Olvidaste tu contraseña?</strong>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            </div>
        </>
    );
};
export default withoutAuth(login);