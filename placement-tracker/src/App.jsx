import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Coding from "./pages/Coding";
import Aptitude from "./pages/Aptitude";
import Resume from "./pages/Resume";
import Analytics from "./pages/Analytics";
import CompanyPreparation from "./pages/CompanyPreparation";
import CompanyPDFs from "./pages/CompanyPDFs";

import ProtectedRoute from "./components/ProtectedRoute";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import StudentProfile from "./pages/StudentProfile";



function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/coding"
        element={
          <ProtectedRoute>
            <Coding />
          </ProtectedRoute>
        }
      />

      <Route
        path="/aptitude"
        element={
          <ProtectedRoute>
            <Aptitude />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <Resume />
          </ProtectedRoute>
        }
      />

      <Route
        path="/company"
        element={<CompanyPreparation />}
      />

      <Route
  path="/company"
  element={
    <ProtectedRoute>
      <CompanyPreparation />
    </ProtectedRoute>
  }
/>

<Route
  path="/company/:company"
  element={
    <ProtectedRoute>
      <CompanyPDFs />
    </ProtectedRoute>
  }
/>

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
  path="/resume-ai"
  element={<ResumeAnalyzer />}
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <StudentProfile />
    </ProtectedRoute>
  }
/>
  
    </Routes>
  );
}

export default App;