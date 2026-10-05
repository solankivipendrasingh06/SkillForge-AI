import React, { useState, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ALL_COURSES } from '../data/courseData';
import { SkillsContext } from '../context/SkillsContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  FaSearch, 
  FaClock, 
  FaStar, 
  FaUserGraduate, 
  FaArrowRight, 
  FaBookOpen, 
  FaCheckCircle,
  FaFilter,
  FaLayerGroup
} from 'react-icons/fa';

function Courses() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

  const { enrollInCourse, setActiveCourseId } = useContext(SkillsContext);

  const [searchTerm, setSearchTerm] = useState(queryFromUrl);
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const domainsList = [
    'All',
    'Web Development',
    'Java Development',
    'Python',
    'Data Science',
    'AI/ML',
    'Data Analytics',
    'Cyber Security',
    'Cloud Computing',
    'DevOps',
    'UI/UX',
    'Blockchain'
  ];

  // Filter courses logic
  const filteredCourses = ALL_COURSES.filter(course => {
    const matchesDomain = selectedDomain === 'All' || course.domain === selectedDomain;
    const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
    const matchesQuery = !searchTerm.trim() || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.skillsCovered.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesDomain && matchesDifficulty && matchesQuery;
  });

  const handleStartLearning = (course) => {
    enrollInCourse(course);
    setActiveCourseId(course.id);
    navigate('/course-summary');
  };

  return (
    <>
      <Header />

      <div className="bg-light py-5 min-vh-100">
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {/* Header Banner */}
          <div className="text-center mb-5">
            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-bold mb-2">
              ACADEMIC CATALOG
            </span>
            <h1 className="display-6 fw-extrabold text-dark mb-2">Explore Tech Skill Pathways</h1>
            <p className="text-muted lead" style={{ maxWidth: '680px', margin: '0 auto' }}>
              Handcrafted, industry-aligned tech programs with interactive step-by-step learning roadmaps.
            </p>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <div className="row g-3 align-items-center">
              
              {/* Search input */}
              <div className="col-md-6">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-pill ps-5 bg-light border-0"
                    placeholder="Search courses by skill, topic, or title..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="position-absolute start-0 top-50 translate-middle-y ms-3 text-muted fs-5" />
                </div>
              </div>

              {/* Difficulty Dropdown */}
              <div className="col-md-3">
                <select
                  value={selectedDifficulty}
                  onChange={e => setSelectedDifficulty(e.target.value)}
                  className="form-select form-select-lg rounded-pill bg-light border-0"
                >
                  <option value="All">All Difficulties</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Reset Filters */}
              <div className="col-md-3 text-md-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDomain('All');
                    setSelectedDifficulty('All');
                  }}
                  className="btn btn-outline-secondary rounded-pill px-4"
                >
                  Reset Filters
                </button>
              </div>

            </div>

            {/* Domain Pills Filter */}
            <div className="d-flex flex-wrap gap-2 mt-4 pt-3 border-top">
              {domainsList.map((domain, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDomain(domain)}
                  className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold transition-all ${
                    selectedDomain === domain 
                      ? 'btn-primary shadow-sm' 
                      : 'btn-light text-secondary hover-bg-white border'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* COURSE CARDS GRID (Priority 5) */}
          <div className="row g-4 mb-5">
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <div key={course.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white hover-lift d-flex flex-column justify-content-between">
                    
                    {/* Card Top Header */}
                    <div className="p-4 bg-gradient-light border-bottom position-relative">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-1 rounded-pill">
                          {course.domain}
                        </span>
                        <span className={`badge rounded-pill px-2 py-1 ${
                          course.difficulty === 'Beginner' ? 'bg-success-subtle text-success' :
                          course.difficulty === 'Intermediate' ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'
                        }`}>
                          {course.difficulty}
                        </span>
                      </div>
                      
                      <h4 className="fw-bold text-dark mb-2">{course.title}</h4>
                      <p className="small text-secondary mb-0 line-clamp-2" style={{ minHeight: '40px' }}>
                        {course.description}
                      </p>
                    </div>

                    {/* Card Middle Details */}
                    <div className="p-4 card-body d-flex flex-column justify-content-between">
                      <div>
                        {/* Course Specs */}
                        <div className="d-flex justify-content-between small text-muted mb-3 border-bottom pb-2">
                          <span className="d-flex align-items-center">
                            <FaClock className="me-1 text-primary" /> {course.estimatedTime}
                          </span>
                          <span className="d-flex align-items-center text-warning fw-bold">
                            <FaStar className="me-1" /> {course.rating} ({course.enrollments.toLocaleString()})
                          </span>
                        </div>

                        {/* Prerequisites */}
                        <div className="small text-muted mb-3">
                          <strong>Prerequisites:</strong> {course.prerequisites}
                        </div>

                        {/* Skills Covered Badges */}
                        <div className="d-flex flex-wrap gap-1 mb-3">
                          {course.skillsCovered.slice(0, 5).map((skill, i) => (
                            <span key={i} className="badge bg-light text-dark border small">
                              {skill}
                            </span>
                          ))}
                          {course.skillsCovered.length > 5 && (
                            <span className="badge bg-light text-muted border small">
                              +{course.skillsCovered.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleStartLearning(course)}
                        className="btn btn-primary rounded-pill w-100 py-2 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mt-3"
                      >
                        Start Learning & Roadmap <FaArrowRight />
                      </button>

                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <div className="p-5 bg-white rounded-4 border shadow-sm">
                  <h4 className="fw-bold text-dark mb-2">No Courses Found</h4>
                  <p className="text-muted mb-3">Try clearing search keywords or selecting another domain filter.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedDomain('All');
                      setSelectedDifficulty('All');
                    }}
                    className="btn btn-primary rounded-pill px-4"
                  >
                    Reset Search Filters
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Courses;
