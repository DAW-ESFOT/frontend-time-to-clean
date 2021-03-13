import React from "react";
import Link from "next/link";
import Routes from "../../constants/routes";
import {Box, Divider, List, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PlaceIcon from "@material-ui/icons/Place";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import withAuth from "@/hocs/withAuth";


const classes= makeStyles((theme) => ({
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


const NeighborhoodDetails = ({neighborhood}) => {

    if (!neighborhood) {
        return "No se puedo mostrar el comentario";
    }
    return (
        <>
            <div>
                {
                    neighborhood ?
                        <div>
                            <div>
                                <Typography component={'span'} color={"secondary"}>
                                    <Box display="flex" justifyContent="center" m={1} p={1}>
                                        <h1>
                                            Barrio {neighborhood.name}
                                        </h1>
                                    </Box>
                                </Typography>
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
                                                            {neighborhood.name}
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
                                                            {neighborhood.start_time} - {neighborhood.end_time}
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
                                                            {neighborhood.days}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                    <Button variant="contained" color="secondary" className={classes.button} href={neighborhood.link} target={"_blank"}>
                                        Ir a Google Maps
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <Box display="flex" justifyContent="center" m={1} p={1}>
                                    <Link href={Routes.NEIGHBORHOODS}>
                                        <Button variant="contained" color="secondary" className={classes.button2}>
                                            Regresar a buscar barrios
                                        </Button>
                                    </Link>

                                </Box>
                            </div>
                        </div>

                        :
                    <div>
                        No se ha podido cargar la información
                    </div>
                }

            </div>

        </>
    );
}
export default withAuth(NeighborhoodDetails);

export async function getStaticProps(context) {

    console.log('context', context)
    const {barriosId} = context.params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/neighborhoods/${barriosId}`)
    const data = await res.json()

    console.log("data", data)
    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            neighborhood: data
        }, // will be passed to the page component as props
    }
}


export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/neighborhoods`);
    const data = await res.json();

    const neighborhoods = data.data;

    const paths = neighborhoods.map((neighborhood) => {
        return {params: {barriosId: "" + neighborhood.id}};
    });

    return {
        paths,
        fallback: true, // See the "fallback" section below
    }
};

