import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

// eslint-disable-next-line react/prop-types
function CardForm({ children, handleSubmit }) {
  return (
    <Card sx={{ width: 470, textAlign: "center", padding: 6 }}>
      <Box component="form" onSubmit={handleSubmit}>
        {children}
      </Box>
    </Card>
  );
}

export default CardForm;
