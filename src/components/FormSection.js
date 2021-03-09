import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import process from "process";
import Image from "next/image";

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

const FormSection = ({neighborhoods}) => {

    console.log("BARRIOS: ", neighborhoods);

    const {register, handleSubmit, control, errors} = useForm({
        resolver: yupResolver(schema),
    });
    const classes = useStyles();

    const onSubmit = async (data) => {
        console.log("data", data);
    };

    const [neighborhood, setNeighborhood] = useState("");
    const [id, setId] = useState("");

    const handleChange = (event) => {
        console.log("Barrio selec.", event.target.value)
        setId(event.target.id);
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
                                        // value={neighborhood}
                                        onChange={handleChange}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        helperText="Por favor selecciona un barrio de la lista"
                                        variant="outlined"
                                    >
                                        {/*{neighborhoods.map((value) => (*/}
                                        {/*    <option key={value.id} value={value.id}>*/}
                                        {/*        {value.name}*/}
                                        {/*    </option>*/}
                                        {/*))}*/}
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

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/neighborhoods`);
    const data = await res.json();
    const neighborhoods = data.data;
    return {
        props: {
            neighborhoods,
        },
    };
}

export default FormSection;

