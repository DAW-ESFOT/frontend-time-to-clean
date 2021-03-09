import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import SaveIcon from "@material-ui/icons/Save";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { DialogActions, Link as MuiLink } from "@material-ui/core";
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
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

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

const EditTruck = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const { data, error } = useSWR(`/trucks?page=${page + 1}`, fetcher);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [changeData, setChangeData] = useState(false);

  if (error) return <div>No se pudo cargar los camiones</div>;
  if (!data) return <Loading />;

  console.log("idcamion", props.id);

  return (
    <>
      <div>Formulario para editar</div>
      <Button color="secondary">Agregar</Button>
      <Button onClick={props.onCancel} color="secondary">
        Cancelar
      </Button>
    </>
  );
};

export default withAuth(EditTruck);
