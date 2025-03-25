import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDevice } from "../utils/useDevice";

import MainDesk from "../pages/user/Desktop/MainDesk";

export default function UserRoutes() {
  const device = useDevice();

  return (
    <Routes>
      <Route
        path="/"
        element={device === "mobile" ? <UserHomeMobile /> : <MainDesk />}
      />
    </Routes>
  );
}
