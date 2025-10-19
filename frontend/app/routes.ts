import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route("login", "routes/login.tsx"),
    route("protected", "routes/protected.tsx"),

] satisfies RouteConfig;
