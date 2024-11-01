import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  removeFromDeleted,
  selectAllTodo,
  selectDeletedTodo,
  toggleTodo,
} from "../../toolkitRedux/todoSlice";
import TodoAddTask from "./TodoAddTask";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState } from "react";
import { Box, Typography, Button, Checkbox } from "@mui/material";

function TodoItem() {
  const todo = useSelector(selectAllTodo);
  const deletedTodo = useSelector(selectDeletedTodo);
  console.log("🚀 ~ TodoItem ~ deletedTodo:", deletedTodo);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("all");

  const totalTodos = todo.length;
  const activeTodos = todo.filter((todo) => !todo.checked).length;
  const completedTodos = todo.filter((todo) => todo.checked).length;

  const filteredTodo =
    filter === "deleted"
      ? deletedTodo
      : todo.filter((todo) => {
          if (filter === "completed") return todo.checked;
          if (filter === "active") return !todo.checked;
          return true;
        });

  const contentToDisplay = (() => {
    if (filteredTodo.length === 0) {
      if (filter === "active") {
        return <Typography sx={{ color: "gray" }}>Нет текущих дел...</Typography>;
      } else if (filter === "completed") {
        return <Typography sx={{ color: "gray" }}>Нет выполненных дел...</Typography>;
      } else if (filter === "deleted") {
        return <Typography sx={{ color: "gray" }}>Корзина пуста...</Typography>;
      } else {
        return <Typography sx={{ color: "gray" }}>Нет дел...</Typography>;
      }
    } else {
      return filteredTodo.map((item) => (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }} key={item.id}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              borderRadius: "8px",
              textDecoration: item.checked ? "line-through" : "none",
            }}
          >
            <Checkbox
              checked={item.checked}
              onChange={() => dispatch(toggleTodo(item.id))}
              color="default"
              inputProps={{ "aria-label": item.task }}
              data-testid={`check-${item.id}`}
              sx={{ mr: 2 }}
              disabled={filter === "deleted"} // Отключить изменение статуса задач в корзине
            />
            <Typography
              variant="body1"
              sx={{ color: "gray", fontSize: "1.25rem", maxWidth: "500px", overflow: "hidden" }}
            >
              {item.task}
            </Typography>
          </Box>
          {filter === "deleted" ? (
            <Button
              data-testid={`remove-${item.id}`}
              onClick={() => dispatch(removeFromDeleted(item.id))}
              sx={{ color: "red", "&:hover": { color: "darkred" } }}
            >
              Удалить навсегда
            </Button>
          ) : (
            <Button
              data-testid={`delete-${item.id}`}
              onClick={() => dispatch(deleteTask(item.id))}
              sx={{ color: "red", "&:hover": { color: "darkred" } }}
            >
              <DeleteOutlinedIcon />
            </Button>
          )}
        </Box>
      ));
    }
  })();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "30px", maxWidth: "700px" }}>
      <TodoAddTask />
      <Box
        sx={{
          borderTop: "1px solid lightgray",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          textAlign: "center",
          alignItems: "center",
          boxShadow: 1,
        }}
      >
        <Box sx={{ p: "24px" }}>
          <Button
            onClick={() => setFilter("all")}
            sx={{
              fontWeight: filter === "all" ? "bold" : "normal",
              "&:hover": { textDecoration: "underline" },
              color: "#180C0C",
            }}
          >
            Все дела ({totalTodos})
          </Button>
          <Button
            onClick={() => setFilter("active")}
            sx={{
              fontWeight: filter === "active" ? "bold" : "normal",
              "&:hover": { textDecoration: "underline" },
              color: "#180C0C",
            }}
          >
            Текущие дела ({activeTodos})
          </Button>
          <Button
            onClick={() => setFilter("completed")}
            sx={{
              fontWeight: filter === "completed" ? "bold" : "normal",
              "&:hover": { textDecoration: "underline" },
              color: "#180C0C",
            }}
          >
            Выполненные дела ({completedTodos})
          </Button>
          <Button sx={{ color: "#ED413E", "&:hover": { color: "darkred" } }} onClick={() => setFilter("deleted")}>
            Корзина
          </Button>
        </Box>
        <Box
          sx={{
            p: "0 24px 24px 24px",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "700px",
            height: "400px",
            overflow: "auto",
          }}
        >
          {contentToDisplay}
        </Box>
      </Box>
    </Box>
  );
}

export default TodoItem;
