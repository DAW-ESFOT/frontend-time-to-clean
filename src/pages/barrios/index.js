import React, {useState} from 'react';
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "../../components/Loading";
import FormControl from "@material-ui/core/FormControl";
import {
    Box, Divider,
    InputBase,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    MenuItem,
    Select, Typography, withStyles
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import PlaceIcon from '@material-ui/icons/Place';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import Routes from "../../constants/routes";


const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 200,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },

}))(InputBase);

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
    bootstrapFormLabel: {
        fontSize: 18,
    },
    root2: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));


const Neighborhoods = () => {

    const classes = useStyles();
    const {data, error} = useSWR(`/neighborhoods/all`, fetcher);
    const [name, setName] = useState("");
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
        setName(event.target.value);
        setNeighborhoodID({
            ...neighborhoodID,
            id: event.target.value.id,
            name: event.target.value.name,
            start_time: event.target.value.start_time,
            end_time: event.target.value.end_time,
            days: event.target.value.days,
            link: event.target.value.link
        });
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

                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.margin}>
                        <Select
                            value={name}
                            onChange={handleChange}
                            input={<BootstrapInput name="neighborhood" id="age-customized-select"/>}
                        >
                            <MenuItem value="">
                                Seleccione el Barrio
                            </MenuItem>
                            {
                                data.data.map((neighborhood) => {
                                        return (
                                            <MenuItem value={neighborhood} key={neighborhood.id}>
                                                {neighborhood.name}
                                            </MenuItem>
                                        )
                                    }
                                )
                            }
                        </Select>
                    </FormControl>
                </form>


                {
                    name ?
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
