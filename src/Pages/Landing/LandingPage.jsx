import "./LandingPage.css";

function LandingPage({ setRole }) {

  // when user clicks a role
  function handleRoleSelect(selectedRole) {

    // save role to localStorage
    localStorage.setItem("role", selectedRole);

    // update App.js state
    setRole(selectedRole);
  }

  return (
    <div className="landing-wrapper">

      <div className="landing-card">

        {/* header */}
        <h1 className="landing-title">Welcome to HireMe</h1>
        <p className="landing-subtitle">
          Select your role to continue
        </p>

        {/* role cards */}
        <div className="role-cards">

          {/* job seeker */}
          <div
            className="role-card"
            onClick={() => handleRoleSelect("jobseeker")}
          >
            <div className="role-icon">👤</div>
            <h3>Job Seeker</h3>
            <p>Browse and apply for jobs</p>
          </div>

          {/* employer */}
          <div
            className="role-card"
            onClick={() => handleRoleSelect("employer")}
          >
            <div className="role-icon">🏢</div>
            <h3>Employer</h3>
            <p>Post jobs and manage applications</p>
          </div>

          {/* recruiter */}
          <div
            className="role-card"
            onClick={() => handleRoleSelect("recruiter")}
          >
            <div className="role-icon">🎯</div>
            <h3>Recruiter</h3>
            <p>Manage pipeline and schedule interviews</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default LandingPage;