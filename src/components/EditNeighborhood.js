import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";

import {
    Button,
    Checkbox,
    createMuiTheme,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useSnackbar} from "notistack";
import Box from "@material-ui/core/Box";
import {MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Typography from "@material-ui/core/Typography";
import api from "@/lib/api";

const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#236084',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
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

const moment = require("moment");

const schema = yup.object().shape({
    start_time: yup
        .string()
        .required("Seleccione la hora de inicio"),
    end_time: yup
        .string()
        .required("Seleccione la hora de fin")
        .test("is-greater", "Debe ser posterior a la hora de Inicio", function(value) {
            const { start_time } = this.parent;
            return moment(value, "HH:mm").isSameOrAfter(moment(start_time, "HH:mm"));
        }),
    name: yup
        .string()
        .required("Ingrese el nombre del barrio"),
    link: yup
        .string()
        .url("Ingrese una dirección URL válida")
        .required("Ingrese la dirección URL de google Maps del barrio"),
});

const EditNeighborhood = (props) => {
    const classes = useStyles();
    const {data: neighborhoodData, error, mutate} = useSWR(`/neighborhoods/${props.id}`, fetcher);
    const {data: trucksData, error: error1} = useSWR(`/trucks/filter/working`, fetcher);
    const {register, handleSubmit, control, errors} = useForm(
        {
            resolver: yupResolver(schema)
        }
    );
    const [truck, setTruck] = useState("");
    const [selectedStartDate, handleStartDateChange] = useState(new Date());
    const [selectedEndDate, handleEndDateChange] = useState(new Date());
    const [checkValidate, setCheckValidate] = useState(true);
    const [state, setState] = useState({
        Lunes: false,
        Martes: false,
        Miercoles: false,
        Jueves: false,
        Viernes: false,
        Sabado: false,
        Domingo: false
    });

    const {Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo} = state;
    const errorCheck = [Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo].filter((v) => v).length < 1;

    useEffect(() => {
        let check = false;
        for (let $i in state) {
            if (state[$i] === true) {
                check = true;
                break;
            }
        }
        if (check) {
                setCheckValidate(true);
        } else {
            setCheckValidate(false);
        }
    }, [state]);


    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const handleChangeSelect = event => {
        setTruck(event.target.value);
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

    const Error = (errorCode) => {
        if (errorCode) {
            if (errorCode.name[0] === "validation.unique") {
                handleClick("Ya existe un barrio registrado con este nombre", "error");
            }
        } else {
            handleClick(errorCode, "error");
        }
    }

    const onSubmit = async (dataNeighborhood) => {
        let day = "";
        for (let $i in state) {
            if (state[$i] === true) {
                day += $i + " ";
            }
        }
        let user = "";
        if (truck === "") {
            user = neighborhoodData.truck.id;
        } else {
            user = truck;
        }
        dataNeighborhood.start_time += ":00";
        dataNeighborhood.end_time += ":00";
        const neighborhood = {
            ...dataNeighborhood,
            days: day,
            truck_id: user
        };
        console.log("neighborhoodData", neighborhood);
        try {
            const response = await api.put(`/neighborhoods/${neighborhoodData.id}`, neighborhood);
            console.log("rersponse post barrio", response);
            handleClick("Se ha actualizado los datos del barrio con éxito", "success");
            mutate();
            props.onHandleCloseModal();
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

    if (error) return <div>No se pudo cargar la edición del barrio</div>;
    if (!neighborhoodData) return <Loading/>;

    return (
        <>
            <div>
                <h3>Editar información del barrio</h3>
            </div>

            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid container>
                    <Grid xs={12}>
                        <TextField
                            defaultValue={neighborhoodData.name}
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
                            defaultValue={neighborhoodData.link}
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

                    <FormControl
                        required error={errorCheck}
                        component="fieldset"
                        className={classes.formControl}>
                        <FormLabel component="legend">Escoga los días ha asignar</FormLabel>
                        <FormGroup>
                            <Box flexDirection="row-reverse" m={1} p={1}>
                                <FormControlLabel
                                    control={<Checkbox checked={Lunes} onChange={handleChange} name="Lunes"/>}
                                    label="Lunes"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={Martes} onChange={handleChange} name="Martes"/>}
                                    label="Martes"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={Miercoles} onChange={handleChange}
                                                       name="Miercoles"/>}
                                    label="Miércoles"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={Jueves} onChange={handleChange} name="Jueves"/>}
                                    label="Jueves"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={Viernes} onChange={handleChange} name="Viernes"/>}
                                    label="Viernes"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={Sabado} onChange={handleChange} name="Sabado"/>}
                                    label="sabado"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={Domingo} onChange={handleChange} name="Domingo"/>}
                                    label="Domingo"
                                />
                            </Box>
                        </FormGroup>

                        <FormHelperText>Seleccione por lo menos un día</FormHelperText>

                        <Box display="flex" justifyContent="center" m={1} p={1}>
                            <TextField
                                id="start_time"
                                name="start_time"
                                label="Hora de inicio"
                                type="time"
                                defaultValue={neighborhoodData.start_time.toString().substr(0, 5)}
                                required
                                inputRef={register}
                                color="secondary"
                                margin="normal"
                                error={!!errors.start_time}
                                helperText={errors.start_time?.message}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />

                            <TextField
                                id="emd_time"
                                name="end_time"
                                label="Hora de fin"
                                type="time"
                                defaultValue={neighborhoodData.end_time.toString().substr(0, 5)}
                                required
                                inputRef={register}
                                color="secondary"
                                margin="normal"
                                error={!!errors.end_time}
                                helperText={errors.end_time?.message}
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
                </Grid>



                {
                    truck === "" ?
                        <p>Camión asignado: N° - {neighborhoodData.truck !== null ? neighborhoodData.truck.id : "No tiene" };
                            Placa: {neighborhoodData.truck !== null ? neighborhoodData.truck.license_plate : "---"}</p>
                        :
                        <p>Camión ha asignar: N° - {truck} </p>
                }
                <Grid item xs={12}>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Camion"
                        color="secondary"
                        margin="normal"
                        value={truck}
                        onChange={handleChangeSelect}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Cambiar de camión"
                    >
                        <option aria-label="None" value=""/>
                        {
                            trucksData ?
                                trucksData.data.map((truck) => (
                                    <option value={truck.id} key={truck.id}>
                                        {truck.license_plate}
                                    </option>
                                ))
                                :
                                <Typography> No hay camiones disponibles </Typography>
                        }
                    </TextField>
                </Grid>

                <Box display="flex" justifyContent="center" m={1} p={1}>

                    {
                        checkValidate ?
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Actualizar
                            </Button>
                            :
                            <Button
                                variant="contained"
                                color="primary"
                                disabled
                                className={classes.submit}
                            >
                                Actualizar
                            </Button>
                    }

                    <Button
                        onClick={props.onHandleCloseModal}
                        variant="contained"
                        className={classes.button}>
                        Cancelar
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default withAuth(EditNeighborhood);