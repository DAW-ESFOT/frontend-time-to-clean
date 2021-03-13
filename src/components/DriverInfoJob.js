import React from "react";
import withAuth from "@/hocs/withAuth";
import Typography from "@material-ui/core/Typography";
import {
    Box, Divider,
    Grid, IconButton,
    Link as MuiLink, List, ListItem, ListItemAvatar, ListItemText, makeStyles,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead, TablePagination,
    TableRow
} from "@material-ui/core";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "@/components/Loading";
import PlaceIcon from "@material-ui/icons/Place";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.cancel.main,
    },
    button2: {
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.secondary.main,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    root2: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const DriverInfoJob = ({user}) => {

    const classes = useStyles();
    //deberia ser con prop pero no tenia user pra probar
    // const {data: truckUser, error} = useSWR(`/users/${user.id}/truck`, fetcher);
    const {data: truckUser, error} = useSWR(`/users/2/truck`, fetcher);

    if (error) return <div>algo ha ocurrido</div>;
    if (!truckUser) return <Loading/>;
    console.log(truckUser);

    return (
        <>
            <div>
                <Typography component={'span'} color={"secondary"}>
                    <Box display="flex" justifyContent="center" m={1} p={1}>
                        <h1> Bienvenido {user.name} </h1>
                    </Box>
                </Typography>
                <Grid container>
                    <Grid>
                        <Typography component={'span'} color={"textPrimary"}>
                            <Box display="flex" justifyContent="start" m={1} p={1}>
                                <h2> Información del camión </h2>
                            </Box>
                        </Typography>
                        {
                            truckUser ?
                                <List className={classes.root2}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <PlaceIcon/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Placa"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        {truckUser.license_plate}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li"/>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <CalendarTodayIcon/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Tipo de camión"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        {truckUser.type}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </List>
                                :
                                <div>
                                    No tienen camión asignado
                                </div>
                        }

                    </Grid>

                </Grid>


                <Grid container>
                    <Grid>
                        <Typography component={'span'} color={"textPrimary"}>
                            <Box display="flex" justifyContent="start" m={1} p={1}>
                                <h2> Información de rutas </h2>
                            </Box>
                        </Typography>
                    </Grid>


                </Grid>


            </div>
        </>
    );
};

export default withAuth(DriverInfoJob);