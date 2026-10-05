import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { SkillsContext } from "../context/SkillsContext";
import { ALL_COURSES } from "../data/courseData";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FaBookReader, 
  FaTrophy, 
  FaCheckCircle, 
  FaRegCircle, 
  FaArrowRight, 
  FaEdit, 
  FaSave, 
  FaRedo,
  FaFire,
  FaMapMarkerAlt,
  FaEnvelope,
  FaLayerGroup,
  FaChartPie
} from "react-icons/fa";

const MyProfile = () => {
  const navigate = useNavigate();
  const { 
    profileData, 
    updateProfile, 
    interestedSkills, 
    setInterestedSkills,
    assessmentResults,
    activeCourseId,
    completedTopics,
    toggleTopicCompletion,
    isTopicCompleted
  } = useContext(SkillsContext);

  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (profileData) {
      setName(profileData.name || "Learner");
      setEmail(profileData.email || "student@skillforge.io");
      setLocation(profileData.location || "Remote");
      setSkills(profileData.skills || ["JavaScript", "Problem Solving"]);
    }
  }, [profileData]);

  // Active Recommended / Enrolled Course
  const activeCourse = ALL_COURSES.find(c => c.id === activeCourseId) || ALL_COURSES[0];

  // Calculate overall learning progress
  const totalTopics = activeCourse.roadmap ? activeCourse.roadmap.length : 0;
  let completedCount = 0;
  let currentTopic = null;
  let nextTopic = null;

  if (activeCourse.roadmap) {
    activeCourse.roadmap.forEach((topic, idx) => {
      const done = isTopicCompleted(activeCourse.id, topic.id);
      if (done) {
        completedCount++;
      } else if (!currentTopic) {
        currentTopic = topic;
        nextTopic = activeCourse.roadmap[idx + 1] || null;
      }
    });
    if (!currentTopic && activeCourse.roadmap.length > 0) {
      currentTopic = activeCourse.roadmap[activeCourse.roadmap.length - 1];
    }
  }

  const overallProgressPct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const userDetails = {
      name,
      email,
      location,
      skills,
      interestedSkills,
    };

    axios.post("http://localhost:3001/api/profile", userDetails)
      .then(response => {
        updateProfile({ name, email, location, skills });
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch(error => {
        // Fallback local update if backend API is offline
        updateProfile({ name, email, location, skills });
        setSuccessMessage("Profile saved locally!");
        setTimeout(() => setSuccessMessage(""), 3000);
      });
    
    setIsEditing(false);
  };

  return (
    <>
      <Header />

      <div className="bg-light py-5 min-vh-100">
        <div className="container" style={{ maxWidth: '1140px' }}>

          {/* DASHBOARD PROFILE HEADER */}
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-4">
            <div className="bg-gradient-primary text-white p-4 p-md-5">
              <div className="row align-items-center g-4">
                
                {/* Profile Avatar */}
                <div className="col-md-3 text-center">
                  <div className="position-relative d-inline-block">
                    <img
                      src={profilePic || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
                      alt="Student Profile"
                      className="rounded-circle border border-4 border-white shadow-lg"
                      style={{ width: '130px', height: '130px', objectFit: 'cover' }}
                    />
                    {isEditing && (
                      <label className="btn btn-sm btn-warning rounded-circle position-absolute bottom-0 end-0 p-2 shadow">
                        <FaEdit />
                        <input type="file" onChange={handleProfilePicChange} className="d-none" />
                      </label>
                    )}
                  </div>
                </div>

                {/* Profile Identity */}
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge bg-warning text-dark px-3 py-1 rounded-pill fw-bold">
                      🔥 Active Student
                    </span>
                    <span className="badge bg-white bg-opacity-25 text-white px-3 py-1 rounded-pill">
                      Level: {assessmentResults?.generalAnswers?.gen_3 || 'Intermediate'}
                    </span>
                  </div>
                  <h2 className="fw-extrabold text-white mb-2">{name}</h2>
                  <p className="opacity-90 mb-2 d-flex flex-wrap gap-3">
                    <span><FaEnvelope className="me-1 opacity-75" /> {email}</span>
                    <span><FaMapMarkerAlt className="me-1 opacity-75" /> {location}</span>
                  </p>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {skills.map((s, i) => (
                      <span key={i} className="badge bg-white bg-opacity-25 text-white font-monospace">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Profile Edit Action */}
                <div className="col-md-3 text-md-end text-center">
                  {isEditing ? (
                    <button onClick={handleSave} className="btn btn-success px-4 py-2 rounded-pill fw-bold shadow-sm">
                      <FaSave className="me-1" /> Save Profile
                    </button>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="btn btn-outline-light px-4 py-2 rounded-pill fw-bold">
                      <FaEdit className="me-1" /> Edit Profile
                    </button>
                  )}
                  {successMessage && <div className="small text-warning fw-bold mt-2">{successMessage}</div>}
                </div>

              </div>
            </div>

            {/* EDIT PROFILE FORM COLLAPSIBLE */}
            {isEditing && (
              <div className="card-body p-4 bg-white border-top">
                <h5 className="fw-bold text-dark mb-3">Edit Profile Details</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Username</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Location</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Skills (comma separated)</label>
                    <input type="text" value={skills.join(", ")} onChange={e => setSkills(e.target.value.split(",").map(s => s.trim()))} className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Interested Domains</label>
                    <input type="text" value={interestedSkills.join(", ")} onChange={e => setInterestedSkills(e.target.value.split(",").map(s => s.trim()))} className="form-control" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DASHBOARD METRICS GRID (Priority 8) */}
          <div className="row g-4 mb-4">
            
            {/* 1. Overall Progress */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold text-dark mb-0">Overall Progress</h6>
                  <FaChartPie className="text-primary fs-4" />
                </div>
                <div className="display-5 fw-extrabold text-primary mb-2">{overallProgressPct}%</div>
                <p className="small text-muted mb-3">{completedCount} of {totalTopics} topics completed in active roadmap</p>
                <div className="progress rounded-pill mb-2" style={{ height: '8px' }}>
                  <div className="progress-bar bg-primary rounded-pill" style={{ width: `${overallProgressPct}%` }}></div>
                </div>
              </div>
            </div>

            {/* 2. Recommended Course */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-warning text-dark fw-bold">RECOMMENDED</span>
                  <span className="badge bg-success-subtle text-success">{assessmentResults?.matchPercentage || 88}% Match</span>
                </div>
                <h5 className="fw-bold text-dark mb-2">{activeCourse.title}</h5>
                <p className="small text-muted mb-3">{activeCourse.domain} • {activeCourse.difficulty}</p>
                <button 
                  onClick={() => navigate('/course-summary')} 
                  className="btn btn-outline-primary btn-sm rounded-pill fw-bold w-100 mt-auto"
                >
                  Continue Learning <FaArrowRight className="ms-1" />
                </button>
              </div>
            </div>

            {/* 3. Assessment Score History */}
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold text-dark mb-0">Skill Assessment</h6>
                  <FaTrophy className="text-warning fs-4" />
                </div>
                <div className="display-6 fw-bold text-success mb-1">
                  {assessmentResults ? `${assessmentResults.score}/${assessmentResults.totalQuestions}` : '5/5 Passed'}
                </div>
                <p className="small text-muted mb-3">Baseline: {assessmentResults?.targetDomain || 'Web Development'}</p>
                <Link to="/skill-assessment" className="btn btn-outline-secondary btn-sm rounded-pill w-100 mt-auto">
                  <FaRedo className="me-1" /> Retake Assessment
                </Link>
              </div>
            </div>

          </div>

          {/* CURRENT TOPIC & NEXT TOPIC CARDS */}
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-primary border-4">
                <span className="badge bg-primary text-white mb-2" style={{ width: 'fit-content' }}>CURRENT TOPIC</span>
                <h4 className="fw-bold text-dark mb-1">{currentTopic ? currentTopic.title : 'HTML & CSS Fundamentals'}</h4>
                <p className="text-muted small mb-3">{currentTopic ? currentTopic.description : 'Master page layout, semantic tags, and CSS Grid.'}</p>
                <button 
                  onClick={() => navigate('/course-summary')}
                  className="btn btn-primary rounded-pill btn-sm px-4 fw-bold shadow-sm"
                >
                  Open Topic Roadmap
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-info border-4">
                <span className="badge bg-info text-white mb-2" style={{ width: 'fit-content' }}>NEXT UP</span>
                <h4 className="fw-bold text-dark mb-1">{nextTopic ? nextTopic.title : 'JavaScript ES6+ & DOM'}</h4>
                <p className="text-muted small mb-3">{nextTopic ? nextTopic.description : 'Arrow functions, event listeners, promises, and fetch API.'}</p>
                <span className="text-muted small fw-bold">Up Next in Sequence</span>
              </div>
            </div>
          </div>

          {/* SKILL PROFICIENCY BREAKDOWN & COMPLETED TOPICS CHECKLIST */}
          <div className="row g-4">
            
            {/* Skill Breakdown */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                <h5 className="fw-bold text-dark mb-3">Skill Proficiency Breakdown</h5>
                <div className="d-flex flex-column gap-3">
                  <div>
                    <div className="d-flex justify-content-between small fw-bold mb-1">
                      <span>Web Development (HTML/CSS/JS/React)</span>
                      <span className="text-primary">85%</span>
                    </div>
                    <div className="progress rounded-pill" style={{ height: '8px' }}>
                      <div className="progress-bar bg-primary rounded-pill" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex justify-content-between small fw-bold mb-1">
                      <span>Python & Data Structures</span>
                      <span className="text-success">72%</span>
                    </div>
                    <div className="progress rounded-pill" style={{ height: '8px' }}>
                      <div className="progress-bar bg-success rounded-pill" style={{ width: '72%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex justify-content-between small fw-bold mb-1">
                      <span>Database & REST APIs</span>
                      <span className="text-warning">68%</span>
                    </div>
                    <div className="progress rounded-pill" style={{ height: '8px' }}>
                      <div className="progress-bar bg-warning rounded-pill" style={{ width: '68%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex justify-content-between small fw-bold mb-1">
                      <span>Cloud Computing & DevOps Basics</span>
                      <span className="text-info">60%</span>
                    </div>
                    <div className="progress rounded-pill" style={{ height: '8px' }}>
                      <div className="progress-bar bg-info rounded-pill" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Completed Topics Checklist */}
            <div className="col-md-6">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-dark mb-0">Completed Topics Checklist</h5>
                  <span className="badge bg-success-subtle text-success">{completedCount} Done</span>
                </div>

                <div className="d-flex flex-column gap-2" style={{ maxHeight: '260px', overflowY: 'auto' }}>
                  {activeCourse.roadmap && activeCourse.roadmap.map(topic => {
                    const done = isTopicCompleted(activeCourse.id, topic.id);
                    return (
                      <div 
                        key={topic.id} 
                        onClick={() => toggleTopicCompletion(activeCourse.id, topic.id)}
                        className={`p-3 rounded-3 border transition-all cursor-pointer d-flex align-items-center justify-content-between ${
                          done ? 'bg-success-subtle border-success text-success' : 'bg-light text-dark'
                        }`}
                      >
                        <span className="fw-semibold small">{topic.title}</span>
                        {done ? <FaCheckCircle className="text-success fs-5" /> : <FaRegCircle className="text-muted fs-5" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyProfile;
