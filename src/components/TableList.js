import React, {useState} from "react";
import Link from "next/link";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import {useRouter} from "next/router";
import styles from "@/styles/Home.module.css";
import Loading from "@/components/Loading";
import withAuth from "@/hocs/withAuth";
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const TableList = () => {
    const router = useRouter();
    const {neighborhoodId} = router.query;
    const {data, error} = useSWR(`/neighborhoods`, fetcher);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    if (error) return <div>No se pudo cargar los barrios</div>;
    if (!data) return <Loading/>;

    console.log("data barrios", data);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 440,
        },
    });

    return (
        <>


            <TableContainer className={useStyles.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                key="id"
                                align={"center"}
                                style={{minWidth: 300}}
                            >
                                id
                            </TableCell>
                            <TableCell
                                key="id"
                                align={"center"}
                                style={{minWidth: 300}}
                            >
                                name
                            </TableCell>
                            <TableCell
                                key="id"
                                align={"center"}
                                style={{minWidth: 300}}
                            >
                                days
                            </TableCell>
                            <TableCell
                                key="id"
                                align={"center"}
                                style={{minWidth: 300}}
                            >
                                schedule
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            data.data.map((column, key) => {
                                const value = column.name;
                                return (
                                    <>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell key={key + " - id"}>
                                                {column.id}
                                            </TableCell>
                                            <TableCell key={key + "- name"}>
                                                {column.name}
                                            </TableCell>
                                            <TableCell key={key + "- days"}>
                                                {column.days}
                                            </TableCell>
                                            <TableCell key={key + "- days"}>
                                                {column.start_time } - {column.end_time}
                                            </TableCell>
                                        </TableRow>
                                    </>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={5}
                rowsPerPage={5}
                page={1}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />

            <Link href="/">
                <button>Volver</button>
            </Link>
        </>
    );
};

export default withAuth(TableList);
