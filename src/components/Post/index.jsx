import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SyncIcon from "@mui/icons-material/Sync";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AddIcon from "@mui/icons-material/Add";
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },

  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
];

export default function Post() {
  return (
    <Box
      padding="1rem"
      sx={{
        display: "flex",
        "&:hover": {
          backgroundColor: "#eee",
        },
      }}
    >
      <Box sx={{ pr: 1 }}>
        <AccountCircleIcon sx={{ fontSize: 45 }} />
      </Box>
      <Box flexGrow="1">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
            <Typography sx={{ fontSize: "15px", mr: "6px", fontWeight: 600 }}>
              Nguyen Truong An
            </Typography>
            <Typography sx={{ fontSize: "15px", mr: "6px", color: "#555" }}>
              @michael
            </Typography>
            <Typography sx={{ fontSize: "15px", mr: "6px", color: "#555" }}>
              . 2 minutes ago
            </Typography>
          </Box>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "15px",
              color: "#555",
              mb: 2,
              textAlign: "start",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Ipsum has been the industry&apos;s standard dummy text
            ever since the
          </Typography>
        </Box>
        <Box sx={{ borderRadius: "10px", overflow: "hidden" }}>
          <ImageList>
            {itemData.slice(0, 3).map((item, index) => (
              <ImageListItem key={index}>
                <img
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
            {itemData.slice(3, 4).map((item, index) => (
              <ImageListItem key={index}>
                <img
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
            {itemData.length > 4 && (
              <Box>
                <AddIcon />
              </Box>
            )}
          </ImageList>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            mt: ".8rem",
          }}
        >
          <IconButton size="small">
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <SyncIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
          <IconButton size="small">
            <IosShareIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
