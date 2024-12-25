// Import React
import { createContext, useContext, useState, useEffect } from "react";

// Import React Router Dom
import { useNavigate } from "react-router-dom";

// Import Firebase Library
import { onAuthStateChanged } from "firebase/auth";

// Import Firebase Config
import { auth } from "../../firebase/config";
import { getDocumentById } from "../../firebase/service";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, InitializeUser);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const InitializeUser = async (user) => {
    if (user) {
      setCurrentUser(user);
      console.log(user.uid);

      const ud = await getDocumentById("users", user.uid);

      setUserDetail({ ...ud, id: user.uid });
      setUserLoggedIn(true);
      Navigate("/");
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      Navigate("/login");
    }
    setLoading(false);
  };

  const value = {
    currentUser,
    userDetail,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
