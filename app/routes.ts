import { type RouteConfig, index, route, prefix, layout } from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    route("/", "./routes/home.tsx"),
    route("auth/login", "./routes/auth/login.tsx"),
    route("auth/register", "./routes/auth/register.tsx"),
    route("post/create", "./routes/post/createPost.tsx"),
    route("post/show/:post_id", "./routes/post/showPost.tsx"),
    route("post/edit/:post_id", "./routes/post/editPost.tsx"),
  ]),
] satisfies RouteConfig;
