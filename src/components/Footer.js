import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import Routes from "../constants/routes";
import {Box, Link as MuiLink} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: "#262626",
        color: "#FFFFFF",
        alignItems: "center",
        padding: "40px",
    },
    logo: {
        padding: 8,
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
        "& a img": {
            maxHeight: 55,
        },
    },
}))

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.grow}>
            <footer className={classes.footer}>
                <Container>
                    <Box className={classes.logo} align="center">
                        <Link href={Routes.HOME} passHref>
                            <MuiLink>
                                <Image src="/logo-claro.png" alt="" width={250} height={100}/>
                            </MuiLink>
                        </Link>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Link href={Routes.ABOUT} passHref>
                                <Typography align="center">Acerca de</Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Link href={Routes.PRIVACY} passHref>
                                <Typography align="center">Privacidad</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                    <div className={classes.grow}>
                        <Typography variant="body2" align="center">
                            Copyright ©
                            <Link href="/"> TimeToClean {new Date().getFullYear()}</Link>
                        </Typography>
                    </div>
                </Container>
            </footer>
        </div>
    );
}