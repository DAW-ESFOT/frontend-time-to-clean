const publicRoutes = {
    LOGIN: "/login",
    // REGISTER: "/registro",
    // USERS: "/usuarios",
    // USERS_ID: `/usuario/:id`,
    CAMIONES: "/camiones",
    NEIGHBORHOODS: "/barrios",
    NEIGHBORHOODS_ID: "/barrios/:id",
    ABOUT: "/about",
    PRIVACY: "/privacy"
};

const privateRoutes = {
    HOME: "/",
    // ARTICLE_ID: "/articulo/:id",
};

const Routes = {
    ...publicRoutes,
    ...privateRoutes,
};

export default Routes;