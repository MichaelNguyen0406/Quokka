import Home from "../pages/Home";
import Profile from "../pages/Profile";
import DetailPost from "../pages/DetailPost";

export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/detail-post",
    component: DetailPost,
  },
];
