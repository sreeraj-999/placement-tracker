import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Coding from "./pages/Coding";
import Aptitude from "./pages/Aptitude";
import Resume from "./pages/Resume";
import Analytics from "./pages/Analytics";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminLayout from "./components/AdminLayout";

import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import StudentProfile from "./pages/StudentProfile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import StudentDetails from "./pages/admin/StudentDetails";
import AdminAptitude from "./pages/admin/AdminAptitude";
import CompanyPreparation from "./pages/CompanyPreparation";
import CompanyPDFs from "./pages/CompanyPDFs";
import AdminCompanies from "./pages/admin/AdminCompanies";

function App() {
  return (
    <Routes>

      {/* STUDENT ROUTES */}

      <Route path="/" element={<Login />} />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

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
        path="/resume-ai"
        element={
          <ProtectedRoute>
            <ResumeAnalyzer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <StudentProfile />
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


      {/* ========================= */}
      {/* ADMIN ROUTES */}
      {/* ========================= */}

      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/students"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <Students />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/students/:id"
        element={
          <AdminProtectedRoute>
            <AdminLayout>
              <StudentDetails />
            </AdminLayout>
          </AdminProtectedRoute>
        }
      />

      {/* PLACEHOLDERS FOR NEXT ADMIN PAGES */}

<Route
  path="/admin/aptitude"
  element={
    <AdminProtectedRoute>
      <AdminLayout>
        <AdminAptitude />
      </AdminLayout>
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin/companies"
  element={
    <AdminProtectedRoute>
      <AdminLayout>
        <AdminCompanies />
      </AdminLayout>
    </AdminProtectedRoute>
  }
/>


    </Routes>
  );
}

export default App;