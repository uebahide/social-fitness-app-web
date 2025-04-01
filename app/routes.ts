import { type RouteConfig, index, route, prefix, layout } from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    route("/", "./routes/home.tsx"),
    route("auth/login", "./routes/auth/login.tsx"),
    route("auth/register", "./routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;
