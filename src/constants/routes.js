const publicRoutes = {
    LOGIN: "/login",
    // REGISTER: "/registro",
    // USERS: "/usuarios",
    // USERS_ID: `/usuario/:id`,
    NEIGHBORHOODS: "/neighborhoods",
    NEIGHBORHOODS_ID: "/neighborhoods/:id",
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