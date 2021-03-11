import React, { useEffect, useState } from "react";
import withAuth from "@/hocs/withAuth";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Button, Box, Grid } from "@material-ui/core";
import api from "@/lib/api";
import { useForm } from "react-hook-form";
import translateMessage from "../constants/messages";

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

const DeleteTruck = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, control, errors } = useForm();

  const onSubmit = async () => {
    try {
      const response = await api.delete(`/trucks/${props.id}`);
      console.log("rersponse delete truck", response);
      console.log("correcto delete camion");
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
      <div>
        <h3>¿Está seguro que desea eliminar este camión?</h3>
      </div>

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container>
          <Box display="flex" justifyContent="center" m={1} p={1}>
            <Button
              //onSubmit={handleSubmit(onSubmit)}
              //onClick={props.onCancel}
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
          </Box>
        </Grid>
      </form>
    </>
  );
};

export default withAuth(DeleteTruck);
