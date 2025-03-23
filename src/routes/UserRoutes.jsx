import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDevice } from "../utils/useDevice";

export default function UserRoutes() {
  const device = useDevice();

  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={
            device === "mobile" ? <UserHomeMobile /> : <UserHomeDesktop />
          }
        />        
        <Route
          path="/profile"
          element={
            device === "mobile" ? <UserProfileMobile /> : <UserProfileDesktop />
          }
        /> */}
      </Routes>
    </Router>
  );
}
