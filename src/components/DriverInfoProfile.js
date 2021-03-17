import React, {useState} from "react";
import withAuth from "@/hocs/withAuth";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import Box from "@material-ui/core/Box";
import {
    Button,
    Grid, Paper,
    TextField
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import api from "@/lib/api";
import {useSnackbar} from "notistack";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.secondary.main,
    },
    button: {
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.cancel.main,
    },
}));

const styles = {
    Container: {
        padding: '40px',
        background: 'linear-gradient(0deg, rgba(168,254,216,1) 0%, rgba(96,149,176,1) 100%)',
        textAlign: 'center'
    },
    Paper: {
        backgroundColor: 'rgba(255,255,255)',
        margin: '10px',
        padding: '35px',
    },
    title:{
        textAlign:'center',
        color:'white',
        textShadow: '2px 2px #262626',
    }
};

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Ingresa un correo válido")
        .required("Ingresa tu correo electrónico"),
});

const DriverInfoJob = ({user}) => {

    const classes = useStyles();
    const [checkValidate, setCheckValidate] = useState(true);
    const {data: userData, error, mutate} = useSWR(`/users/${user.id}`, fetcher);
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = async (data) => {
        console.log("data enviar", data);
        const userDataSend = {
            name: data.name,
            lastname: data.lastname,
            email: data.email,
            cellphone: data.cellphone,
        };
    console.log("data a procesar", userDataSend);
    console.log("userid", userData.id);
        try {
            const response = await api.put(`/users/${userData.id}`, userDataSend);
            handleClick("Se ha actualizado su información correctamente", "success");
            mutate();
            handleChangeCheck();
            return response;
        } catch (error) {
            if (error.response) {
                Error(error.response.data.errors)
                return Promise.reject(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const handleClick = (message, variant) => {
        enqueueSnackbar(message, {
            variant: variant,
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
        });
    }

    const handleChangeCheck =()=>{
        setCheckValidate(!checkValidate);
        mutate();
    }

    if (error) return <div>Algo ha ocurrido</div>;
    if (!userData) return <Loading/>;
    console.log("user", userData);

    return (
        <>
            <div>
                <h1 style={styles.title}>Información del perfil</h1>

                <Grid container justify="center" >

                    <Grid xs={12} sm={12} md={8} lg={8} >

                            <Paper style={styles.Paper} elevation={3} >
                                <form
                                    className={classes.root}
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Grid container>
                                        <Grid xs={12}>
                                            <TextField
                                                defaultValue={userData.name}
                                                id="name"
                                                name="name"
                                                label="Nombre"
                                                variant="outlined"
                                                required
                                                inputRef={register}
                                                color="secondary"
                                                margin="normal"
                                                error={!!errors.name}
                                                helperText={errors.name?.message}
                                                disabled={checkValidate ? true : false}
                                            />
                                            <TextField
                                                defaultValue={userData.lastname}
                                                id="lastname"
                                                name="lastname"
                                                label="Apellido"
                                                variant="outlined"
                                                required
                                                inputRef={register}
                                                color="secondary"
                                                margin="normal"
                                                error={!!errors.lastname}
                                                helperText={errors.link?.message}
                                                disabled={checkValidate ? true : false}
                                            />
                                            <TextField
                                                defaultValue={userData.birthdate}
                                                id="birthdate"
                                                name="birthdate"
                                                label="Fecha de nacimiento"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                inputRef={register}
                                                margin="normal"
                                                color="secondary"
                                                type="date"
                                                disabled={checkValidate ? true : false}

                                            />
                                            <TextField
                                                defaultValue={userData.cellphone}
                                                id="cellphone"
                                                label="Celular"
                                                name="cellphone"
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                color="secondary"
                                                inputRef={register}
                                                disabled={checkValidate ? true : false}
                                            />
                                            <TextField
                                                defaultValue={userData.email}
                                                id="email"
                                                name="email"
                                                label="Correo electrónico"
                                                variant="outlined"
                                                required
                                                inputRef={register}
                                                color="secondary"
                                                margin="normal"
                                                error={!!errors.email}
                                                helperText={errors.email?.message}
                                                disabled={checkValidate ? true : false}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Box display="flex" justifyContent="center" m={1} p={1}>
                                        {
                                            checkValidate ?
                                                <Button
                                                    onClick={handleChangeCheck}
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}
                                                >
                                                    Cambiar información
                                                </Button>
                                                :
                                                <div>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.submit}
                                                    >
                                                        Actualizar datos
                                                    </Button>
                                                    <Button
                                                        onClick={handleChangeCheck}
                                                        variant="contained"
                                                        className={classes.button}>
                                                        Cancelar
                                                    </Button>
                                                </div>
                                        }
                                    </Box>
                                </form>

                            </Paper>

                    </Grid>

                </Grid>
            </div>
        </>
    );
};

export default withAuth(DriverInfoJob);