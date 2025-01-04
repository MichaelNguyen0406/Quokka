// Import React
import { createContext, useContext, useState, useEffect } from "react";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Import React Router Dom
import { useNavigate } from "react-router-dom";

// Import Firebase Library
import { onAuthStateChanged } from "firebase/auth";

// Import Firebase Config
import { auth, db } from "../../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { getDocumentById } from "../../firebase/service";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const unsubscribeDoc = onSnapshot(docRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const newUser = { id: docSnapshot.id, ...docSnapshot.data() };
            setUserDetail(newUser); // Cập nhật userDetail
            setUserLoggedIn(true);
            setLoading(false);
          } else {
            console.error("Document does not exist");
            setLoading(false);
          }
        });

        // Clean up listener when unmount
        return () => unsubscribeDoc();
      } else {
        setUserLoggedIn(false);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!loading) {
      if (userLoggedIn) {
        if (userDetail?.newUser) {
          navigate("/profile-setup", { replace: true });
        } else {
          if (
            location.pathname === "/login" ||
            location.pathname === "/sign-up"
          ) {
            navigate("/", { replace: true });
          }
        }
      } else if (
        location.pathname != "/login" &&
        location.pathname != "/sign-up"
      ) {
        navigate("/login", { replace: true });
      }
    }
  }, [loading, navigate, userLoggedIn]);

  const value = {
    userDetail,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box>
            <img
              style={{
                width: "100px",
                height: "auto",
              }}
              src="https://res.cloudinary.com/dohadwixt/image/upload/v1735587953/aOHHsQACSf645PnYWA2AeQ_dg4lpg-removebg-preview_2_vmhuxh.png"
            />
          </Box>
          <Typography
            sx={{
              background:
                "linear-gradient(147deg, rgba(253,253,253,1) 0%, rgba(23,97,255,1) 31%, rgba(203,46,230,1) 61%, rgba(166,166,166,1) 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
            fontWeight="bold"
            variant="h3"
          >
            Quokka
          </Typography>
          <Typography sx={{ fontWeight: "bold", color: "#999", mt: 2 }}>
            © [NGUYEN TRUONG AN / Q2A] [2024]. All rights reserved.
          </Typography>
        </Box>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
