import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InterviewSchedule.css";

function InterviewSchedulePage() {

  // holds selected candidate from RecruiterDashboard
  const [candidate, setCandidate] = useState(null);

  // holds interview form fields
  const [form, setForm] = useState({
    date: "",
    time: "",
    location: "",
    mode: "",
    notes: "",
  });

  // holds error messages
  const [errors, setErrors] = useState({});

  // shows success message after submit
  const [submitted, setSubmitted] = useState(false);

  // used to go back to dashboard
  const navigate = useNavigate();

  // when page loads read selected candidate
  useEffect(() => {

    const saved = JSON.parse(
      localStorage.getItem("selectedApplication") || "null"
    );

    if (saved) {
      setCandidate(saved);
    }

  }, []);

  // updates form state when user types
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  }

  // checks all fields before submit
  function validate() {
    const newErrors = {};

    if (form.date === "")
      newErrors.date = "Date is required";

    if (form.time === "")
      newErrors.time = "Time is required";

    if (form.location.trim() === "")
      newErrors.location = "Location is required";

    if (form.mode === "")
      newErrors.mode = "Please select interview mode";

    return newErrors;
  }

  // saves interview to localStorage
  function handleSubmit() {

    // run validation
    const foundErrors = validate();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    // read existing interviews
    const existingInterviews = JSON.parse(
      localStorage.getItem("interviews") || "[]"
    );

    // create new interview object
    const newInterview = {
      id: Date.now().toString(),
      candidateId: candidate?.id || "",
      candidateName: candidate?.candidateName || "",
      email: candidate?.email || "",
      phone: candidate?.phone || "",
      skills: candidate?.skills || "",
      date: form.date,
      time: form.time,
      location: form.location,
      mode: form.mode,
      notes: form.notes,
      scheduledAt: new Date().toLocaleDateString(),
    };

    // add to existing interviews
    existingInterviews.push(newInterview);

    // save back to localStorage
    localStorage.setItem(
      "interviews",
      JSON.stringify(existingInterviews)
    );

    console.log("Interview Scheduled:", newInterview);

    // show success
    setSubmitted(true);
    setErrors({});

    // reset form
    setForm({
      date: "",
      time: "",
      location: "",
      mode: "",
      notes: "",
    });
  }

  // go back to dashboard
  function handleBack() {
    navigate("/dashboard");
  }

  return (
    <div className="schedule-wrapper">

      {/* back button */}
      <button
        className="back-btn"
        onClick={handleBack}
      >
        ← Back to Dashboard
      </button>

      <h2>Schedule Interview</h2>
      <p>Fill in the details to schedule an interview.</p>

      {/* candidate info card */}
      {candidate && (
        <div className="candidate-card">
          <p className="candidate-card-title">Candidate Details</p>
          <div className="candidate-info-row">
            <div className="candidate-info-item">
              <span className="info-label">Name</span>
              <span className="info-value">{candidate.candidateName}</span>
            </div>
            <div className="candidate-info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{candidate.email}</span>
            </div>
            <div className="candidate-info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{candidate.phone}</span>
            </div>
            <div className="candidate-info-item">
              <span className="info-label">Skills</span>
              <span className="info-value">{candidate.skills}</span>
            </div>
          </div>
        </div>
      )}

      {/* interview form */}
      <p className="section-title">Interview Details</p>

      <div className="form-row">

        {/* date */}
        <div className="form-group">
          <label>Interview Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && (
            <span className="error-text">{errors.date}</span>
          )}
        </div>

        {/* time */}
        <div className="form-group">
          <label>Interview Time</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
          />
          {errors.time && (
            <span className="error-text">{errors.time}</span>
          )}
        </div>

      </div>

      <div className="form-row">

        {/* location */}
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Office / Zoom Link"
            value={form.location}
            onChange={handleChange}
          />
          {errors.location && (
            <span className="error-text">{errors.location}</span>
          )}
        </div>

        {/* mode */}
        <div className="form-group">
          <label>Interview Mode</label>
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
          >
            <option value="">Select mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Phone">Phone</option>
          </select>
          {errors.mode && (
            <span className="error-text">{errors.mode}</span>
          )}
        </div>

      </div>

      {/* notes */}
      <div className="form-group">
        <label>Notes (optional)</label>
        <textarea
          name="notes"
          placeholder="Any additional notes for the candidate..."
          value={form.notes}
          onChange={handleChange}
        />
      </div>

      {/* submit button */}
      <button
        className="submit-btn"
        onClick={handleSubmit}
      >
        Schedule Interview
      </button>

      {/* success message */}
      {submitted && (
        <div className="success-msg">
          ✅ Interview scheduled successfully!
          <button
            className="back-dashboard-btn"
            onClick={handleBack}
          >
            Go to Dashboard
          </button>
        </div>
      )}

    </div>
  );
}

export default InterviewSchedulePage;