import Home from "../pages/Home";
import Profile from "../pages/Profile";
import DetailPost from "../pages/DetailPost";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import LayoutAuth from "../components/layouts/LayoutAuth";

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
  {
    path: "/login",
    component: SignIn,
    layout: LayoutAuth,
  },
  {
    path: "/sign-up",
    component: SignUp,
    layout: LayoutAuth,
  },
];
