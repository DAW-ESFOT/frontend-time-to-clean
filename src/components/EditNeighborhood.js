import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {makeStyles, MuiThemeProvider, ThemeProvider} from "@material-ui/core/styles";

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
    Grid, InputBase, MenuItem, Select,
    TextField, withStyles,
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
        border: '1px solid #236084',
        fontSize: 16,
        width: 200,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        fontFamily: [
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#236084',
            boxShadow: '0 0 0 0.2rem rgba(35,96,132,.25)',
        },
    },

}))(InputBase);

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


const schema = yup.object().shape({
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
            if (selectedEndDate.getTime() > selectedStartDate.getTime()) {
                setCheckValidate(true);
            } else {
                setCheckValidate(false);
            }
        } else {
            setCheckValidate(false);
        }
    }, [state, selectedStartDate, selectedEndDate]);


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
        console.log("enviar", truck);
        const neighborhood = {
            ...dataNeighborhood,
            start_time: selectedStartDate.toString().substr(16, 8),
            end_time: selectedEndDate.toString().substr(16, 8),
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
            <Typography component={'span'} color={"secondary"}>
                <Box display="flex" justifyContent="center" m={1} p={1}>
                    <h1>
                        Edición del barrio {neighborhoodData.name}
                    </h1>
                </Box>
            </Typography>

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
                            <MuiPickersUtilsProvider utils={DateFnsUtils} theme={defaultMaterialTheme}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <TimePicker
                                        ampm={false}
                                        openTo="hours"
                                        views={["hours", "minutes", "seconds"]}
                                        format="HH:mm:ss"
                                        label="Hora inicio"
                                        value={selectedStartDate}
                                        initialFocusedDate={new Date(Date.parse("01/01/01 " + neighborhoodData.start_time))}
                                        onChange={handleStartDateChange}
                                    />
                                    <TimePicker
                                        ampm={false}
                                        openTo="hours"
                                        views={["hours", "minutes", "seconds"]}
                                        format="HH:mm:ss"
                                        label="Hora fin"
                                        value={selectedEndDate}
                                        onChange={handleEndDateChange}
                                    />
                                </ThemeProvider>
                            </MuiPickersUtilsProvider>
                        </Box>
                    </FormControl>
                </Grid>

                {
                    !checkValidate ?
                        <div>
                            <Typography component={'span'} color={"secondary"}>
                                <Box fontWeight="fontWeightLight" m={1} textAlign="center">
                                    La hora de fin debe ser posterior la hora de inicio
                                </Box>
                            </Typography>
                        </div>
                        :
                        <div>
                            <Divider/>
                        </div>
                }


                <FormControl className={classes.margin}>
                    {
                        truck === "" ?
                            <p>Camión asignado: N° - {neighborhoodData.truck.id};
                                Placa: {neighborhoodData.truck.license_plate}</p>
                            :
                            <p>Camión ha asignar: N° - {truck} </p>
                    }
                    <Select
                        value={truck}
                        onChange={handleChangeSelect}
                        input={<BootstrapInput name="neighborhood" id="age-customized-select"/>}
                    >
                        <MenuItem value={""}>
                            Cambiar de camión
                        </MenuItem>
                        {
                            trucksData ?
                                trucksData.data.map((truck) => (
                                    <MenuItem value={truck.id} key={truck.id}>
                                        {truck.license_plate}
                                    </MenuItem>
                                ))
                                :
                                <div> No hay camiones disponibles </div>
                        }
                    </Select>
                </FormControl>


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