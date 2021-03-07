import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  TablePagination,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PostAddIcon from "@material-ui/icons/PostAdd";

const TableTrucks = () => {
  const router = useRouter();
  const { data, error } = useSWR(`/trucks?page=${page + 1}`, fetcher);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (error) return <div>No se pudo cargar los camiones</div>;
  if (!data) return <Loading />;

  console.log("data camiones", data);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <h1 align="center">Gestión de Camiones</h1>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Placa</StyledTableCell>
              <StyledTableCell align="center">Estado</StyledTableCell>
              <StyledTableCell align="center">Tipo</StyledTableCell>
              <StyledTableCell align="center">Conductor</StyledTableCell>
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
                  {truck.working ? "Disponible" : "NO Disponible"}
                </StyledTableCell>
                <StyledTableCell align="center">{truck.type}</StyledTableCell>
                <StyledTableCell align="center">
                  {truck.user === null ? "Sin conductor" : truck.user.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <BorderColorIcon />
                  </IconButton>
                  <IconButton
                    color="dark"
                    aria-label="upload picture"
                    component="span"
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
    </>
  );
};

export default withAuth(TableTrucks);
