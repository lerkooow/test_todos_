import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, clearAll } from "../../toolkitRedux/todoSlice";
import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { TextField, Button, Box, Typography } from "@mui/material";

function TodoAddTask() {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (task) {
      dispatch(addTodo(task));
      setTask("");
    }
  };

  const handleDeleteTodo = () => {
    dispatch(clearAll());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        p: "32px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: 1,
      }}
    >
      <Button
        onClick={handleAddTodo}
        variant="contained"
        sx={{
          backgroundColor: "#180C0C",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: { xs: "10px 0", sm: "10px 40px" },
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        <AddIcon style={{ color: "white" }} />
        <Typography sx={{ display: { xs: "none", sm: "inline" } }}>Добавить</Typography>
      </Button>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Пополните список дел"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#180C0C",
          },
          ".MuiOutlinedInput-input": {
            p: "11px 14px",
          },
        }}
      />
      <Button
        onClick={handleDeleteTodo}
        variant="contained"
        sx={{
          backgroundColor: "#ED413E",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: { xs: "10px 0", sm: "10px 40px" },
          "&:hover": {
            backgroundColor: "#d63531",
          },
        }}
      >
        <Typography sx={{ display: { xs: "none", sm: "inline" } }}>Очистить</Typography>
        <ClearAllIcon style={{ color: "white" }} />
      </Button>
    </Box>
  );
}

export default TodoAddTask;
