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
    },
    grow: {
        flexGrow: 1,
    },
    logo: {
        display: "none",
        padding: 8,
        maxHeight: 64,
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
        "& a img": {
            maxHeight: 45,
        },
    },
}))

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.grow}>
            <footer className={classes.footer}>
                <Container>
                    <Box className={classes.logo}>
                        <Link href={Routes.HOME} passHref>
                            <MuiLink>
                                <img src="" alt=""/>
                            </MuiLink>
                        </Link>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography align="center">Acerca de</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography align="center">Privacidad</Typography>
                        </Grid>
                    </Grid>
                    <div className={classes.grow}>
                        <Typography variant="body2" align="center">
                            Copyright ©
                            <Link href="/"> TimeToClean</Link>
                            {new Date().getFullYear()}
                        </Typography>
                    </div>
                </Container>
            </footer>
        </div>
    );
}