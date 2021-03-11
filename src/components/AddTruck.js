import React, { useState } from "react";
import withAuth from "@/hocs/withAuth";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputBase,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/lib/api";
import translateMessage from "../constants/messages";
import { Alert, AlertTitle } from "@material-ui/lab";
import Box from "@material-ui/core/Box";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: 200,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

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

const schema = yup.object().shape({});

const AddTruck = (props) => {
  const classes = useStyles();
  const { register, handleSubmit, control, errors } = useForm();
  const [name, setName] = useState("");

  const onSubmit = async (data) => {
    console.log("data enviar", data);
    const truckData = { ...data, working: true, user_id: null, type: name };
    console.log("truckData", truckData);
    try {
      const response = await api.post("/trucks", truckData);
      console.log("rersponse post truck", response);
      console.log("correcto post camion");
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

  const handleChange = (event) => {
    setName(event.target.value);
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
                label="Placa del Camión (???-####)"
                variant="outlined"
                color="secondary"
                margin="normal"
                inputRef={register}
              />
              <div>Escoja el tipo de camión</div>
              <FormControl className={classes.margin}>
                <Select
                  value={name}
                  onChange={handleChange}
                  input={
                    <BootstrapInput
                      name="neighborhood"
                      id="age-customized-select"
                    />
                  }
                >
                  <MenuItem value="">Seleccione el Barrio</MenuItem>
                  <MenuItem value="Manual" key={1}>
                    Manual
                  </MenuItem>
                  <MenuItem value="Automático" key={2}>
                    Automático
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <Button
                //onSubmit={handleSubmit(onSubmit)}
                //onClick={props.onCancel}
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Crear
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
      </div>
    </>
  );
};

export default withAuth(AddTruck);
