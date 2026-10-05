import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { SkillsContext } from '../context/SkillsContext';
import { ALL_COURSES } from '../data/courseData';
import { 
  FaCheckCircle, 
  FaRegCircle, 
  FaArrowDown, 
  FaArrowRight, 
  FaTrophy, 
  FaClock, 
  FaBookOpen, 
  FaExternalLinkAlt, 
  FaChalkboardTeacher,
  FaMagic,
  FaChartLine,
  FaLayerGroup
} from 'react-icons/fa';

const CourseSummary = ({ course: propCourse }) => {
  const navigate = useNavigate();
  const { 
    assessmentResults, 
    activeCourseId, 
    setActiveCourseId, 
    isTopicCompleted, 
    toggleTopicCompletion,
    enrollInCourse
  } = useContext(SkillsContext);

  // Selected active course details
  const currentCourse = propCourse || 
    ALL_COURSES.find(c => c.id === activeCourseId) || 
    ALL_COURSES[0];

  // Active topic modal/details view
  const [selectedTopic, setSelectedTopic] = useState(null);

  // Calculate completed topics percentage for active course roadmap
  const totalTopics = currentCourse.roadmap ? currentCourse.roadmap.length : 0;
  let completedCount = 0;
  if (currentCourse.roadmap) {
    currentCourse.roadmap.forEach(t => {
      if (isTopicCompleted(currentCourse.id, t.id)) {
        completedCount++;
      }
    });
  }
  const roadmapProgressPct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // Match details from assessment or default
  const matchPct = assessmentResults?.matchPercentage || 87;
  const matchReasons = assessmentResults?.matchReasons || [
    `Matches your target domain: ${currentCourse.domain}`,
    `Tailored for ${currentCourse.difficulty} skill level`,
    `Project-based curriculum matching industry requirements`,
    `Structured for steady 4-6 hours per week commitment`
  ];
  const alternatives = assessmentResults?.alternatives || ALL_COURSES.filter(c => c.id !== currentCourse.id).slice(0, 3);

  return (
    <>
      <Header />
      
      <div className="bg-light py-5 min-vh-100">
        <div className="container" style={{ maxWidth: '1000px' }}>

          {/* AI RECOMMENDATION RESULT CARD (Priority 6) */}
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5">
            <div className="bg-gradient-primary text-white p-4 p-md-5 position-relative">
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div>
                  <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-2 shadow-sm">
                    ✨ RECOMMENDED COURSE RESULT
                  </span>
                  <h1 className="display-6 fw-extrabold text-white mb-2">{currentCourse.title}</h1>
                  <p className="opacity-90 lead mb-0" style={{ maxWidth: '650px' }}>
                    {currentCourse.description}
                  </p>
                </div>

                <div className="text-center bg-white bg-opacity-15 p-3 rounded-4 border border-white border-opacity-25" style={{ minWidth: '150px' }}>
                  <div className="display-5 fw-extrabold text-warning mb-1">{matchPct}%</div>
                  <small className="fw-bold text-uppercase tracking-wider opacity-90">Match Score</small>
                </div>
              </div>
            </div>

            <div className="card-body p-4 p-md-5 bg-white">
              <div className="row g-4">
                <div className="col-md-7">
                  <h5 className="fw-bold text-dark mb-3">Why this course is recommended for you:</h5>
                  <div className="d-flex flex-column gap-2 mb-4">
                    {matchReasons.map((reason, idx) => (
                      <div key={idx} className="d-flex align-items-start text-dark">
                        <FaCheckCircle className="text-success me-2 mt-1 flex-shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex flex-wrap gap-3 text-muted small border-top pt-3">
                    <div><strong>Difficulty:</strong> <span className="badge bg-info-subtle text-info">{currentCourse.difficulty}</span></div>
                    <div><strong>Duration:</strong> <span>{currentCourse.estimatedTime}</span></div>
                    <div><strong>Prerequisites:</strong> <span>{currentCourse.prerequisites}</span></div>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className="bg-light p-4 rounded-4 border">
                    <h6 className="fw-bold text-dark mb-3">Alternative Career Paths</h6>
                    <div className="d-flex flex-column gap-3">
                      {alternatives.map((alt, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => {
                            enrollInCourse(alt);
                            setActiveCourseId(alt.id);
                          }}
                          className="p-3 bg-white rounded-3 border hover-border-primary cursor-pointer transition-all d-flex align-items-center justify-content-between"
                        >
                          <div>
                            <div className="fw-bold text-dark small">{alt.title}</div>
                            <small className="text-muted">{alt.domain}</small>
                          </div>
                          <span className="badge bg-success-subtle text-success">{alt.matchPercentage || 75}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL LEARNING ROADMAP HEADER (Priority 7) */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-1 rounded-pill mb-2">
                  🗺️ VISUAL INTERACTIVE ROADMAP
                </span>
                <h3 className="fw-bold text-dark mb-1">Step-by-Step Learning Path</h3>
                <p className="text-muted small mb-0">Follow this node flowchart sequence to master {currentCourse.title}. Click topics to view key concepts and mark as completed.</p>
              </div>

              <div className="text-end" style={{ minWidth: '220px' }}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small text-muted fw-bold">Roadmap Progress</span>
                  <span className="small fw-bold text-primary">{completedCount}/{totalTopics} ({roadmapProgressPct}%)</span>
                </div>
                <div className="progress rounded-pill" style={{ height: '10px' }}>
                  <div 
                    className="progress-bar bg-success rounded-pill" 
                    role="progressbar" 
                    style={{ width: `${roadmapProgressPct}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE ROADMAP NODES FLOWCHART */}
          <div className="roadmap-container position-relative py-3">
            {currentCourse.roadmap && currentCourse.roadmap.map((topic, idx) => {
              const isCompleted = isTopicCompleted(currentCourse.id, topic.id);
              const isLast = idx === currentCourse.roadmap.length - 1;

              return (
                <div key={topic.id} className="roadmap-node-wrapper position-relative mb-4 text-center">
                  
                  {/* Node Card */}
                  <div 
                    className={`card border-0 shadow-sm rounded-4 overflow-hidden transition-all mx-auto ${
                      isCompleted ? 'border-start border-success border-5 bg-success-subtle' : 'bg-white hover-lift'
                    }`}
                    style={{ maxWidth: '650px' }}
                  >
                    <div className="card-body p-4 text-start">
                      <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
                        <div className="d-flex align-items-center gap-3">
                          <span className={`badge rounded-circle d-flex align-items-center justify-content-center fw-bold ${
                            isCompleted ? 'bg-success text-white' : 'bg-primary text-white'
                          }`} style={{ width: '38px', height: '38px', fontSize: '1.1rem' }}>
                            {topic.step || (idx + 1)}
                          </span>
                          <div>
                            <h5 className="fw-bold text-dark mb-0">{topic.title}</h5>
                            {topic.estimatedHours && (
                              <small className="text-muted d-flex align-items-center mt-1">
                                <FaClock className="me-1 text-primary" /> {topic.estimatedHours}
                              </small>
                            )}
                          </div>
                        </div>

                        {/* Completion Checkbox Button */}
                        <button
                          onClick={() => toggleTopicCompletion(currentCourse.id, topic.id)}
                          className={`btn btn-sm rounded-pill px-3 fw-bold d-flex align-items-center gap-2 ${
                            isCompleted 
                              ? 'btn-success text-white' 
                              : 'btn-outline-secondary'
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <FaCheckCircle /> Completed
                            </>
                          ) : (
                            <>
                              <FaRegCircle /> Mark Complete
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-secondary small mb-3">{topic.description}</p>

                      {/* Key Concepts Badges */}
                      {topic.keyConcepts && (
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {topic.keyConcepts.map((kc, i) => (
                            <span key={i} className="badge bg-light text-dark border small">
                              {kc}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* External Resource Link */}
                      {topic.resourceLink && (
                        <a 
                          href={topic.resourceLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="small text-primary text-decoration-none fw-semibold d-inline-flex align-items-center"
                        >
                          Documentation Resource <FaExternalLinkAlt className="ms-1 fs-xs" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Flowchart Connecting Arrow ↓ */}
                  {!isLast && (
                    <div className="my-3 text-primary fs-3 opacity-75">
                      <FaArrowDown className="bounce-arrow" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          {/* DASHBOARD ACTION BUTTONS */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mt-5 bg-white text-center">
            <h4 className="fw-bold text-dark mb-2">Ready to Track Your Full Student Journey?</h4>
            <p className="text-muted mb-4">View your dashboard, skill proficiency metrics, and enrolled courses in real time.</p>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/my-profile" className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
                Go to Student Dashboard <FaArrowRight className="ms-2" />
              </Link>
              <Link to="/courses" className="btn btn-outline-secondary btn-lg rounded-pill px-4">
                Explore All Courses
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseSummary;
