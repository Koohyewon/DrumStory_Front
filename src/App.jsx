import { useState } from "react";
import "./App.css";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

function App() {
  const isAdmin = window.location.pathname.startsWith("/admin");

  return isAdmin ? <AdminRoutes /> : <UserRoutes />;
}

export default App;
