import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDevice } from "../utils/useDevice";

import AdminMainDesk from "../pages/admin/Desktop/AdminMainDesk";
import ChangeAdminInfoDesk from "../pages/admin/Desktop/ChangeAdminInfoDesk";
import AddUserDesk from "../pages/admin/Desktop/AddUserDesk";
import UserManagementDesk from "../pages/admin/Desktop/UserManagementDesk";
import EditUserDesk from "../pages/admin/Desktop/EditUserDesk";
import ReservationManagement from "../pages/admin/Desktop/ReservationManagement";

export default function AdminRoutes() {
  const device = useDevice();

  return (
    <Routes>
      {/* <Route
        path="admin-main"
        element={
          device === "mobile" ? <AdminDashboardMobile /> : <AdminMainDesk />
        }
      /> */}

      <Route path="/" element={<AdminMainDesk />} />
      <Route path="/change-admin-info" element={<ChangeAdminInfoDesk />} />
      <Route path="/add-user" element={<AddUserDesk />} />
      <Route path="/user-management" element={<UserManagementDesk />} />
      <Route path="/edit-user" element={<EditUserDesk />} />
      <Route
        path="/reservation-management"
        element={<ReservationManagement />}
      />
    </Routes>
  );
}
