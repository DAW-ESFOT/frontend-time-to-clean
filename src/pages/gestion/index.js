import React, { useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import { Grid, MenuList, MenuItem } from "@material-ui/core";
import Footer from "@/components/Footer";
import TableTrucks from "@/components/TableTrucks";
import TableUsers from "@/components/TableUsers";

const Management = () => {
  const [showTrucks, setShowTrucks] = useState(false);
  const [showDrivers, setShowDrivers] = useState(false);
  const [showComplaints, setShowComplaints] = useState(false);
  const [showNeighborhoods, setShowNeighborhoods] = useState(false);

  const onVisibleTruck = () => {
    setShowTrucks(true);
    setShowDrivers(false);
    setShowComplaints(false);
    setShowNeighborhoods(false);
  };

  const onVisibleDriver = () => {
    setShowDrivers(true);
    setShowTrucks(false);
    setShowComplaints(false);
    setShowNeighborhoods(false);
  };

  const onVisibleComplaints = () => {
    setShowComplaints(true);
    setShowTrucks(false);
    setShowDrivers(false);
    setShowNeighborhoods(false);
  };

  const onVisibleNeighborhoods = () => {
    setShowNeighborhoods(true);
    setShowComplaints(false);
    setShowTrucks(false);
    setShowDrivers(false);
  };

  return (
    <>
      <Grid container>
        <Grid xs={3}>
          <MenuList>
            <MenuItem onClick={onVisibleDriver}>Gestión de Condutores</MenuItem>
            <MenuItem onClick={onVisibleTruck}>Gestión de Camiones</MenuItem>
            <MenuItem onClick={onVisibleComplaints}>Gestión de Quejas</MenuItem>
            <MenuItem onClick={onVisibleNeighborhoods}>
              Registro de Barrios y Frecuencias
            </MenuItem>
          </MenuList>
        </Grid>
        <Grid xs={9}>
          {showTrucks &&
          showDrivers === false &&
          showComplaints === false &&
          showNeighborhoods === false ? (
            <TableTrucks />
          ) : showTrucks === false &&
            showDrivers &&
            showComplaints === false &&
            showNeighborhoods === false ? (
              <TableUsers />
          ) : showTrucks === false &&
            showDrivers === false &&
            showComplaints &&
            showNeighborhoods === false ? (
            "Componenete complaint"
          ) : showTrucks === false &&
            showDrivers === false &&
            showComplaints === false &&
            showNeighborhoods ? (
            "Complemento Neigborhoods"
          ) : (
            "Cargando"
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default withAuth(Management);
