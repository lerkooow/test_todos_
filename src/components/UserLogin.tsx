import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#180C0C",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#180C0C",
    },
  },
});

const CssFormControl = styled(FormControl)({
  "& label.Mui-focused": {
    color: "#180C0C",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#180C0C",
    },
  },
});

interface UserLoginProps {
  onLogin: () => void;
}

function UserLogin({ onLogin }: UserLoginProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleLogin = () => {
    if (login === "admin" && password === "admin") {
      localStorage.setItem("isAuthorization", "true");
      onLogin();
      navigate("/");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
      onKeyDown={handleKeyPress}
    >
      <Box
        sx={{
          maxWidth: "500px",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h1"
          sx={{ textAlign: "center", marginBottom: "24px", fontWeight: 700, fontSize: "60px", color: "#180C0C" }}
        >
          Вход
        </Typography>
        <CssTextField
          label="Логин"
          fullWidth
          margin="normal"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <CssFormControl variant="outlined" fullWidth margin="normal">
          <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            }
            label="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CssFormControl>
        <Button
          variant="contained"
          fullWidth
          sx={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#180C0C",
            "&:hover": {
              backgroundColor: "#474646",
            },
          }}
          onClick={handleLogin}
        >
          Войти
        </Button>
        <Typography sx={{ textAlign: "center", mt: "12px", color: "#ED413E" }}>{error}</Typography>
      </Box>
    </Box>
  );
}

export default UserLogin;
