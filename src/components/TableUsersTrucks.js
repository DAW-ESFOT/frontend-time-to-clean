import React from "react";
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
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';

const TableUsersTrucks = () => {
    const router = useRouter();
    const { data, error} = useSWR(`/users/filter/without-truck`, fetcher);
    if (error) return <div>No se pudo cargar los conductores</div>;
    if (!data) return <Loading />;

    console.log("data usuarios",data);
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

    return (
        <>
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
                                    "Sin camion"
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
        </>
    );
};

export default withAuth(TableUsersTrucks);
