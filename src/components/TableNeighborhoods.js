import React, {useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import {Dialog, DialogContent, Link as MuiLink} from '@material-ui/core';
import {
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table, Button, Box, TablePagination, IconButton,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddNeighborhood from "@/components/AddNeighborhood";
import EditNeighborhood from "@/components/EditNeighborhood";
import api from "@/lib/api";
import {useSnackbar} from "notistack";
import DeleteNeighborhood from "@/components/DeleteNeighborhood";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    }
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
    }
}));


const TableNeighborhoods = () => {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const {data, error, mutate} = useSWR(`/neighborhoods?page=${page + 1}`, fetcher);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [neighborhoodId, setNeighborhoodId] = useState(0);
    const [openAddNeighborhood, setOpenAddNeighborhood] = useState(false);
    const [openEditNeighborhood, setOpenEditNeighborhood] = useState(false);
    const [openDeleteNeighborhood, setOpenDeleteNeighborhood] = useState(false);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleOpenNewNeigbhorhood = () => {
        setOpenAddNeighborhood(!openAddNeighborhood);
        mutate();
    };

    const handleOpenEditNeigbhorhood = (id) => {
        setOpenEditNeighborhood(!openEditNeighborhood);
        setNeighborhoodId(id);
    };
    const handleCloseEditNeigbhorhood = () => {
        setOpenEditNeighborhood(false);
        mutate();
    };
    const handleOpenDeleteNeigbhorhood = (id) => {
        setOpenDeleteNeighborhood(!openDeleteNeighborhood);
        setNeighborhoodId(id);
    };
    const handleCloseDeleteNeigbhorhood = () => {
        setOpenDeleteNeighborhood(!openDeleteNeighborhood);
        mutate();
    };



    if (error) return <div>No se pudo cargar los barrios</div>;
    if (!data) return <Loading/>;

    return (
        <>
            <h1 align="center">Gestión y asignación de barrios y frecuencias</h1>
            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                <Button
                    variant="outlined"
                    size="large"
                    className={classes.margin}
                    endIcon={<PostAddIcon/>}
                    onClick={handleOpenNewNeigbhorhood}>
                    Agregar Barrio
                </Button>
            </Box>
            <div>
                {
                    data ?
                        <div>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Barrio</StyledTableCell>
                                            <StyledTableCell align="center">Ubicación en mapa</StyledTableCell>
                                            <StyledTableCell align="center">horario</StyledTableCell>
                                            <StyledTableCell align="center">Dias asignados</StyledTableCell>
                                            <StyledTableCell align="center">Opción</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.data.map((neighborhood) => (
                                            <StyledTableRow key={neighborhood.id}>
                                                <StyledTableCell align="center">
                                                    {neighborhood.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <MuiLink href={neighborhood.link}
                                                             target={"_blank"}
                                                             color="secondary">
                                                        Ver mapa
                                                    </MuiLink>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {neighborhood.start_time} - {neighborhood.end_time}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {neighborhood.days}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <IconButton
                                                        onClick={() => handleOpenEditNeigbhorhood(neighborhood.id)}
                                                        color="secondary"
                                                        aria-label="upload picture"
                                                        component="span">
                                                        <BorderColorIcon/>
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleOpenDeleteNeigbhorhood(neighborhood.id)}
                                                        aria-label="upload picture"
                                                        component="span">
                                                        <DeleteIcon  style={{ color: "black" }}/>
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
                        </div>
                        :
                        <Loading/>
                }


                <div>
                    <Dialog onClose={handleOpenNewNeigbhorhood} open={openAddNeighborhood}>
                        <DialogContent dividers>
                            <AddNeighborhood onHandleCloseModal={handleOpenNewNeigbhorhood}/>
                        </DialogContent>
                    </Dialog>
                    <Dialog onClose={handleCloseEditNeigbhorhood} open={openEditNeighborhood}>
                        <DialogContent dividers>
                            <EditNeighborhood
                                id={neighborhoodId}
                                onHandleCloseModal={handleCloseEditNeigbhorhood}/>
                        </DialogContent>
                    </Dialog>
                    <Dialog onClose={handleCloseDeleteNeigbhorhood} open={openDeleteNeighborhood}>
                        <DialogContent dividers>
                            <DeleteNeighborhood
                                id={neighborhoodId}
                                onHandleCloseModal={handleCloseDeleteNeigbhorhood}/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    );
};

export default withAuth(TableNeighborhoods);