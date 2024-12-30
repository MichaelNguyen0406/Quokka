// Import React
import { createContext, useContext, useState, useEffect } from "react";

// MUI
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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
          await getDocumentById("users", user.uid, (data) =>
            setUserDetail(data)
          );
          setCurrentUser(user);
          setUserLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setLoading(false);
      }
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
  }, [userLoggedIn, loading]);

  const value = {
    currentUser,
    userDetail,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Box sx={{ mt: "100px", textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
