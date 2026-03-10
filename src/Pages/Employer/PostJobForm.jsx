import { useState } from "react";
import './PostJobForm.css';

function PostJobForm() {

  // holds all form field values
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    contactNo: "",
    jobTitle: "",
    jobType: "",
    location: "",
    experience: "",
    skills: "",
    jobDescription: "",
    minSalary: "",
    maxSalary: "",
    deadline: "",
    status: "",
  });

  // holds error messages
  const [errors, setErrors] = useState({});

  // shows success message after submit
  const [submitted, setSubmitted] = useState(false);

  // updates form state when user types
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  // checks all fields before submit
  function validate() {
    const newErrors = {};

    if (form.companyName.trim() === "")
      newErrors.companyName = "Company name is required";

    if (form.email.trim() === "")
      newErrors.email = "Email is required";
    else if (!form.email.includes("@"))
      newErrors.email = "Enter a valid email";

    if (form.contactNo.trim() === "")
      newErrors.contactNo = "Contact number is required";
    else if (form.contactNo.length < 10)
      newErrors.contactNo = "Enter at least 10 digits";

    if (form.jobTitle.trim() === "")
      newErrors.jobTitle = "Job title is required";

    if (form.jobType === "")
      newErrors.jobType = "Please select a job type";

    if (form.location.trim() === "")
      newErrors.location = "Location is required";

    if (form.experience.trim() === "")
      newErrors.experience = "Experience is required";

    if (form.skills.trim() === "")
      newErrors.skills = "Skills are required";

    if (form.jobDescription.trim() === "")
      newErrors.jobDescription = "Job description is required";

    if (form.minSalary === "")
      newErrors.minSalary = "Min salary is required";

    if (form.maxSalary === "")
      newErrors.maxSalary = "Max salary is required";
    else if (Number(form.maxSalary) < Number(form.minSalary))
      newErrors.maxSalary = "Max must be greater than min";

    if (form.deadline === "")
      newErrors.deadline = "Deadline is required";

    if (form.status === "")
      newErrors.status = "Please select a status";

    return newErrors;
  }

  // saves job to localStorage
  function handleSubmit() {

    // run validation first
    const foundErrors = validate();

    // if errors exist show them and stop
    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    // read existing jobs from localStorage
    const existingJobs = JSON.parse(
      localStorage.getItem("jobs") || "[]"
    );

    // create new job with unique id
    const newJob = {
      ...form,
      id: Date.now().toString(),
    };

    // add new job to existing list
    existingJobs.push(newJob);

    // save back to localStorage
    localStorage.setItem("jobs", JSON.stringify(existingJobs));

    // show success message
    setSubmitted(true);
    setErrors({});

    // reset form fields
    setForm({
      companyName: "",
      email: "",
      contactNo: "",
      jobTitle: "",
      jobType: "",
      location: "",
      experience: "",
      skills: "",
      jobDescription: "",
      minSalary: "",
      maxSalary: "",
      deadline: "",
      status: "",
    });

    console.log("Job Saved:", newJob);
  }

  return (
    <div className="form-wrapper">

      <h2>Post a Job</h2>

      {/* company info section */}
      <p className="section-title">Company Info</p>

      <div className="form-group">
        <label>Company Name</label>
        <input
          type="text"
          name="companyName"
          placeholder="e.g. Acme Corp"
          value={form.companyName}
          onChange={handleChange}
        />
        {errors.companyName && (
          <span className="error-text">{errors.companyName}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="hr@company.com"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="error-text">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Contact No</label>
          <input
            type="text"
            name="contactNo"
            placeholder="e.g. 9876543210"
            value={form.contactNo}
            onChange={handleChange}
          />
          {errors.contactNo && (
            <span className="error-text">{errors.contactNo}</span>
          )}
        </div>
      </div>

      {/* job details section */}
      <p className="section-title">Job Details</p>

      <div className="form-row">
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="e.g. Frontend Developer"
            value={form.jobTitle}
            onChange={handleChange}
          />
          {errors.jobTitle && (
            <span className="error-text">{errors.jobTitle}</span>
          )}
        </div>

        <div className="form-group">
          <label>Job Type</label>
          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.jobType && (
            <span className="error-text">{errors.jobType}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Remote / New York"
            value={form.location}
            onChange={handleChange}
          />
          {errors.location && (
            <span className="error-text">{errors.location}</span>
          )}
        </div>

        <div className="form-group">
          <label>Experience</label>
          <input
            type="text"
            name="experience"
            placeholder="e.g. 2+ years"
            value={form.experience}
            onChange={handleChange}
          />
          {errors.experience && (
            <span className="error-text">{errors.experience}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Skills</label>
        <input
          type="text"
          name="skills"
          placeholder="e.g. React, Node.js, CSS"
          value={form.skills}
          onChange={handleChange}
        />
        {errors.skills && (
          <span className="error-text">{errors.skills}</span>
        )}
      </div>

      <div className="form-group">
        <label>Job Description</label>
        <textarea
          name="jobDescription"
          placeholder="Describe the role..."
          value={form.jobDescription}
          onChange={handleChange}
        />
        {errors.jobDescription && (
          <span className="error-text">{errors.jobDescription}</span>
        )}
      </div>

      {/* salary and dates section */}
      <p className="section-title">Salary & Dates</p>

      <div className="form-row">
        <div className="form-group">
          <label>Min Salary</label>
          <input
            type="number"
            name="minSalary"
            placeholder="e.g. 40000"
            value={form.minSalary}
            onChange={handleChange}
          />
          {errors.minSalary && (
            <span className="error-text">{errors.minSalary}</span>
          )}
        </div>

        <div className="form-group">
          <label>Max Salary</label>
          <input
            type="number"
            name="maxSalary"
            placeholder="e.g. 80000"
            value={form.maxSalary}
            onChange={handleChange}
          />
          {errors.maxSalary && (
            <span className="error-text">{errors.maxSalary}</span>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
          />
          {errors.deadline && (
            <span className="error-text">{errors.deadline}</span>
          )}
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.status && (
            <span className="error-text">{errors.status}</span>
          )}
        </div>
      </div>

      {/* submit button */}
      <button
        className="submit-btn"
        onClick={handleSubmit}
      >
        Post Job
      </button>

      {/* success message */}
      {submitted && (
        <p className="success-msg">
          ✅ Job posted successfully!
        </p>
      )}

    </div>
  );
}

export default PostJobForm;