import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Routes from "../constants/routes";

const styles = {
    Container: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "450px",
        backgroundColor: "#FFFFFF",
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const OptionSection = () => {

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div style={styles.Container}>
            <Grid container direction="row" justify="space-between">
                <Link href={Routes.ABOUT}>
                    <Card className={classes.root}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5">
                                    Consulta los horarios de recolección
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    ....
                                </Typography>
                            </CardContent>
                        </div>
                        <CardMedia
                            className={classes.cover}
                            image={`http://www.emaseo.gob.ec/wp-content/uploads/2016/04/slideHorarios.jpg`}
                            title="Opt1"
                        />
                    </Card>
                </Link>
                <Link href={Routes.ABOUT}>
                    <Card className={classes.root}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5">
                                    Sistema de gestión de recolectores
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    ...
                                </Typography>
                            </CardContent>
                        </div>
                        <CardMedia
                            className={classes.cover}
                            image={`http://www.emaseo.gob.ec/wp-content/uploads/2016/07/camion.jpg`}
                            title="Opt2"
                        />
                    </Card>
                </Link>
            </Grid>
        </div>
    )
}
export default OptionSection;