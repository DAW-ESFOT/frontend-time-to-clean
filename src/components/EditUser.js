import React, {useState} from "react";
import useSWR from "swr";
import clsx from "clsx";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {makeStyles} from "@material-ui/core/styles";
import {useSnackbar} from "notistack";
import {
    FormControl,
    Button,
    Box,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField, Icon, Paper,
} from "@material-ui/core";
import api from "@/lib/api";
import translateMessage from "../constants/messages";
import {useForm} from "react-hook-form";
import Typography from "@material-ui/core/Typography";

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

const styles = {
    paper: {
        backgroundColor: 'rgba(112,125,136,0.10)',
        padding: '10px',
        marginBottom: '15px'
    }
};

function StyledRadio(props) {
    const classes = useStyles();
    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}/>}
            icon={<span className={classes.icon}/>}
            {...props}
        />
    );
}

const EditUser = (props) => {
    const classes = useStyles();
    const {register, handleSubmit} = useForm();
    const {data: userData, error: error1, mutate} = useSWR(
        `/users/${props.id}`,
        fetcher
    );
    const {data: truckData, error} = useSWR(
        `/trucks/filter/without-drivers`,
        fetcher
    );
    const {data: truckAllData, error: error2} = useSWR(`/trucks/all`, fetcher);
    //console.log("camiones sin conductor", truckData);
    //console.log("camiones todos", truckAllData);
    //console.log("datos del conductorr", userData);
    const [truck, setTruck] = useState("");
    if (error1) return <div>No se pudo cargar el usuario</div>;
    if (!userData) return <Loading/>;
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const handleClick = (message, variant) => {
        enqueueSnackbar(message, {
            variant: variant,
            anchorOrigin: {
                vertical: "top",
                horizontal: "center",
            },
        });
    };
    const handleChangeSelect = (event) => {
        setTruck(event.target.value);
    };
    const onSubmit = async (data) => {
        console.log("data enviar", data);
        let truck_user = "";
        if (truck === "") {
            truck_user = userData.truck;
        } else {
            truck_user = truck;

            truckAllData
                ? userData.truck !== null
                ? truckAllData.data.map((truck) =>
                    userData.truck === truck.license_plate
                        ? handleDeleteUserToTruck(truck)
                        : ""
                )
                : ""
                : "";
            truckData
                ? truckData.map((truck) =>
                    truck_user == truck.id ? handleChangeUserToTruck(truck) : ""
                )
                : "";
        }
        const userData1 = {
            name: userData.name,
            lastname: userData.lastname,
            email: userData.email,
            cellphone: userData.cellphone,
            type: data.type,
        };
        //console.log("truck_user", truck_user);
        //console.log("userDatapost", userData1);
        try {
            const response = await api.put(`/users/${userData.id}`, userData1);
            handleClick("Se ha actualizado con éxito el usuario", "success");
            console.log("rersponse put usuario", response);
            console.log("correcto put usuario");
            props.onCancel();
            mutate();
            return response;
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                return Promise.reject(error.response);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    const handleChangeUserToTruck = async (data) => {
        //console.log("data del camión a edittar userid", data);
        // console.log("id del usuario a poner en el truck", props.id);
        const truckData1 = {
            license_plate: data.license_plate,
            type: data.type,
            working: data.working,
            user_id: props.id,
        };
        //console.log("truckData1 a cambiar", truckData1);
        try {
            const response = await api.put(`/trucks/${data.id}`, truckData1);
            //console.log("rersponse put camion", response);
            //console.log("correcto put camion");
            props.onCancel();
            return response;
        } catch (error) {
            if (error.response) {
                alert(translateMessage(error.response.data.error));
                console.log(error.response.data);
                return Promise.reject(error.response);
                // return error.response;
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    const handleDeleteUserToTruck = async (data) => {
        console.log("data del camión a eliminar userid", data);
        // console.log("id del usuario a poner en el truck", props.id);
        const truckData1 = {
            license_plate: data.license_plate,
            type: data.type,
            working: data.working,
            user_id: null,
        };
        console.log("truckData1 a eliminar", truckData1);
        try {
            const response = await api.put(`/trucks/${data.id}`, truckData1);
            //console.log("rersponse put camion", response);
            //console.log("correcto put camion");
            props.onCancel();
            return response;
        } catch (error) {
            if (error.response) {
                alert(translateMessage(error.response.data.error));
                console.log(error.response.data);
                return Promise.reject(error.response);
                // return error.response;
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        }
    };

    //console.log("datausuarioEdit", userData);

    return (
        <>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <div/>
                <h2>Detalle y edición del conductor</h2>
                <Icon color="secondary" onClick={props.onCancel}>cancel</Icon>
            </Grid>
            <Paper elevation={0} style={styles.paper}>
                <div>
                    <h3>
                        Nombre: {userData.name} {userData.lastname}
                    </h3>
                </div>
                <div>
                    <h3>Correo: {userData.email}</h3>
                </div>
                <div>
                    <h3>Celular: {userData.cellphone}</h3>
                </div>
            </Paper>
            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid xs={12} spacing={2}>
                    <h3>Tipo de usuario</h3>
                    <FormControl component="fieldset">
                        <RadioGroup
                            defaultValue={
                                userData.type === "Principal" ? "Principal" : "Suplente"
                            }
                            aria-label="gender"
                            name="type"
                        >
                            <Box display="flex" justifyContent="center" m={1} p={1}>
                                <FormControlLabel
                                    value="Principal"
                                    control={<StyledRadio/>}
                                    label="Principal"
                                    inputRef={register}
                                />
                                <FormControlLabel
                                    value="Suplente"
                                    control={<StyledRadio/>}
                                    label="Suplente"
                                    inputRef={register}
                                />
                            </Box>
                        </RadioGroup>
                    </FormControl>
                </Grid>
                {truck === "" ? (
                    <p>
                        Camión asignado:
                        {userData.truck !== null ? userData.truck : "No tiene asignado"}
                    </p>
                ) : (
                    <p>Camión ha asignar:{truck} </p>
                )}
                <Grid item xs={12}>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Camion"
                        value={truck}
                        onChange={handleChangeSelect}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Cambiar de camión"
                    >
                        <option aria-label="None" value=""/>
                        {truckData ? (
                            truckData.map((truck) => (
                                <option value={truck.id} key={truck.id}>
                                    {truck.license_plate}
                                </option>
                            ))
                        ) : (
                            <Typography> No hay camiones disponibles </Typography>
                        )}
                    </TextField>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="flex-end"
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Guardar cambios
                    </Button>
                    <Button
                        onClick={props.onCancel}
                        variant="contained"
                        className={classes.button}
                    >
                        Cancelar
                    </Button>
                </Grid>
            </form>
        </>
    );
};

export default withAuth(EditUser);
