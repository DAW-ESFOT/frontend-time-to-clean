import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import { useForm } from "react-hook-form";
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
  DialogTitle,
  DialogContent,
  Dialog,
  TextField,
  InputBase,
  InputAdornment,
  Grid,
  Divider,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SearchIcon from "@material-ui/icons/Search";
import BackspaceIcon from "@material-ui/icons/Backspace";
import AddTruck from "@/components/AddTruck";
import EditTruck from "@/components/EditTruck";
import DeleteTruck from "@/components/DeleteTruck";

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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 600,
  },
  margin: {
    backgroundColor: "#F5F5F5",
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

  root3: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const TableTrucks = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const { data: trucksData, error: error1, mutate } = useSWR(
    `/trucks?page=${page + 1}`,
    fetcher
  );
  const { data: neighborhoodsData, error: error2 } = useSWR(
    `/neighborhoods/all`,
    fetcher
  );
  const { register, handleSubmit, control, errors } = useForm();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [valueIdTruck, setValueIdTruck] = useState(null);
  const [isDialogsVisibleEditTruck, setIsDialogsVisibleEditTruck] = useState(
    false
  );
  const [isDialogsVisibleAddTruck, setIsDialogsVisibleAddTruck] = useState(
    false
  );
  const [
    isDialogsVisibleDeleteTruck,
    setIsDialogsVisibleDeleteTruck,
  ] = useState(false);

  const [wordSearch, setWordSearch] = useState("");

  //console.log("data camiones", trucksData);
  //console.log("data barrio", neighborhoodsData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpenAddTruck = () => {
    setIsDialogsVisibleAddTruck(true);
  };

  const handleClickOpenEditTruck = (id) => {
    setIsDialogsVisibleEditTruck(true);
    setValueIdTruck(id);
  };

  const handleClickDeleteTruck = async (id) => {
    setIsDialogsVisibleDeleteTruck(true);
    setValueIdTruck(id);
  };

  const handleClose = () => {
    setIsDialogsVisibleAddTruck(false);
    setIsDialogsVisibleEditTruck(false);
    setIsDialogsVisibleDeleteTruck(false);
    mutate();
  };

  const handleClickSearchTruck = async (data) => {
    setWordSearch(data.wordToSearch);
    //console.log("wordToSearchlabel", data.wordToSearch);
    //console.log("wordSearchUsestate", wordSearch);
  };

  const handleClickDeleteSearchTruck = () => {
    setWordSearch("");
    //console.log("handleClickDeleteSearchTruck", wordSearch);
  };

  if (error1) return <div>No se pudo cargar los camiones</div>;
  if (!trucksData) return <Loading />;

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
      <Box display="flex" justifyContent="flex" m={1} p={1}>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleClickSearchTruck)}
        >
          <Paper className={classes.root3}>
            <InputBase
              id="wordToSearch"
              name="wordToSearch"
              className={classes.input}
              placeholder="Placa a buscar"
              inputRef={register}
            />
            <IconButton
              onClick={handleClickDeleteSearchTruck}
              className={classes.iconButton}
              aria-label="search"
            >
              <BackspaceIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>
      </Box>

      {wordSearch !== "" ? (
        <div>Tabla de bvusqueda {wordSearch}</div>
      ) : (
        <div>
          {trucksData ? (
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Placa</StyledTableCell>
                      <StyledTableCell align="center">
                        Conductor
                      </StyledTableCell>
                      <StyledTableCell align="center">Tipo</StyledTableCell>
                      <StyledTableCell align="center">Barrios</StyledTableCell>
                      <StyledTableCell align="center">Estado</StyledTableCell>
                      <StyledTableCell align="center">Opción</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trucksData.data.map((truck) => (
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
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {neighborhoodsData ? (
                            <ul>
                              {neighborhoodsData.data.map((neighborhood) =>
                                neighborhood.truck === null ? (
                                  ""
                                ) : neighborhood.truck.id === truck.id ? (
                                  <li>{neighborhood.name}</li>
                                ) : (
                                  ""
                                )
                              )}
                            </ul>
                          ) : (
                            ""
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {truck.working ? "Disponible" : "No Disponible"}
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
                            disabled={truck.working}
                            onClick={() => handleClickDeleteTruck(truck.id)}
                          >
                            <DeleteIcon
                              style={{ color: truck.working ? "black" : "red" }}
                            />
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
                count={trucksData.meta.total}
                rowsPerPage={rowsPerPage}
                page={page}
                className={classes.margin}
                onChangePage={handleChangePage}
              />
            </div>
          ) : (
            <Loading />
          )}
        </div>
      )}

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

      <Dialog
        open={isDialogsVisibleDeleteTruck}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
      >
        <DialogTitle id="form-dialog-title">Eliminar camión</DialogTitle>
        <DialogContent>
          <DeleteTruck id={valueIdTruck} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withAuth(TableTrucks);
