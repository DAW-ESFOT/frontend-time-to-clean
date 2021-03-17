import React from "react";
import withAuth from "@/hocs/withAuth";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Box, Grid} from "@material-ui/core";
import api from "@/lib/api";
import {useForm} from "react-hook-form";
import translateMessage from "../constants/messages";
import {useSnackbar} from "notistack";
import Typography from "@material-ui/core/Typography";

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
}));


const DeleteUser = (props) => {
    const classes = useStyles();
    const {handleSubmit} = useForm();
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

    const onSubmit = async () => {
        try {
            const response = await api.delete(`/users/${props.id}`);
            handleClick("Se ha eliminado con éxito el usuario", "success");
            console.log("rersponse delete user", response);
            console.log("correcto delete usuario");
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

    return (
        <>
            <Typography component={'span'}>
                <Box display="flex" justifyContent="center" m={1} p={1}>
                    <h3>¿Está seguro que desea eliminar este usuario?</h3>
                </Box>
            </Typography>

            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
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
                        Sí
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

export default withAuth(DeleteUser);