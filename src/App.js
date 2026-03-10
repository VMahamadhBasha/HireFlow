import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Pages/Landing/LandingPage";
import PostJobForm from "./Pages/Employer/PostJobForm";
import EmployerApplicationsPage from "./Pages/Employer/EmployerAplication";

import InterviewSchedulePage from "./Pages/Recreuiter/InterviewSchedule";
import JobSeekerPage from "./Pages/JobSeekerPage/JobSeekerPage";
import RecruiterDashboard from "./Pages/Recreuiter/RecruiterDashboard";

function App() {

  const [role, setRole] = useState(
    localStorage.getItem("role") || ""
  );

  function handleLogout() {
    localStorage.removeItem("role");
    setRole("");
  }

  return (
    <BrowserRouter>

      <Navbar role={role} onLogout={handleLogout} />

      <Routes>

        {/* landing page */}
        <Route
          path="/"
          element={
            role === ""
              ? <LandingPage setRole={setRole} />
              : role === "employer"
              ? <Navigate to="/post-job" />
              : role === "recruiter"
              ? <Navigate to="/dashboard" />
              : <Navigate to="/jobs" />
          }
        />

        {/* job seeker pages */}
        <Route path="/jobs" element={<JobSeekerPage/>} />

        {/* employer pages */}
        <Route path="/post-job" element={<PostJobForm />} />
        <Route path="/applications" element={<EmployerApplicationsPage />} />

        {/* recruiter pages */}
        <Route path="/dashboard" element={<RecruiterDashboard/>} />
        <Route path="/schedule-interview" element={<InterviewSchedulePage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
