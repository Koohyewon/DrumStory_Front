import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDevice } from "../utils/useDevice";

import AdminMainDesk from "../pages/admin/Desktop/AdminMainDesk";
import ChangeAdminInfoDesk from "../pages/admin/Desktop/ChangeAdminInfoDesk";
import AddUserDesk from "../pages/admin/Desktop/AddUserDesk";

export default function AdminRoutes() {
  const device = useDevice();

  return (
    <Router>
      <Routes>
        <Route
          path="/admin/admin-main"
          element={
            device === "mobile" ? <AdminDashboardMobile /> : <AdminMainDesk />
          }
        />

        <Route
          path="/admin/change-admin-info"
          element={
            device === "mobile" ? (
              <AdminDashboardMobile />
            ) : (
              <ChangeAdminInfoDesk />
            )
          }
        />

        <Route
          path="/admin/add-user"
          element={
            device === "mobile" ? <AdminDashboardMobile /> : <AddUserDesk />
          }
        />
      </Routes>
    </Router>
  );
}
