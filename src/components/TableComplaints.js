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
import EditComplaint from "@/components/EditComplaint";

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


const TableComplaints = () => {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const {data, error} = useSWR(`/complaints?page=${page + 1}`, fetcher);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [ComplaintId, setComplaintId] = useState(0);
    const [openEditComplaint, setOpenEditComplaint] = useState(false);


    console.log("data Complaints", data);

    if (error) return <div>No se pudo cargar los quejas</div>;
    if (!data) return <Loading/>;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleOpenEditComplaint = (id) => {
        setOpenEditComplaint(!openEditComplaint);
        setComplaintId(id);
    };
    const handleCloseEditComplaint = () => {
        setOpenEditComplaint(!openEditComplaint);
    };


    return (
        <>
            <h1 align="center">Gestión de quejas</h1>
            <p>Registro de quejas</p>
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
                                        {data.data.map((Complaint) => (
                                            <StyledTableRow key={Complaint.id}>
                                                <StyledTableCell align="center">
                                                    {Complaint.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <MuiLink href={Complaint.link}
                                                             target={"_blank"}
                                                             color="secondary">
                                                        Ver mapa
                                                    </MuiLink>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {Complaint.start_time} - {Complaint.end_time}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {Complaint.days}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <IconButton
                                                         onClick={ ()=>handleOpenEditComplaint( Complaint.id) }
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
                    <Dialog onClose={handleCloseEditComplaint}  open={openEditComplaint} >
                        <DialogContent dividers>
                            <EditComplaint
                                id={ComplaintId}
                                onHandleCloseModal={ handleCloseEditComplaint }/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    );
};

export default withAuth(TableComplaints);