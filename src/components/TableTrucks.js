import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import SaveIcon from "@material-ui/icons/Save";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Link as MuiLink } from "@material-ui/core";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Button,
  Box,
  TablePagination,
  IconButton,
  DialogActions,
  DialogTitle,
  DialogContentText,
  DialogContent,
  Dialog,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddTruck from "@/components/AddTruck";
import EditTruck from "@/components/EditTruck";
import api from "@/lib/api";
import translateMessage from "../constants/messages";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

const TableTrucks = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const { data, error } = useSWR(`/trucks?page=${page + 1}`, fetcher);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [changeData, setChangeData] = useState(false);
  const [valueIdTruck, setValueIdTruck] = useState(null);
  const [isDialogsVisibleEditTruck, setIsDialogsVisibleEditTruck] = useState(
    false
  );
  const [isDialogsVisibleAddTruck, setIsDialogsVisibleAddTruck] = useState(
    false
  );

  console.log("data camiones", data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpenEditTruck = (id) => {
    setIsDialogsVisibleEditTruck(true);
    setValueIdTruck(id);
  };

  const handleClickOpenAddTruck = () => {
    setIsDialogsVisibleAddTruck(true);
  };

  const handleClickDeleteTruck = async (id) => {
    console.log("id a borrar", id);
    try {
      const response = await api.delete(`/trucks/${id}`);
      console.log("rersponse delete truck", response);
      console.log("correcto delete camion");
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

  const handleClose = () => {
    setIsDialogsVisibleAddTruck(false);
    setIsDialogsVisibleEditTruck(false);
  };

  const handleChangeData = (id) => {
    console.log("idcamion", id);
    changeData ? setChangeData(false) : setChangeData(true);
    3;
  };

  if (error) return <div>No se pudo cargar los camiones</div>;
  if (!data) return <Loading />;

  return (
    <>
      <h1 align="center">Gestión de camiones</h1>
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        <Button
          variant="outlined"
          size="large"
          className={classes.margin}
          endIcon={<PostAddIcon />}
          onClick={handleClickOpenAddTruck}
        >
          Agregar Camión
        </Button>
      </Box>
      <div>
        {data ? (
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Placa</StyledTableCell>
                    <StyledTableCell align="center">Conductor</StyledTableCell>
                    <StyledTableCell align="center">Tipo</StyledTableCell>
                    <StyledTableCell align="center">Barrios</StyledTableCell>
                    <StyledTableCell align="center">Estado</StyledTableCell>
                    <StyledTableCell align="center">Opción</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.data.map((truck) => (
                    <StyledTableRow key={truck.id}>
                      <StyledTableCell align="center">
                        {truck.license_plate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {truck.user === null
                          ? "Sin conductor"
                          : truck.user.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {truck.type}
                        {changeData ? (
                          <IconButton
                            color="dark"
                            aria-label="upload picture"
                            component="span"
                          >
                            <ArrowDropDownIcon style={{ color: "black" }} />
                          </IconButton>
                        ) : (
                          ""
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">barrios</StyledTableCell>
                      <StyledTableCell align="center">
                        {truck.working ? "Disponible" : "No Disponible"}
                        {changeData ? (
                          <IconButton
                            color="dark"
                            aria-label="upload picture"
                            component="span"
                          >
                            <ArrowDropDownIcon style={{ color: "black" }} />
                          </IconButton>
                        ) : (
                          ""
                        )}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <IconButton
                          color="secondary"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => handleClickOpenEditTruck(truck.id)}
                        >
                          <BorderColorIcon />
                        </IconButton>
                        <IconButton
                          color="dark"
                          aria-label="upload picture"
                          component="span"
                          onClick={() => handleClickDeleteTruck(truck.id)}
                        >
                          <DeleteIcon style={{ color: "black" }} />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={data.meta.total}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
            />
          </div>
        ) : (
          <Loading />
        )}
      </div>
      <Dialog
        open={isDialogsVisibleAddTruck}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
      >
        <DialogTitle id="form-dialog-title">Agregar Nuevo Camión</DialogTitle>
        <DialogContent>
          <AddTruck onCancel={handleClose} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isDialogsVisibleEditTruck}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
      >
        <DialogTitle id="form-dialog-title">
          Editar Información Camión
        </DialogTitle>
        <DialogContent>
          <EditTruck id={valueIdTruck} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withAuth(TableTrucks);
