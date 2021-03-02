
const publicRoutes = {
    LOGIN: "/login",
    REGISTER: "/registro",
    NEIGHBORHOODS: "/neighborhoods",
    NEIGHBORHOODS_ID: "/neighborhoods/:id",
    ABOUT: "/about",
};

const privateRoutes = {
    HOME: "/",
};

const Routes = {
    ...publicRoutes,
    ...privateRoutes,
};
export default Routes;