// Import React
import { createContext, useContext, useState, useEffect } from "react";

// MUI
import CircularProgress from "@mui/material/CircularProgress";

// Import React Router Dom
import { useNavigate } from "react-router-dom";

// Import Firebase Library
import { onAuthStateChanged } from "firebase/auth";

// Import Firebase Config
import { auth } from "../../firebase/config";
import { getDocumentById } from "../../firebase/service";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const ud = await getDocumentById("users", user.uid);
          setCurrentUser(user);
          setUserDetail({ ...ud, id: user.uid });
          setUserLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!loading) {
      if (userLoggedIn) {
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [userLoggedIn]);

  const value = {
    currentUser,
    userDetail,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
