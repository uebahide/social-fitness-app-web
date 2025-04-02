import { type RouteConfig, index, route, prefix, layout } from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    route("/", "./routes/home.tsx"),
    route("auth/login", "./routes/auth/login.tsx"),
    route("auth/register", "./routes/auth/register.tsx"),
    route("post/create", "./routes/post/createPost.tsx"),
    route("post/show/:post_id", "./routes/post/showPost.tsx"),
    route("post/edit/:post_id", "./routes/post/editPost.tsx"),

    ...prefix("friend", [
      layout("./routes/friend/layout.tsx", [
        route("index", "./routes/friend/index.tsx"),
        route("find", "./routes/friend/find.tsx"),
        route("requests", "./routes/friend/requests.tsx"),
      ]),
    ]),

    ...prefix("user", [route("show/:user_id", "./routes/user/show.tsx")]),
  ]),
] satisfies RouteConfig;
