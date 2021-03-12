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
import {InputBase, MenuItem, Select, withStyles} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Ingresa un correo válido")
        .required("Ingresa tu correo electrónico"),
});


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
        fontSize: 14,
        width: 400,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },

}))(InputBase);
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
    const {data, error} = useSWR(`/neighborhoods/all`, fetcher);
    const [name, setName] = useState("");

    if (error) return <div>No se pudieron cargar</div>;
    if (!data) return <Loading/>;

    const onSubmit = async (data) => {
        console.log("data", data);
    };
    const handleChange = event => {
        setName(event.target.value);
    }

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
                                    <FormControl className={classes.margin}>
                                        <Select
                                            value={name}
                                            onChange={handleChange}
                                            input={<BootstrapInput name="neighborhood" id="age-customized-select"/>}
                                        >
                                            <MenuItem value="">
                                                Seleccione el Barrio
                                            </MenuItem>
                                            {
                                                data.data.map((neighborhood) => {
                                                        return (
                                                            <MenuItem value={neighborhood} key={neighborhood.id}>
                                                                {neighborhood.name}
                                                            </MenuItem>
                                                        )
                                                    }
                                                )
                                            }
                                        </Select>
                                    </FormControl>
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

