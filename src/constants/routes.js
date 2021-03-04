const publicRoutes = {
    LOGIN: "/login",
    // REGISTER: "/registro",

    CAMIONES: "/camiones",
    NEIGHBORHOODS: "/barrios",
    NEIGHBORHOODS_ID: "/barrios/:id",
    ABOUT: "/about",
    PRIVACY: "/privacy"
};

const privateRoutes = {
    HOME: "/",
    USERS: "/usuarios",
     USERS_ID: `/usuario/:id`,
    // ARTICLE_ID: "/articulo/:id",
};

const Routes = {
    ...publicRoutes,
    ...privateRoutes,
};

export default Routes;