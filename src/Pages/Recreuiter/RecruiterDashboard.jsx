import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RecruiterDashboard.css";

function RecruiterDashboard() {

  // holds all applications
  const [applications, setApplications] = useState([]);

  // used to go to schedule page
  const navigate = useNavigate();

  // when page loads read applications from localStorage
  useEffect(() => {

    const savedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );

    // if no applications use dummy data
    if (savedApplications.length === 0) {

      const dummyApplications = [
  {
    id: "1",
    jobId: "1",
    candidateName: "Sathish Kumar",
    email: "sathish@gmail.com",
    phone: "9876543210",
    skills: "React, Node.js",
    experience: "2 years",
    appliedDate: "2025-01-12",
    status: "Pending",
  },
  {
    id: "2",
    jobId: "1",
    candidateName: "Suresh Babu",
    email: "suresh@gmail.com",
    phone: "9123456780",
    skills: "Vue, Laravel",
    experience: "3 years",
    appliedDate: "2025-01-14",
    status: "Shortlisted",
  },
  {
    id: "3",
    jobId: "2",
    candidateName: "Ramu Naidu",
    email: "ramu@gmail.com",
    phone: "9988776655",
    skills: "Node.js, MongoDB",
    experience: "1 year",
    appliedDate: "2025-01-15",
    status: "Rejected",
  },
  {
    id: "4",
    jobId: "2",
    candidateName: "Kalyan Reddy",
    email: "kalyan@gmail.com",
    phone: "9876501234",
    skills: "Python, Django",
    experience: "4 years",
    appliedDate: "2025-01-16",
    status: "Interviewed",
  },
];


      localStorage.setItem(
        "applications",
        JSON.stringify(dummyApplications)
      );
      setApplications(dummyApplications);

    } else {
      setApplications(savedApplications);
    }

  }, []);

  // when recruiter changes status dropdown
  function handleStatusChange(id, newStatus) {

    // read all applications
    const saved = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );

    // update that application status
    const updated = saved.map((app) => {
      if (app.id === id) {
        return { ...app, status: newStatus };
      } else {
        return app;
      }
    });

    // save back to localStorage
    localStorage.setItem("applications", JSON.stringify(updated));

    // update screen
    setApplications(updated);

    console.log("Status updated:", id, "→", newStatus);
  }

  // when recruiter clicks Schedule Interview
  function handleSchedule(application) {

    // save selected application to localStorage
    localStorage.setItem(
      "selectedApplication",
      JSON.stringify(application)
    );

    // go to schedule page
    navigate("/schedule-interview");
  }

  // return css class based on status
  function getStatusClass(status) {
    if (status === "Shortlisted") return "status-shortlisted";
    if (status === "Rejected")    return "status-rejected";
    if (status === "Interviewed") return "status-interviewed";
    return "status-pending";
  }

  return (
    <div className="dashboard-wrapper">

      {/* header */}
      <div className="dashboard-header">
        <h2>Recruiter Dashboard</h2>
        <p>Manage all applications and schedule interviews.</p>
      </div>

      {/* total count */}
      <div className="dashboard-count">
        Total Applications: {applications.length}
      </div>

      {/* no applications message */}
      {applications.length === 0 ? (
        <p className="no-data">No applications found.</p>
      ) : (

        <div className="table-container">
          <table className="dashboard-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Candidate Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, index) => (
                <tr key={app.id}>

                  <td>{index + 1}</td>
                  <td className="candidate-name">{app.candidateName}</td>
                  <td>{app.email}</td>
                  <td>{app.phone}</td>
                  <td>{app.skills}</td>
                  <td>{app.experience}</td>
                  <td>{app.appliedDate}</td>

                  {/* status dropdown */}
                  <td>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interviewed">Interviewed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>

                  {/* schedule button */}
                  <td>
                    <button
                      className="schedule-btn"
                      onClick={() => handleSchedule(app)}
                    >
                      Schedule Interview
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}

export default RecruiterDashboard;