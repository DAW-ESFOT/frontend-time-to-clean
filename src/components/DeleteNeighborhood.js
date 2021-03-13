import React  from "react";
import withAuth from "@/hocs/withAuth";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Box, Grid} from "@material-ui/core";
import api from "@/lib/api";
import {useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "&:hover": {
            backgroundColor: "transparent",
        },
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

const DeleteNeighborhood = (props) => {
    const classes = useStyles();
    const {register, handleSubmit, control, errors} = useForm();

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
            if (errorCode.message.includes("SQLSTATE[23000]: Integrity constraint violation:")) {
                handleClick("Se han registrado quejas en este barrio, no se puede eliminar", "warning");
            }
        } else {
            handleClick(errorCode, "error");
        }
    }

    const onSubmit = async () => {
        try {
            const response = await api.delete(`/neighborhoods/${props.id}`);
            handleClick("Se ha eliminado el barrio con éxito", "success");
            props.onHandleCloseModal();
            return response;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                Error(error.response.data);
                props.onHandleCloseModal();
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
            <Typography component={'span'} color={"secondary"}>
                <Box display="flex" justifyContent="center" m={1} p={1}>
                    <h3>¿Está seguro que desea eliminar este barrio?</h3>
                </Box>
            </Typography>

            <form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sí
                    </Button>
                    <Button
                        onClick={props.onHandleCloseModal}
                        variant="contained"
                        className={classes.button}>
                        No
                    </Button>
                </Box>
            </form>
        </>
    );
};

export default withAuth(DeleteNeighborhood);
