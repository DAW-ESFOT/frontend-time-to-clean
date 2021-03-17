import React, {useState} from "react";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {withStyles} from "@material-ui/core/styles";
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

const styles={
    title:{
        textAlign:'center',
        color:'white',
        textShadow: '2px 2px #262626',
    }
};

const TableComplaints = () => {
    const [page, setPage] = useState(0);
    const {data, error} = useSWR(`/complaints?page=${page + 1}`, fetcher);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [ComplaintId, setComplaintId] = useState(0);
    const [openEditComplaint, setOpenEditComplaint] = useState(false);

    console.log("Complaints", data);

    if (error) return <div>No se pudieron cargar las quejas</div>;
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
            <h1 style={styles.title}> Gestión de quejas</h1>
            <div>
                {
                    data ?
                        <div>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center" style={{ width: 100 }}>Fecha</StyledTableCell>
                                            <StyledTableCell align="center" style={{ width: 350 }}>Queja</StyledTableCell>
                                            <StyledTableCell align="center">Información</StyledTableCell>
                                            <StyledTableCell align="center">Estado</StyledTableCell>
                                            <StyledTableCell align="center" style={{ width: 200 }}>Observación</StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.data.map((Complaint) => (
                                            <StyledTableRow key={Complaint.id}>
                                                <StyledTableCell align="center">
                                                    {(Complaint.created_at).substr(0, 10)}<br/>
                                                    {(Complaint.created_at).substr(11, 5)}
                                                </StyledTableCell>
                                                <StyledTableCell align="justify">
                                                    {(Complaint.complaint).substr(0, 135)} [...]
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    Barrio: {Complaint.neighborhood_id}<br/>
                                                    Camión: {Complaint.truck.license_plate}<br/>
                                                    Conductor: {Complaint.truck.user.name} {Complaint.truck.user.lastname}<br/>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {Complaint.state}
                                                </StyledTableCell>
                                                <StyledTableCell align="justify">
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