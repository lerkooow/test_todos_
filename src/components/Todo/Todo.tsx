import { Box, Button } from "@mui/material";
import TodoItem from "./TodoItem";
import { useNavigate } from "react-router-dom";

function Todo() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Button
        onClick={handleLogout}
        sx={{
          position: "absolute",
          top: "24px",
          right: "24px",
          color: "#ED413E",
          "&:hover": { color: "darkred" },
        }}
      >
        Выйти
      </Button>
      <TodoItem />
    </Box>
  );
}

export default Todo;
