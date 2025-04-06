import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDevice } from "../utils/useDevice";

import MainDesk from "../pages/user/Desktop/MainDesk";
import CalendarScheduleDesk from "../pages/user/Desktop/CalendarScheduleDesk";
import NoCheckInDesk from "../pages/user/Desktop/alert-page/NoCheckInDesk";
import CheckOutCompleteDesk from "../pages/user/Desktop/alert-page/CheckOutCompleteDesk";
import ReservationConfirmDesk from "../pages/user/Desktop/alert-page/ReservationConfirmDesk";
import ReservationSuccessDesk from "../pages/user/Desktop/alert-page/ReservationSuccessDesk";
import RoomAvailable from "../pages/user/Desktop/RoomAvailable";

export default function UserRoutes() {
  const device = useDevice();

  return (
    <Routes>
      {/* <Route
        path="/"
        element={device === "mobile" ? <UserHomeMobile /> : <MainDesk />}
      /> */}
      <Route path="/" element={<MainDesk />} />
      <Route path="/timetable" element={<CalendarScheduleDesk />} />
      <Route path="/no-checkin" element={<NoCheckInDesk />} />
      <Route path="/checkout" element={<CheckOutCompleteDesk />} />
      <Route path="/reservation" element={<ReservationConfirmDesk />} />
      <Route path="/reservation-success" element={<ReservationSuccessDesk />} />
      <Route path="/room" element={<RoomAvailable />} />
    </Routes>
  );
}
