import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// eslint-disable-next-line react/prop-types
function InputCheckBox({ handleChange, value, label, name = "isAgreed" }) {
  return (
    <FormControlLabel
      control={
        <Checkbox defaultChecked={value} onChange={handleChange} name={name} />
      }
      label={label}
    />
  );
}

export default InputCheckBox;
