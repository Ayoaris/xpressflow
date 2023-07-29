import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useNavigate,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import "./index.css";
import SignUp2 from "./pages/SignUp2/SignUp2";
import Dashboard from "./pages/Dashboard/Dashboard";
// import React from "react";
import { secretKey, decryptToken } from "./utils";
import RouteGuard from "./route/RouteGuard";
import { useEffect } from "react";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up2" element={<SignUp2 />} />
          <Route
            path="/dashboard"
            element={<RouteGuard component={Dashboard} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
