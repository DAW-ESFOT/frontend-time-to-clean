import React, {useState} from "react";
import withAuth from "@/hocs/withAuth";
import {
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    makeStyles, ButtonBase,
} from "@material-ui/core";
import TableTrucks from "@/components/TableTrucks";
import TableNeighborhoods from "@/components/TableNeighborhoods";
import TableUsers from "@/components/TableUsers";
import TableComplaints from "@/components/TableComplaints";
import List from "@material-ui/core/List";
import Image from "next/image";
import Box from "@material-ui/core/Box";
import {useAuth} from "@/lib/auth";
import DriverInfoProfile from "@/components/DriverInfoProfile";
import DriverInfoJob from "@/components/DriverInfoJob";

const Management = () => {
    const {user} = useAuth();

    const [showTrucks, setShowTrucks] = useState(false);
    const [showDrivers, setShowDrivers] = useState(true);
    const [showComplaints, setShowComplaints] = useState(false);
    const [showNeighborhoods, setShowNeighborhoods] = useState(false);

    const onVisibleTruck = () => {
        setShowTrucks(true);
        setShowDrivers(false);
        setShowComplaints(false);
        setShowNeighborhoods(false);
    };

    const onVisibleDriver = () => {
        setShowDrivers(true);
        setShowTrucks(false);
        setShowComplaints(false);
        setShowNeighborhoods(false);
    };

    const onVisibleComplaints = () => {
        setShowComplaints(true);
        setShowTrucks(false);
        setShowDrivers(false);
        setShowNeighborhoods(false);
    };

    const onVisibleNeighborhoods = () => {
        setShowNeighborhoods(true);
        setShowComplaints(false);
        setShowTrucks(false);
        setShowDrivers(false);
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            width: "100%",
            maxWidth: 360,
            color: "#262626",
        },
    }));

    const styles = {
        container: {
            background: 'linear-gradient(0deg, rgba(168,304,216,1) 0%, rgba(96,149,176,1) 100%)',
            padding: "20px",
        },
    };
    const classes = useStyles();

    // console.log("este  user entra", user);

    return (
        <>
            {user.role === "ROLE_SUPERADMIN" || user.data.user.role === "ROLE_SUPERADMIN" ? (
                <Grid container>
                    <Grid xs={3}>
                        <List className={classes.root}>
                            <ButtonBase>
                                <ListItem onClick={onVisibleDriver}>
                                    <ListItemAvatar>
                                        <Image
                                            src="/volante-de-coche.png"
                                            alt=""
                                            width={30}
                                            height={30}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary="Gestión de Conductores"/>
                                </ListItem>
                            </ButtonBase>
                            <Divider variant="inset" component="li"/>
                            <ButtonBase>
                                <ListItem onClick={onVisibleTruck}>
                                    <ListItemAvatar>
                                        <Image
                                            src="/delivery-truck.png"
                                            alt=""
                                            width={30}
                                            height={30}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary="Gestión de Camiones"/>
                                </ListItem>
                            </ButtonBase>
                            <Divider variant="inset" component="li"/>
                            <ButtonBase>
                                <ListItem onClick={onVisibleNeighborhoods}>
                                    <ListItemAvatar>
                                        <Image
                                            src="/maps-and-flags.png"
                                            alt=""
                                            width={30}
                                            height={30}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary="Registro de Barrios y Frecuencias"/>
                                </ListItem>
                            </ButtonBase>
                            <Divider variant="inset" component="li"/>
                            <ButtonBase>
                                <ListItem onClick={onVisibleComplaints}>
                                    <ListItemAvatar>
                                        <Image
                                            src="/customer-satisfaction.png"
                                            alt=""
                                            width={30}
                                            height={30}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText primary="Gestión de Quejas"/>
                                </ListItem>
                            </ButtonBase>
                            <Box p={14} bgcolor="background.paper"/>
                        </List>
                    </Grid>
                    <Grid xs={9} style={styles.container}>
                        {showTrucks ? (
                            <TableTrucks/>
                        ) : showDrivers ? (
                            <TableUsers/>
                        ) : showComplaints ? (
                            <TableComplaints/>
                        ) : showTrucks === false &&
                        showDrivers === false &&
                        showComplaints === false &&
                        showNeighborhoods ? (
                            <TableNeighborhoods/>
                        ) : (
                            "cargando XD"
                        )}
                    </Grid>
                </Grid>
            ) : (
                <Grid container>
                    <Grid xs={2} md={2} xl={2} lg={2}>
                        <List className={classes.root}>
                            <ListItemAvatar>
                                <Image src="/reuse.png" alt="" width={100} height={100}/>
                            </ListItemAvatar>
                            <ListItem onClick={onVisibleDriver}>
                                <ListItemAvatar>
                                    <Image
                                        src="/volante-de-coche.png"
                                        alt=""
                                        width={30}
                                        height={30}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary="DATOS DE PERFIL"/>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <ListItem onClick={onVisibleTruck}>
                                <ListItemAvatar>
                                    <Image
                                        src="/delivery-truck.png"
                                        alt=""
                                        width={30}
                                        height={30}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary="INFORMACIÓN DE TRABAJO"/>
                            </ListItem>
                            <Divider variant="inset" component="li"/>
                            <Box p={13} bgcolor="background.paper"/>
                        </List>
                    </Grid>
                    <Grid xs={9}>
                        {showTrucks ? (
                            <DriverInfoProfile user={user}/>
                        ) : showDrivers ? (
                            <DriverInfoJob user={user}/>
                        ) : (
                            <DriverInfoProfile user={user}/>
                        )}
                    </Grid>
                </Grid>
            )

            }
        </>
    );
};

export default withAuth(Management);
