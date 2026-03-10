import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ role, onLogout }) {

  const navigate = useNavigate();

  function handleLogout() {
    onLogout();           // clears role in App.js
    navigate("/");        // redirects to landing page
  }

  return (
    <nav className="navbar">

      {/* brand name */}
      <div className="navbar-brand">
        HireMe
      </div>

      {/* links based on role */}
      <div className="navbar-links">

        {/* employer links */}
        {role === "employer" && (
          <>
            <Link to="/post-job">Post Job</Link>
            <Link to="/applications">Applications</Link>
          </>
        )}

        {/* recruiter links */}
        {role === "recruiter" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/schedule-interview">Schedule Interview</Link>
          </>
        )}

        {/* jobseeker links */}
        {role === "jobseeker" && (
          <>
            <Link to="/jobs">Browse Jobs</Link>
          </>
        )}

      </div>

      {/* logout button */}
      {role !== "" && (
        <div className="navbar-right">
          <span className="navbar-role">{role}</span>
          <button
            className="logout-btn"
            onClick={handleLogout}  
          >
            Logout
          </button>
        </div>
      )}

    </nav>
  );
}

export default Navbar;