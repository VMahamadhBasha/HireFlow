import { useState } from "react";
import "./ApplyJobForm.css";

function ApplyJobForm({ job, onClose }) {

  // form fields
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    resumeLink: "",
    coverLetter: "",
  });

  // error messages
  const [errors, setErrors] = useState({});

  // success state
  const [submitted, setSubmitted] = useState(false);

  // updates form when user types
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  // validate fields
  function validate() {
    const newErrors = {};

    if (form.fullName.trim() === "")
      newErrors.fullName = "Full name is required";

    if (form.email.trim() === "")
      newErrors.email = "Email is required";
    else if (!form.email.includes("@"))
      newErrors.email = "Enter a valid email";

    if (form.phone.trim() === "")
      newErrors.phone = "Phone number is required";
    else if (form.phone.length < 10)
      newErrors.phone = "Enter at least 10 digits";

    if (form.experience.trim() === "")
      newErrors.experience = "Experience is required";

    if (form.skills.trim() === "")
      newErrors.skills = "Skills are required";

    if (form.resumeLink.trim() === "")
      newErrors.resumeLink = "Resume link is required";

    return newErrors;
  }

  // submit application
  function handleSubmit() {

    const foundErrors = validate();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    // read existing applications
    const existingApplications = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );

    // create new application
    const newApplication = {
      id: Date.now().toString(),
      jobId: job.id,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      candidateName: form.fullName,
      email: form.email,
      phone: form.phone,
      experience: form.experience,
      skills: form.skills,
      resumeLink: form.resumeLink,
      coverLetter: form.coverLetter,
      appliedDate: new Date().toLocaleDateString(),
      status: "Pending",
    };

    // add to existing
    existingApplications.push(newApplication);

    // save to localStorage
    localStorage.setItem(
      "applications",
      JSON.stringify(existingApplications)
    );

    console.log("Application Submitted:", newApplication);

    setSubmitted(true);
    setErrors({});
  }

  // success screen
  if (submitted) {
    return (
      <div className="apply-wrapper">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>Application Submitted!</h2>
          <p>
            You have successfully applied for
            <strong> {job.jobTitle} </strong>
            at <strong>{job.companyName}</strong>.
          </p>
          <p className="success-note">
            We will get back to you soon.
          </p>
          <button
            className="back-btn"
            onClick={onClose}
          >
            ← Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-wrapper">
      <div className="apply-card">

        {/* back button */}
        <button className="back-btn" onClick={onClose}>
          ← Back to Jobs
        </button>

        <h2>Apply for Job</h2>

        {/* job info card */}
        <div className="job-info-card">
          <div className="job-info-left">
            <h3>{job.jobTitle}</h3>
            <p>{job.companyName}</p>
          </div>
          <div className="job-info-right">
            <span className="job-badge">{job.jobType}</span>
            <span className="job-location">📍 {job.location}</span>
          </div>
        </div>

        {/* personal details */}
        <p className="section-title">Personal Details</p>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="e.g. sathis"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <span className="error-text">{errors.fullName}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="sathis@gmail.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="e.g. 9876543210"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <span className="error-text">{errors.phone}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              placeholder="e.g. 2 years"
              value={form.experience}
              onChange={handleChange}
            />
            {errors.experience && (
              <span className="error-text">{errors.experience}</span>
            )}
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              placeholder="e.g. React, Node.js"
              value={form.skills}
              onChange={handleChange}
            />
            {errors.skills && (
              <span className="error-text">{errors.skills}</span>
            )}
          </div>
        </div>

        {/* resume section */}
        <p className="section-title">Resume & Cover Letter</p>

        <div className="form-group">
          <label>Resume Link</label>
          <input
            type="text"
            name="resumeLink"
            placeholder="e.g. https://drive.google.com/resume"
            value={form.resumeLink}
            onChange={handleChange}
          />
          {errors.resumeLink && (
            <span className="error-text">{errors.resumeLink}</span>
          )}
        </div>

        <div className="form-group">
          <label>Cover Letter (optional)</label>
          <textarea
            name="coverLetter"
            placeholder="Tell us why you are a good fit for this role..."
            value={form.coverLetter}
            onChange={handleChange}
          />
        </div>

        {/* submit button */}
        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Submit Application
        </button>

      </div>
    </div>
  );
}

export default ApplyJobForm;