import { useState } from "react";
import ApplyJobForm from "./ApplyJobForm";
import "./JobSeekerPage.css";

function JobSeekerPage() {

  const dummyJobs = [
    {
      id: "1",
      companyName: "Google",
      jobTitle: "Frontend Developer",
      jobType: "Full-Time",
      location: "New York",
      experience: "2+ years",
      skills: "React, CSS, JavaScript",
      minSalary: "80000",
      maxSalary: "120000",
      deadline: "2025-03-01",
      status: "Active",
    },
    {
      id: "2",
      companyName: "Amazon",
      jobTitle: "Backend Developer",
      jobType: "Full-Time",
      location: "Remote",
      experience: "3+ years",
      skills: "Node.js, MongoDB, Express",
      minSalary: "90000",
      maxSalary: "130000",
      deadline: "2025-03-10",
      status: "Active",
    },
    {
      id: "3",
      companyName: "Microsoft",
      jobTitle: "React Developer",
      jobType: "Contract",
      location: "Seattle",
      experience: "1+ years",
      skills: "React, TypeScript",
      minSalary: "70000",
      maxSalary: "100000",
      deadline: "2025-03-15",
      status: "Active",
    },
    {
      id: "4",
      companyName: "Infosys",
      jobTitle: "Full Stack Developer",
      jobType: "Full-Time",
      location: "Bangalore",
      experience: "2+ years",
      skills: "React, Node.js, MySQL",
      minSalary: "60000",
      maxSalary: "90000",
      deadline: "2025-03-20",
      status: "Active",
    },
    {
      id: "5",
      companyName: "Wipro",
      jobTitle: "UI Developer",
      jobType: "Internship",
      location: "Remote",
      experience: "Fresher",
      skills: "HTML, CSS, JavaScript",
      minSalary: "20000",
      maxSalary: "40000",
      deadline: "2025-03-25",
      status: "Active",
    },
    {
      id: "6",
      companyName: "TCS",
      jobTitle: "Python Developer",
      jobType: "Full-Time",
      location: "Hyderabad",
      experience: "2+ years",
      skills: "Python, Django, REST API",
      minSalary: "50000",
      maxSalary: "80000",
      deadline: "2025-04-01",
      status: "Active",
    },
  ];

  // search input
  const [search, setSearch] = useState("");

  // selected job when apply clicked
  const [selectedJob, setSelectedJob] = useState(null);

  // filter jobs based on search
  const filteredJobs = dummyJobs.filter((job) => {
    const searchLower = search.toLowerCase();
    return (
      job.jobTitle.toLowerCase().includes(searchLower) ||
      job.companyName.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower) ||
      job.skills.toLowerCase().includes(searchLower) ||
      job.jobType.toLowerCase().includes(searchLower)
    );
  });

  // when apply button clicked
  function handleApply(job) {
    setSelectedJob(job);
    window.scrollTo(0, 0); // scroll to top
  }

  // when form closed
  function handleClose() {
    setSelectedJob(null);
  }

  // if job selected show apply form
  if (selectedJob) {
    return (
      <ApplyJobForm
        job={selectedJob}
        onClose={handleClose}
      />
    );
  }

  return (
    <div className="jobseeker-wrapper">

      {/* header */}
      <div className="jobseeker-header">
        <h2>Find Your Dream Job</h2>
        <p>Browse through hundreds of job listings.</p>
      </div>

      {/* search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by job title, company, location or skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="clear-btn"
            onClick={() => setSearch("")}
          >
            ✕
          </button>
        )}
      </div>

      {/* results count */}
      <p className="results-count">
        {filteredJobs.length} jobs found
      </p>

      {/* no results */}
      {filteredJobs.length === 0 ? (
        <div className="no-results">
          <p>No jobs found for "{search}"</p>
          <button
            className="clear-search-btn"
            onClick={() => setSearch("")}
          >
            Clear Search
          </button>
        </div>
      ) : (

        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <div className="job-card" key={job.id}>

              <div className="job-card-header">
                <div>
                  <h3 className="job-title">{job.jobTitle}</h3>
                  <p className="company-name">{job.companyName}</p>
                </div>
                <span className="job-type-badge">{job.jobType}</span>
              </div>

              <div className="job-card-details">
                <div className="job-detail-item">
                  <span className="detail-icon">📍</span>
                  <span>{job.location}</span>
                </div>
                <div className="job-detail-item">
                  <span className="detail-icon">💼</span>
                  <span>{job.experience}</span>
                </div>
                <div className="job-detail-item">
                  <span className="detail-icon">💰</span>
                  <span>${job.minSalary} - ${job.maxSalary}</span>
                </div>
                <div className="job-detail-item">
                  <span className="detail-icon">📅</span>
                  <span>Deadline: {job.deadline}</span>
                </div>
              </div>

              <div className="job-skills">
                {job.skills.split(",").map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill.trim()}
                  </span>
                ))}
              </div>

              <button
                className="apply-btn"
                onClick={() => handleApply(job)}
              >
                Apply Now
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default JobSeekerPage;