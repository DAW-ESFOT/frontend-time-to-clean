import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import { useAuth } from "@/lib/auth";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Button,
    Grid,
    Card,
    CardActions,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    FormControl,
    MenuItem,
    select,
    Select,
    InputBase,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/lib/api";
import translateMessage from "../constants/messages";
import Box from "@material-ui/core/Box";


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
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
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

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Ingrese el nombre del barrio"),
    // days: yup
    //     .string()
    //     .required(),
    // start_time: yup
    //     .string()
    //     .required(),
    // end_time: yup
    //     .string()
    //     .required(),
    link: yup
        .string()
        .required("Ingrese la dirección URL de google Maps del barrio"),
});

const AddNeighborhood = (props) => {
    const classes = useStyles();
    const { register, handleSubmit, control, errors } = useForm({
        resolver: yupResolver(schema),
        }
    );
    const [name, setName] = useState("");

    const [state, setState] = useState({
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: false,
        domingo: false
    });
    const {lunes, martes, miercoles, jueves, viernes, sabado, domingo} = state;
    const error = [lunes, martes, miercoles, jueves, viernes, sabado, domingo].filter((v) => v).length !== 3;

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };


    const onSubmit = async (data) => {
        console.log("data enviar", data);
        const neighborhoodData = { ...data,  user_id: null };
        console.log("truckData", neighborhoodData);
        try {
            const response = await api.post("/neighborhoods", neighborhoodData);
            console.log("rersponse post barrio", response);
            console.log("correcto post barrio");
            return response;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(translateMessage(error.response.data.error));
                console.log(error.response.data);
                return Promise.reject(error.response);
                // return error.response;
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    return (
        <>
            <div>

                <Box display="flex" justifyContent="center" m={1} p={1}>
                    <h1>Creación de un Barrio </h1>
                </Box>

                <form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container>
                        <Grid xs={12} spacing={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Nombre del barrio"
                                variant="outlined"
                                required
                                inputRef={register}
                                color="secondary"
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                            <TextField
                                id="neighborhoodlink"
                                name="link"
                                label="Enlace de google maps"
                                variant="outlined"
                                required
                                inputRef={register}
                                color="secondary"
                                margin="normal"
                                error={!!errors.link}
                                helperText={errors.link?.message}
                            />

                        </Grid>
                        <Grid>
                            <Box display="flex" justifyContent="center" m={1} p={1}>
                                <FormControl
                                    required
                                    component="fieldset"
                                    className={classes.formControl}>
                                    <FormLabel component="legend">Escoga los días ha asignar</FormLabel>
                                    <FormGroup margin="normal">
                                        <Box flexDirection="row-reverse" m={1} p={1}>
                                            <FormControlLabel
                                                control={<Checkbox checked={lunes} onChange={handleChange} name="lunes"/>}
                                                label="Lunes"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={martes} onChange={handleChange} name="martes"/>}
                                                label="Martes"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={miercoles} onChange={handleChange}
                                                                   name="miercoles"/>}
                                                label="Miércoles"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={jueves} onChange={handleChange} name="jueves"/>}
                                                label="Jueves"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={viernes} onChange={handleChange} name="viernes"/>}
                                                label="Viernes"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={sabado} onChange={handleChange} name="sabado"/>}
                                                label="sabado"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox checked={domingo} onChange={handleChange} name="domingo"/>}
                                                label="Domingo"
                                            />
                                        </Box>
                                    </FormGroup>

                                    <FormHelperText>Selecciona tres días</FormHelperText>

                                    <Box display="flex" justifyContent="center" m={1} p={1}>
                                        <TextField
                                            id="start_time"
                                            name="start_time"
                                            label="Hora inicio"
                                            type="time"
                                            defaultValue="07:00"
                                            required
                                            inputRef={register}
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
                                            required
                                            inputRef={register}
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
                                    </Box>
                                </FormControl>
                            </Box>

                        </Grid>
                    </Grid>

                    <Box display="flex" justifyContent="center" m={1} p={1}>
                        <Button
                            onSubmit={handleSubmit(onSubmit)}
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Crear
                        </Button>
                        <Button
                            onClick={props.onHandleCloseModal}
                            variant="contained"
                            className={classes.button}>
                            Cancelar
                        </Button>
                    </Box>
                </form>
            </div>
        </>
    );
};

export default withAuth(AddNeighborhood);