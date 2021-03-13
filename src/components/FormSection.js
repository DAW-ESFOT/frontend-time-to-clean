import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Image from "next/image";
import api from "@/lib/api";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Ingresa un correo válido")
        .required("Ingresa tu correo electrónico"),
});

const useStyles = makeStyles((theme) => ({

    container: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundImage: `url(${"/fondo1.png"})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '35px'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.secondary.main,
    },
}));

const FormSection = () => {

    const {register, handleSubmit, control, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const classes = useStyles();

    const [neighborhood, setNeighborhood] = useState("");
    const [id, setId] = useState("");
    const {data, error} = useSWR(`/neighborhoods/all`, fetcher);
    if (error) return <div>No se pudieron cargar los barrios</div>;
    if (!data) return <Loading/>;

    console.log("data", data)

    const onSubmit = async (data) => {
        const complaintData = {...data, neighborhood_id: id}
        console.log("Data para enviar:", complaintData);
        try {
            const response = await api.post(`/complaints`, complaintData);
            console.log("Response postComplaint:", response);
            return response;
        } catch (error) {
            if (error.response) {
                console.log("error", error.response.data.errors);
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

    const handleChange = (event) => {
        setId(event.target.value);
    };

    return (
        <>

            <div className={classes.container}>
                <Typography component="h1" variant="h4">
                    Buzón de quejas
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Image src="/mailbox.png" alt="" width={300} height={300}/>
                    </Grid>
                    <Grid item xs={9}>
                        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.margin}
                                        autoComplete="name"
                                        name="username"
                                        variant="outlined"
                                        required
                                        inputRef={register}
                                        fullWidth
                                        id="name"
                                        label="Nombre"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.margin}
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
                                <Grid item xs={12}>
                                    <TextField
                                        id="outlined-select-currency-native"
                                        select
                                        label="Barrio"
                                        required
                                        value={neighborhood}
                                        onChange={handleChange}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        helperText="Por favor selecciona un barrio de la lista"
                                        variant="outlined"
                                    >
                                        {
                                            data.data.map((neighborhood) => {
                                                return (
                                                    <option key={neighborhood.id} value={neighborhood.id}>
                                                        {neighborhood.name}
                                                    </option>
                                                );
                                            })
                                        }
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        multiline
                                        rows={5}
                                        required
                                        fullWidth
                                        id="complaint"
                                        inputRef={register}
                                        label="Queja"
                                        name="complaint"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Button onSubmit={handleSubmit(onSubmit)}
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                    >
                                        Enviar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default FormSection;

