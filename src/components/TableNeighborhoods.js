import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import {Dialog, DialogContent, DialogTitle, Link as MuiLink, TextField} from '@material-ui/core';
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

const useStyles = makeStyles((theme)=>({
    table: {
        minWidth: 600,
    },
    textField: {
        width: '100%',
    }
}));


const TableNeighborhoods = () => {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const {data, error} = useSWR(`/neighborhoods?page=${page + 1}`, fetcher);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [neighborhoodId, setNeighborhoodId] = useState(0);
    const [openAddNeighborhood, setOpenAddNeighborhood] = useState(false);
    const [openEditNeighborhood, setOpenEditNeighborhood] = useState(false);


    console.log("data neighborhoods", data);

    if (error) return <div>No se pudo cargar los barrios</div>;
    if (!data) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleOpenNewNeigbhorhood = (  ) => {
        setOpenAddNeighborhood(!openAddNeighborhood);

    };
    const handleOpenEditNeigbhorhood = (id) => {
        setOpenEditNeighborhood(!openEditNeighborhood);
        setNeighborhoodId(id);
    };
    const handleCloseEditNeigbhorhood = () => {
        setOpenEditNeighborhood(!openEditNeighborhood);
    };


    return (
        <>
            <h1 align="center">Gestión y asignación de barrios y frecuencias</h1>
            <p>Lista de Barrios</p>
            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                <Button
                    variant="outlined"
                    size="large"
                    className={classes.margin}
                    endIcon={<PostAddIcon/>}
                    onClick={ handleOpenNewNeigbhorhood }>
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
                                                         onClick={ ()=>handleOpenEditNeigbhorhood( neighborhood.id) }
                                                        color="secondary"
                                                        aria-label="upload picture"
                                                                component="span">
                                                        <BorderColorIcon/>
                                                    </IconButton>
                                                    <IconButton color="dark" aria-label="upload picture"
                                                                component="span">
                                                        <DeleteIcon style={{color: "black"}}/>
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
                        :
                        <Loading/>
                }


                <div>
                    <Dialog onClose={handleOpenNewNeigbhorhood}  open={openAddNeighborhood} >
                        <DialogContent dividers>
                            <AddNeighborhood onHandleCloseModal={ handleOpenNewNeigbhorhood }/>
                        </DialogContent>
                    </Dialog>
                    <Dialog onClose={handleCloseEditNeigbhorhood}  open={openEditNeighborhood} >
                        <DialogContent dividers>
                            <EditNeighborhood
                                id={neighborhoodId}
                                onHandleCloseModal={ handleCloseEditNeigbhorhood }/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    );
};

export default withAuth(TableNeighborhoods);