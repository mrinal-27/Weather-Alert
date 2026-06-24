import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Status from "./pages/Status";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/Adminlogin";
import TelegramConnect from "./pages/TelegramConnect";
import RequestAccess from "./pages/RequestAccess";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ProtectedUserRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Login */}
        <Route path="/" element={<Login />} />

        {/* Approval Status */}
        <Route path="/status" element={<Status />} />
        <Route
  path="/request-access"
  element={<RequestAccess />}
/>

        {/* Telegram Bot Access */}
        <Route
          path="/telegram"
          element={
            <ProtectedUserRoute>
              <TelegramConnect />
            </ProtectedUserRoute>
          }
        />

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        />

        {/* Redirect /admin to login */}
        <Route
          path="/admin"
          element={<Navigate to="/admin/login" replace />}
        />

        {/* Catch all invalid URLs */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;