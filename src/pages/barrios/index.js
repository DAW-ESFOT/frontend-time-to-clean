import React, {useState} from 'react';
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "../../components/Loading";
import {
    Box, Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import PlaceIcon from '@material-ui/icons/Place';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import Routes from "../../constants/routes";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";


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


const Neighborhoods = () => {

    const classes = useStyles();
    const {data, error} = useSWR(`/neighborhoods/all`, fetcher);
    const [name, setName] = useState({
        id: "",
        neighborhood: ""
    });
    const [neighborhoodID, setNeighborhoodID] = useState([{
        id: "",
        name: "",
        start_time: "",
        end_time: "",
        days: "",
        link: ""
    }]);

    if (error) return <div>No se pudo cargar la informacion de los usuarios</div>;
    if (!data) return <Loading/>;

    const handleChange = event => {
        const number = event.target.value;
        setName({
            ...name,
            id: number ? number : "",
            neighborhood: number ? data.data[number].name : "",
        });
        number ?
            setNeighborhoodID({
                ...neighborhoodID,
                id: data.data[number].id,
                name: data.data[number].name,
                start_time: data.data[number].start_time,
                end_time: data.data[number].end_time,
                days: data.data[number].days,
                link: data.data[number].link
            })
            : setNeighborhoodID("");
    };


    return (
        <>
            <div>
                <div>
                    <Box display="flex" justifyContent="center" m={1} p={1}>
                        <h1>Encuentra Datos Sobre tu Sector de Manera Fácil y Sencilla</h1>
                    </Box>
                    <p>Seleccione el barrio que desee consultar sus horarios</p>
                </div>

                <Grid item xs={12} md={6} lg={4} >
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Barrio"
                        value={name.id}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Por favor selecciona un barrio de la lista"

                    >
                        <option aria-label="None" value=""/>
                        {
                            data.data.map((neighborhood, index) => {
                                    return (
                                        <option value={index}>
                                            {neighborhood.name}
                                        </option>
                                    )
                                }
                            )
                        }
                    </TextField>
                </Grid>


                {
                    name.neighborhood !== "" ?
                        <div>
                            <List className={classes.root2}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <PlaceIcon/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Barrio"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {neighborhoodID.name}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li"/>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <WatchLaterIcon/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Horario de recoleción"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {neighborhoodID.start_time} - {neighborhoodID.end_time}
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
                                        primary="Días de recoleción"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    {neighborhoodID.days}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </List>
                            <Button className={classes.button2} href={neighborhoodID.link} target={"_blank"}>
                                Ir a Google Maps
                            </Button>
                        </div>
                        :
                        <div>
                            <Box display="flex" justifyContent="center" m={1} p={1}>
                                <img src="recoleccion.jpg" alt="recolector"/>
                            </Box>
                        </div>
                }


                <div>
                    <Box display="flex" justifyContent="center" m={1} p={1}>
                        <Link href={Routes.HOME}>
                            <Button variant="contained" color="secondary" className={classes.button}>
                                Menú Principal
                            </Button>
                        </Link>

                    </Box>
                </div>


            </div>
        </>

    );
};

export default Neighborhoods;
