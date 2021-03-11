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
// import { Alert, AlertTitle } from "@material-ui/lab";

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
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const schema = yup.object().shape({});

const AddTruck = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, control, errors } = useForm();
  const [name, setName] = useState("");

  const onSubmit = async (data) => {
    console.log("data enviar", data);
    const truckData = { ...data, working: true, user_id: null };
    console.log("truckData", truckData);
    try {
      const response = await api.post("/trucks", truckData);
      console.log("rersponse post truck", response);
      console.log("correcto post camion");
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
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container>
            <Grid xs={12} spacing={2}>
              <TextField
                id="license_plate"
                name="license_plate"
                label="Placa del Camión"
                variant="outlined"
                color="secondary"
                margin="normal"
                inputRef={register}
              />

              <select id="type" name="type" ref={register}>
                <option value="Automático">Automático</option>
                <option value="Manual">Manual</option>
              </select>
            </Grid>
            <Grid xs={6} spacing={2}>
              <Button
                onSubmit={handleSubmit(onSubmit)}
                onClick={props.onCancel}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Crear
              </Button>
            </Grid>
            <Grid xs={6} spacing={2}>
              <Button onClick={props.onCancel} variant="contained">
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default withAuth(AddTruck);
