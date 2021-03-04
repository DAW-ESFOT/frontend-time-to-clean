import React, {useEffect, useState} from "react";
import Routes from "../../constants/routes";
import Link from "next/link";
import {
    Avatar,
    Box,
    Button, Card, CardActionArea, CardContent, CardMedia, Divider,
    FormControl,
    InputBase, ListItem, ListItemAvatar, ListItemText,
    MenuItem,
    Select,
    withStyles
} from "@material-ui/core";
import PlaceIcon from '@material-ui/icons/Place';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import {Image} from "@material-ui/icons";
import Footer from "@/components/Footer";


const Neighborhoods = ({neighborhoods}) => {

    const [name, setName] = useState("");
    const [neighborhoodID, setNeighborhoodID] = useState([{
        id: "",
        name: "",
        start_time: "",
        end_time: "",
        days: "",
        link: ""
    }]);

    const handleChange = event => {
        setName(event.target.value);
    };


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
            // Use the system font instead of the default Roboto font.
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

    const styles = theme => ({
        button: {
            margin: theme.spacing.unit,
        },
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing.unit,
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
    });

    useEffect(() => {
        {
            neighborhoods.map((neighborhood, key) => {
                if (neighborhood.name === name) {
                    setNeighborhoodID({
                        ...neighborhoodID,
                        id: neighborhood.id,
                        name: neighborhood.name,
                        start_time: neighborhood.start_time,
                        end_time: neighborhood.end_time,
                        days: neighborhood.days,
                        link: neighborhood.link
                    });
                }
            })
        }
        ;
    }, [name]);


    return (
        <>
            <div>
                <form className={styles.root} autoComplete="off">
                    <div>
                        <Box display="flex" justifyContent="center" m={1} p={1}>
                            <h1>Encuentra Datos Sobre tu Sector de Manera Fácil y Sencilla</h1>
                        </Box>
                        <p>Seleccione el barrio que desee consultar sus horarios</p>
                    </div>
                    <FormControl className={styles.margin}>
                        <Select
                            value={name}
                            onChange={handleChange}
                            input={<BootstrapInput name="neighborhood" id="age-customized-select"/>}
                        >
                            <MenuItem value="">
                                Seleccione el Barrio
                            </MenuItem>
                            {neighborhoods.map((neighborhood) => (
                                <MenuItem value={neighborhood.name} key={neighborhood.id}>
                                    {/*<Link href={`/barrios/${neighborhood.id}`}>{neighborhood.name}</Link>*/}
                                    {neighborhood.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </form>


                {
                    name ?
                        <div>
                            <List className={styles.root2}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <PlaceIcon/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Barrio"
                                        secondary={
                                            <React.Fragment>

                                                <Link href={`/barrios/${neighborhoodID.id}`}>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={styles.inline}
                                                        color="textPrimary"
                                                    >
                                                        <a>
                                                            {neighborhoodID.name}
                                                        </a>


                                                    </Typography>
                                                </Link>

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
                                                    className={styles.inline}
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
                                                    className={styles.inline}
                                                    color="textPrimary"
                                                >
                                                    {neighborhoodID.days}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </List>
                            {neighborhoodID.link}
                            Mapa
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
                            <Button variant="contained" color="secondary" className={styles.button}>
                                Menú Principal
                            </Button>
                        </Link>
                    </Box>
                </div>

                <Footer/>
            </div>
        </>
    );
};

export default Neighborhoods;

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/neighborhoods`);
    const data = await res.json();

    const neighborhoods = data.data;

    return {
        props: {
            neighborhoods,
        },
    };
}
