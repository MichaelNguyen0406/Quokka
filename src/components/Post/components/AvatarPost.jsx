import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function AvatarPost({ photoURL, userId }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/profile/${userId}`);
  };

  return (
    <Box sx={{ pr: 1 }}>
      <IconButton onClick={handleClick}>
        <Avatar src={photoURL && photoURL} />
      </IconButton>
    </Box>
  );
}

export default AvatarPost;
