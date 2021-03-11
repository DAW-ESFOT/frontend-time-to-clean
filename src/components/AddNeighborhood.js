import React, {useEffect, useState} from "react";
import withAuth from "@/hocs/withAuth";
import {withStyles, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {
    Button,
    Grid,
    Checkbox,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    TextField,
    FormControl,
    createMuiTheme, Divider,
} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/lib/api";
import translateMessage from "../constants/messages";
import Box from "@material-ui/core/Box";
import {
    MuiPickersUtilsProvider, TimePicker, DateTimePicker,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Typography from "@material-ui/core/Typography";
import {useSnackbar} from "notistack";

const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#19857b',
        },
    },
});


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
    link: yup
        .string()
        .url("Ingrese una dirección URL válida")
        .required("Ingrese la dirección URL de google Maps del barrio"),
});

const AddNeighborhood = (props) => {
    const classes = useStyles();
    const {register, handleSubmit, control, errors} = useForm({
            resolver: yupResolver(schema),
        }
    );

    const [checkValidate, setCheckValidate] = useState(true);
    const [selectedStartDate, handleStartDateChange] = useState(new Date());
    const [selectedEndDate, handleEndDateChange] = useState(new Date());
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
    const error = [Lunes, Martes, Miercoles, Jueves, Viernes, Sabado, Domingo].filter((v) => v).length < 1;

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

    const Error = (errorCode) => {
        console.log("code", errorCode.name);
        if(errorCode.name[0] === "validation.unique"){
            handleClick("Ya existe un barrio registrado con este nombre", "error");
        }else{
            handleClick(errorCode, "error");
        }
    }

    const onSubmit = async (data) => {
        let day = "";
        for (let $i in state) {
            if (state[$i] === true) {
                day += $i + " ";
            }
        }
        const neighborhoodData = {
            ...data,
            start_time: selectedStartDate.toString().substr(16, 8),
            end_time: selectedEndDate.toString().substr(16, 8),
            days: day,
            user_id: null
        };
        console.log("truckData", neighborhoodData);
        try {
            const response = await api.post("/neighborhoods", neighborhoodData);
            console.log("rersponse post barrio", response);
            handleClick("Se ha registrado con éxito el barrio", "success");
            props.onHandleCloseModal();
            return response;
        } catch (error) {
            if (error.response) {
                alert(translateMessage(error.response.data.errors));
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


                        <FormControl
                            required error={error}
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
                                            onChange={handleStartDateChange}
                                        />
                                        <TimePicker
                                            ampm={false}
                                            openTo="hours"
                                            views={["hours", "minutes", "seconds"]}
                                            format="HH:mm:ss"
                                            label="Hora fin"
                                            input
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
                                <Typography component="div" >
                                    <Box fontWeight="fontWeightLight" m={1} textAlign="center">
                                        La hora de fin debe ser posterior la hora de inicio
                                    </Box>

                                </Typography>
                            </div>
                            :
                            <div>
                                <Divider />
                            </div>
                    }

                    <Box display="flex" justifyContent="center" m={1} p={1}>

                        {
                            checkValidate ?
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Crear
                                </Button>
                                :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled
                                    className={classes.submit}
                                >
                                    Crear
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
            </div>
        </>
    );
};

export default withAuth(AddNeighborhood);