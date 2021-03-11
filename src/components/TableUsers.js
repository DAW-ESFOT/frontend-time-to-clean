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
    Table, TablePagination,
} from "@material-ui/core";
import PostAddIcon from '@material-ui/icons/PostAdd';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Routes from "../constants/routes";


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
    const { data, error } = useSWR(`/users?page=${page + 1}`, fetcher);
    const [modalStyle] = React.useState(getModalStyle);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
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
                                    <BorderColorIcon  style={{ color: cyan[700] }}/>
                                    <DeleteIcon />
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

export default withAuth(TableUsers);
