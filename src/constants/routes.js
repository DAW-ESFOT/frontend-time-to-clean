const publicRoutes = {
  LOGIN: "/login",
  NEIGHBORHOODS: "/barrios",
  NEIGHBORHOODS_ID: "/barrios/:id",
  ABOUT: "/about",
  PRIVACY: "/privacy",

};

const privateRoutes = {
  HOME: "/",
    REGISTER: "/registro",
    USERS: "/usuarios",
    USERS_ID: `/usuario/:id`,
    MANAGEMENT: "/gestion",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};

export default Routes;
