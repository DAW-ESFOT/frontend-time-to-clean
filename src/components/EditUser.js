import React, {  useState } from "react";
import useSWR from "swr";
import clsx from "clsx";
import { fetcher } from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {  makeStyles } from "@material-ui/core/styles";
import {useSnackbar} from "notistack";
import {
    FormControl,
    Button,
    Box,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@material-ui/core";
import api from "@/lib/api";
import translateMessage from "../constants/messages";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    paper: {
        height: 140,
        width: 100,
    },
    root2: {
        minWidth: 275,
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
    icon: {
        borderRadius: "50%",
        width: 16,
        height: 16,
        boxShadow:
            "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
        backgroundColor: "#f5f8fa",
        backgroundImage:
            "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
        "$root.Mui-focusVisible &": {
            outline: "2px auto rgba(19,124,189,.6)",
            outlineOffset: 2,
        },
        "input:hover ~ &": {
            backgroundColor: "#ebf1f5",
        },
        "input:disabled ~ &": {
            boxShadow: "none",
            background: "rgba(206,217,224,.5)",
        },
    },
    checkedIcon: {
        backgroundColor: "#137cbd",
        backgroundImage:
            "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
        "&:before": {
            display: "flex",
            width: 16,
            height: 16,
            backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
            content: '""',
        },
        "input:hover ~ &": {
            backgroundColor: "#106ba3",
        },
    },
}));

function StyledRadio(props) {
    const classes = useStyles();
    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

const EditUser = (props) => {
    const classes = useStyles();
    const { register, handleSubmit} = useForm();
    const { data: userData, error: error1 } = useSWR(
        `/users/${props.id}`,
        fetcher
    );
    const { data: truckData, error } = useSWR(
        `/trucks/filter/without-drivers`,
        fetcher
    );
    console.log("camiones sin conductor",truckData)

    if (error1) return <div>No se pudo cargar el usuario</div>;
    if (!userData) return <Loading />;
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
        console.log("data enviar", data);

        const userData1 = {
            name: userData.name + userData.lastname,
            email: userData.email,
            cellphone: userData.cellphone,
            truck: userData.truck === null ? null : userData.truck,
            type: data.type,
        };
        console.log("userData1", userData1);
        try {
            const response = await api.put(`/users/${userData.id}`, userData1);
            handleClick("Se ha actualizado con éxito el usuario", "success");
            console.log("rersponse put usuario", response);
            console.log("correcto put usuario");
            props.onCancel();
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

    console.log("datausuarioEdit", userData);

    return (
        <>
            <div>
                <h3>Nombre: {userData.name} {userData.lastname}</h3>
            </div>
            <div>
                <h3>Correo: {userData.email}</h3>
            </div>
            <div>
                <h3>Celular: {userData.cellphone}</h3>
            </div>
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
                                        control={<StyledRadio />}
                                        label="Principal"
                                        inputRef={register}
                                    />
                                    <FormControlLabel
                                        value="Suplente"
                                        control={<StyledRadio />}
                                        label="Suplente"
                                        inputRef={register}
                                    />
                                </Box>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {userData.truck === null ? ( truckData ? (
                        <ul>
                            {truckData.map((truck)=>{
                                    <li>{truck.license_plate}</li>
                                }
                            )}
                        </ul>
                    ): "No hay camiones disponibles"
                    ) : ( <Grid xs={12} spa cing={2}>
                            <h3>Camion del usuario</h3>
                            <ul>
                                <li>{userData.truck}</li>
                            </ul>
                        </Grid>
                    )}

                    <Box display="flex" justifyContent="center" m={1} p={1}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Editar
                        </Button>
                        <Button
                            onClick={props.onCancel}
                            variant="contained"
                            className={classes.button}
                        >
                            Cancelar
                        </Button>
                    </Box>
            </form>
        </>
    );
};

export default withAuth(EditUser);