import { useState, useEffect } from "react";
import "./EmployerAplication.css";

function EmployerAplication() {

  const [jobs, setJobs] = useState([]);

  // holds all applications received
  const [applications, setApplications] = useState([]);

  // when page loads read data from localStorage
  useEffect(() => {

    // read jobs from localStorage
    const savedJobs = JSON.parse(
      localStorage.getItem("jobs") || "[]"
    );
    setJobs(savedJobs);

    // read applications from localStorage
    const savedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );

    // if no applications use dummy data
    if (savedApplications.length === 0) {

     const dummyApplications = [
  {
    id: "1",
    jobId: savedJobs[0]?.id || "1",
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
    jobId: savedJobs[0]?.id || "1",
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
    jobId: savedJobs[1]?.id || "2",
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
    jobId: savedJobs[1]?.id || "2",
    candidateName: "Kalyan Reddy",
    email: "kalyan@gmail.com",
    phone: "9876501234",
    skills: "Python, Django",
    experience: "4 years",
    appliedDate: "2025-01-16",
    status: "Interviewed",
  },
];
      // save dummy data to localStorage
      localStorage.setItem(
        "applications",
        JSON.stringify(dummyApplications)
      );
      setApplications(dummyApplications);

    } else {
      setApplications(savedApplications);
    }

  }, []);

  // find job title by jobId
  function getJobTitle(jobId) {
    const job = jobs.find((j) => j.id === jobId);
    return job ? job.jobTitle : "General Application";
  }

  // return css class based on status
  function getStatusClass(status) {
    if (status === "Shortlisted") return "status-shortlisted";
    if (status === "Rejected")    return "status-rejected";
    if (status === "Interviewed") return "status-interviewed";
    return "status-pending";
  }

  return (
    <div className="applications-wrapper">

      {/* page header */}
      <div className="applications-header">
        <h2>Employer Applications</h2>
        <p>View all candidates who applied to your job postings.</p>
      </div>

      {/* total count */}
      <div className="applications-count">
        Total Applications: {applications.length}
      </div>

      {/* no applications message */}
      {applications.length === 0 ? (
        <p className="no-data">No applications received yet.</p>
      ) : (

        /* applications table */
        <div className="table-container">
          <table className="applications-table">

            <thead>
              <tr>
                <th>#</th>
                <th>Candidate Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Job Applied For</th>
                <th>Applied Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app, index) => (
                <tr key={app.id}>

                  {/* serial number */}
                  <td>{index + 1}</td>

                  {/* candidate details */}
                  <td className="candidate-name">{app.candidateName}</td>
                  <td>{app.email}</td>
                  <td>{app.phone}</td>
                  <td>{app.skills}</td>
                  <td>{app.experience}</td>

                  {/* job title from jobs array */}
                  <td className="job-title">{getJobTitle(app.jobId)}</td>

                  {/* applied date */}
                  <td>{app.appliedDate}</td>

                  {/* status badge */}
                  <td>
                    <span className={`status-badge ${getStatusClass(app.status)}`}>
                      {app.status}
                    </span>
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

export default EmployerAplication;