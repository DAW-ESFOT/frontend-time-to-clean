import React, { useEffect, useState } from "react";
import useSWR from "swr";
import clsx from "clsx";
import { fetcher } from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputBase,
  MenuItem,
  Select,
  Button,
  Box,
  Grid,
  RadioGroup,
  FormControlLabel,
  FormLabel,
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

const EditTruck = (props) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const { register, handleSubmit, control, errors } = useForm();
  const { data: truckData, error: error1 } = useSWR(
    `/trucks/${props.id}`,
    fetcher
  );
  const { data: neighborhoodData, error: error2 } = useSWR(
    `/trucks/${props.id}/neighborhoods`,
    fetcher
  );

  if (error1) return <div>No se pudo cargar el camión</div>;
  if (!truckData) return <Loading />;

  const onSubmit = async (data) => {
    console.log("data enviar", data);

    data.working === "Disponible"
      ? console.log("tiene valor positivo. Mo s elimina ningun barrio")
      : neighborhoodData.data.map((neigborhood) =>
          handleDeleteNeighborhood(neigborhood)
        );

    const truckData1 = {
      license_plate: truckData.license_plate,
      type: data.type,
      working: data.working === "Disponible" ? true : false,
      user_id: truckData.user === null ? null : truckData.user.id,
    };
    console.log("truckData1", truckData1);
    try {
      const response = await api.put(`/trucks/${truckData.id}`, truckData1);
      console.log("rersponse put camion", response);
      console.log("correcto put camion");
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

  const handleDeleteNeighborhood = async (data) => {
    const neighborhoodData = {
      days: data.days,
      end_time: data.end_time,
      id: data.id,
      link: data.link,
      name: data.name,
      start_time: data.start_time,
      truck_id: null,
    };
    console.log(
      "neighborhoodData a actualizar a borra barrio",
      neighborhoodData
    );
    try {
      const response = await api.put(
        `/neighborhoods/${data.id}`,
        neighborhoodData
      );
      console.log("rersponse put barrio", response);
      console.log("correcto put camion");
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

  console.log("datacamionEdit", truckData);
  console.log("neighborhoodDataEdit", neighborhoodData);

  return (
    <>
      <div>
        <h3>Placa: {truckData.license_plate}</h3>
      </div>
      <div>
        <h3>
          Conductor:{" "}
          {truckData.user === null ? "Sin conductor" : truckData.user.name}
        </h3>
      </div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container>
          <Grid xs={12} spacing={2}>
            <h3>Estado del camión</h3>

            <FormControl component="fieldset">
              <RadioGroup
                defaultValue={
                  truckData.working ? "Disponible" : "No Disponible"
                }
                aria-label="gender"
                name="working"
              >
                <Box display="flex" justifyContent="center" m={1} p={1}>
                  <FormControlLabel
                    value="Disponible"
                    control={<StyledRadio />}
                    label="Disponible"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="No Disponible"
                    control={<StyledRadio />}
                    label="No Disponible"
                    inputRef={register}
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid xs={12} spacing={2}>
            <h3>Tipo de camión</h3>

            <FormControl component="fieldset">
              <RadioGroup
                defaultValue={
                  truckData.type === "Automático" ? "Automático" : "Manual"
                }
                aria-label="gender"
                name="type"
              >
                <Box display="flex" justifyContent="center" m={1} p={1}>
                  <FormControlLabel
                    value="Automático"
                    control={<StyledRadio />}
                    label="Automático"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="Manual"
                    control={<StyledRadio />}
                    label="Manual"
                    inputRef={register}
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Grid>
          {truckData.working ? (
            <Grid xs={12} spa cing={2}>
              <h3>Barrios del Camión</h3>
              <ul>
                {neighborhoodData
                  ? neighborhoodData.data.map((neighborhood) => (
                      <li>{neighborhood.name}</li>
                    ))
                  : "Sin barrios"}
              </ul>
            </Grid>
          ) : (
            ""
          )}

          <Box display="flex" justifyContent="center" m={1} p={1}>
            <Button
              //onSubmit={handleSubmit(onSubmit)}
              //onClick={props.onCancel}
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
        </Grid>
      </form>
    </>
  );
};

export default withAuth(EditTruck);
