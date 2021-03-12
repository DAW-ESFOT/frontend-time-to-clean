import React, {useState} from "react";
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
    Table, TablePagination, IconButton, Dialog, DialogTitle, DialogContent,
} from "@material-ui/core";
import PostAddIcon from '@material-ui/icons/PostAdd';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AddUser from "@/components/AddUser";
import EditUser from "@/components/EditUser";
import DeleteUser from "@/components/DeleteUser";


function rand() {
    return Math.round(Math.random() * 20) - 10;
}
const useStyles = makeStyles({
    table: {
        minWidth: 600,
    },
    margin: {
        backgroundColor: "#F5F5F5",
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
    const { data, error,mutate} = useSWR(`/users?page=${page + 1}`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [valueIdUser, setValueIdUser] = useState(null);
    const [isDialogsVisibleEditUser, setIsDialogsVisibleEditUser] = useState(
        false
    );
    const [isDialogsVisibleAddUser, setIsDialogsVisibleAddUser] = useState(
        false
    );
    const [
        isDialogsVisibleDeleteUser,
        setIsDialogsVisibleDeleteUser,
    ] = useState(false);

    const handleClickOpenAddUser = () => {
        setIsDialogsVisibleAddUser(true);
    };

    const handleClickOpenEditUser = (id) => {
        setIsDialogsVisibleEditUser(true);
        setValueIdUser(id);
    };

    const handleClickDeleteUser= async (id) => {
        setIsDialogsVisibleDeleteUser(true);
        setValueIdUser(id);
    };

    const handleClose = () => {
        setIsDialogsVisibleAddUser(false);
        setIsDialogsVisibleEditUser(false);
        setIsDialogsVisibleDeleteUser(false);
        mutate();
    };
    if (error) return <div>No se pudo cargar los conductores</div>;
    if (!data) return <Loading />;
    console.log("data usuarios",data);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <h1 align="center">Gestión de Usuarios</h1>
            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                <Button
                    variant="outlined"
                    size="large"
                    color="white"
                    className={classes.margin}
                    endIcon={<PostAddIcon/>}
                    onClick={handleClickOpenAddUser}
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
                                    {data.data.map((user) => (
                                        <StyledTableRow key={user.id}>
                                            <StyledTableCell align="center">
                                                {user.name} {user.lastname}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {user.email}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{user.cellphone}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {user.truck === null ? "Sin camion" : user.truck}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {user.type}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                            <IconButton
                                                color="secondary"
                                                aria-label="upload picture"
                                                component="span"
                                                onClick={() => handleClickOpenEditUser(user.id)}
                                            >
                                                <BorderColorIcon />
                                            </IconButton>
                                            <IconButton
                                                color="dark"
                                                aria-label="upload picture"
                                                component="span"
                                                onClick={() => handleClickDeleteUser(user.id)}
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
                        className={classes.margin}
                        onChangePage={handleChangePage}
                    />
            <Dialog
                open={isDialogsVisibleAddUser}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                disableBackdropClick={true}
            >
                <DialogTitle id="form-dialog-title">Agregar Nuevo Usuario </DialogTitle>
                <DialogContent>
                    <AddUser onCancel={handleClose} />
                </DialogContent>
            </Dialog>
            <Dialog
                open={isDialogsVisibleEditUser}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                disableBackdropClick={true}
            >
                <DialogTitle id="form-dialog-title">
                    Editar información del usuario
                </DialogTitle>
                <DialogContent>
                    <EditUser id={valueIdUser} onCancel={handleClose} />
                </DialogContent>
            </Dialog>
            <Dialog
                open={isDialogsVisibleDeleteUser}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                disableBackdropClick={true}
            >
                <DialogTitle id="form-dialog-title">Eliminar usuario</DialogTitle>
                <DialogContent>
                    <DeleteUser id={valueIdUser} onCancel={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default withAuth(TableUsers);
