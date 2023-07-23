import { Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Input(props) {
  const {
    name,
    label,
    type,
    value,
    half,
    autoFocus,
    required,
    handleChange,
    handleShowPassword,
  } = props;

  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        required={required}
        name={name}
        label={label}
        value={value}
        autoFocus={autoFocus}
        variant="outlined"
        type={type}
        fullWidth
        onChange={handleChange}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
}

export default Input;
