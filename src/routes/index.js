// Page
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import DetailPost from "../pages/DetailPost";
import BookMark from "../pages/Bookmark";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import ProfileSetup from "../pages/Auth/ProfileSetup";

// Layout
import LayoutAuth from "../components/layouts/LayoutAuth";

export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/profile/:id",
    component: Profile,
  },
  {
    path: "/detail-post/:id",
    component: DetailPost,
  },
  {
    path: "/bookmarks",
    component: BookMark,
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
  {
    path: "/profile-setup",
    component: ProfileSetup,
    layout: LayoutAuth,
  },
];
