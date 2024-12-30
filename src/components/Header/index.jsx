import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Header({ pageName, postCount = [] }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Box borderBottom="1px solid #ccc" padding="8px">
      <Box display="flex" alignItems="center">
        <Box sx={{ mr: "10px" }}>
          <IconButton onClick={handleClick}>
            <ArrowBackIcon />
          </IconButton>
        </Box>

        <Box textAlign="start">
          <Typography variant="h6" fontWeight="bold">
            {pageName}
          </Typography>
          {postCount.length > 0 && (
            <Typography sx={{ fontSize: "12px", color: "#555" }}>
              {postCount.length} posts
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
