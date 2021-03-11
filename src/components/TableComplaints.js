import React, {useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {withStyles, makeStyles} from "@material-ui/core/styles";
import {Dialog, DialogContent} from '@material-ui/core';
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
import BorderColorIcon from '@material-ui/icons/BorderColor';
import EditComplaint from "@/components/EditComplaint";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 13,
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
            <h1> Gestión de quejas</h1>
            <div>
                {
                    data ?
                        <div>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Queja</StyledTableCell>
                                            <StyledTableCell align="center">Remitente</StyledTableCell>
                                            <StyledTableCell align="center">Estado</StyledTableCell>
                                            <StyledTableCell align="center">Observación</StyledTableCell>
                                            <StyledTableCell align="center">Opción</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.data.map((Complaint) => (
                                            <StyledTableRow key={Complaint.id}>
                                                <StyledTableCell align="center">
                                                    {Complaint.complaint}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {Complaint.username}
                                                    {Complaint.email}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {Complaint.state}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {Complaint.observation}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <IconButton
                                                        onClick={() => handleOpenEditComplaint(Complaint.id)}
                                                        color="secondary"
                                                        aria-label="upload picture"
                                                        component="span">
                                                        <BorderColorIcon/>
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
                    <Dialog onClose={handleCloseEditComplaint} open={openEditComplaint}>
                        <DialogContent dividers>
                            <EditComplaint
                                id={ComplaintId}
                                onHandleCloseModal={handleCloseEditComplaint}/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    );
};

export default withAuth(TableComplaints);