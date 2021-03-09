import React, {useState} from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import { cyan } from '@material-ui/core/colors';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
} from "@material-ui/core";
import PostAddIcon from '@material-ui/icons/PostAdd';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import TableUsersTrucks from "@/components/TableUsersTrucks";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import Routes from "../constants/routes";
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
const useStyles = makeStyles({
    table: {
        minWidth: 600,
    },
});
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


const TableUsers = () => {
    const router = useRouter();
    const classes = useStyles();
    const { data, error } = useSWR(`/trucks/filter/with-drivers`, fetcher);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    if (error) return <div>No se pudo cargar los conductores</div>;
    if (!data) return <Loading />;
    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    const body = (
        <div style={modalStyle} >
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
        </div>
    );
    console.log("data usuarios",data);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <h1 align="center">Gestión de Usuarios</h1>
            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                <Button
                    variant="outlined"
                    size="large"
                    className={classes.margin}
                    endIcon={<PostAddIcon/>}
                    href={Routes.REGISTER}
                >
                    Agregar Usuario
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nombre</StyledTableCell>
                            <StyledTableCell align="center">Correo</StyledTableCell>
                            <StyledTableCell align="center">Celular</StyledTableCell>
                            <StyledTableCell align="center">Camion</StyledTableCell>
                            <StyledTableCell align="center">Tipo</StyledTableCell>
                            <StyledTableCell align="center">Opciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.data.map((truck) => (
                            <StyledTableRow key={truck.user.id}>
                                <StyledTableCell align="center">
                                    {truck.user.name} {truck.user.lastname}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {truck.user.email}
                                </StyledTableCell>
                                <StyledTableCell align="center">{truck.user.cellphone}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {truck.license_plate === null ? "Sin camion" : truck.license_plate}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {truck.user.type}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <BorderColorIcon  style={{ color: cyan[700] }} onClick={handleOpen}/>

                                    <DeleteIcon />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    <TableUsersTrucks/>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </>
    );
};

export default withAuth(TableUsers);
