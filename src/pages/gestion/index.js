import React, {useState} from "react";
import withAuth from "@/hocs/withAuth";
import {
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    makeStyles
} from "@material-ui/core";
import TableTrucks from "@/components/TableTrucks";
import TableNeighborhoods from "@/components/TableNeighborhoods";
import TableUsers from "@/components/TableUsers";
import TableComplaints from "@/components/TableComplaints";
import List from "@material-ui/core/List";
import Image from "next/image";

const Management = () => {
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
            width: '100%',
            maxWidth: 360,
            color: '#262626'
        },
    }));

    const styles = {
        container: {
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundImage: `url(${"/fondo-gestion.png"})`,
            backgroundColor: 'rgba(35,96,132,0.8)',
            padding: '40px'
        }
    };

    const classes = useStyles();

    return (
        <>
            <Grid container>
                <Grid xs={3}>
                    <List className={classes.root}>
                        <ListItem onClick={onVisibleDriver}>
                            <ListItemAvatar>
                                <Image src="/volante-de-coche.png" alt="" width={35} height={35}/>
                            </ListItemAvatar>
                            <ListItemText primary="Gestión de Conductores"/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem onClick={onVisibleTruck}>
                            <ListItemAvatar>
                                <Image src="/delivery-truck.png" alt="" width={35} height={35}/>
                            </ListItemAvatar>
                            <ListItemText primary="Gestión de Camiones"/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem onClick={onVisibleComplaints}>
                            <ListItemAvatar>
                                <Image src="/customer-satisfaction.png" alt="" width={35} height={35}/>
                            </ListItemAvatar>
                            <ListItemText primary="Gestión de Quejas"/>
                        </ListItem>
                        <Divider variant="inset" component="li"/>
                        <ListItem onClick={onVisibleNeighborhoods}>
                            <ListItemAvatar>
                                <Image src="/maps-and-flags.png" alt="" width={35} height={35}/>
                            </ListItemAvatar>
                            <ListItemText primary="Registro de Barrios y Frecuencias"/>
                        </ListItem>
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
        </>
    );
};

export default withAuth(Management);
