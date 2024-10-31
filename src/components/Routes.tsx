import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Todo from "./Todo/Todo";
import UserLogin from "./UserLogin";

function AppRoutes() {
  const [isAuthorization, setIsAuthorization] = useState(localStorage.getItem("isAuthorization") === "true");

  useEffect(() => {
    setIsAuthorization(localStorage.getItem("isAuthorization") === "true");
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAuthorization", "true");
    setIsAuthorization(true);
  };

  return (
    <Routes>
      <Route path="/" element={isAuthorization ? <Todo /> : <Navigate to="/login" />} />
      <Route path="/login" element={<UserLogin onLogin={handleLogin} />} />
    </Routes>
  );
}

export default AppRoutes;
