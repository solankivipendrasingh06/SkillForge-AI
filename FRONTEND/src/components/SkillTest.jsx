import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SkillsContext } from '../context/SkillsContext';
import { GENERAL_QUESTIONS, DOMAIN_QUESTIONS } from '../data/questionBank';
import { calculateRecommendation } from '../data/courseData';
import '../SkillAssessment.css';
import { 
  FaCheckCircle, 
  FaArrowRight, 
  FaArrowLeft, 
  FaRedo, 
  FaTrophy, 
  FaGraduationCap, 
  FaRegLightbulb, 
  FaExclamationTriangle,
  FaMagic,
  FaCompass
} from 'react-icons/fa';

const SkillTest = () => {
  const navigate = useNavigate();
  const { saveAssessmentResult, enrollInCourse } = useContext(SkillsContext);

  // Workflow phases: 'intro' | 'general' | 'domain_test' | 'completed'
  const [phase, setPhase] = useState('intro');

  // General questions state
  const [generalStep, setGeneralStep] = useState(0);
  const [generalAnswers, setGeneralAnswers] = useState({});

  // Domain selection state
  const [targetDomain, setTargetDomain] = useState('Web Development');

  // Technical domain questions state
  const [domainStep, setDomainStep] = useState(0);
  const [domainAnswers, setDomainAnswers] = useState({});
  const [validationError, setValidationError] = useState('');

  // Assessment completed result cache
  const [finalResult, setFinalResult] = useState(null);

  // Total steps in General questionnaire
  const totalGeneralSteps = GENERAL_QUESTIONS.length;

  // Active domain questions array
  const activeDomainQuestions = DOMAIN_QUESTIONS[targetDomain] || DOMAIN_QUESTIONS['Web Development'];
  const totalDomainSteps = activeDomainQuestions.length;

  // Handler for General question option selection
  const handleSelectGeneralOption = (questionId, optionValue, domainValue) => {
    setValidationError('');
    setGeneralAnswers(prev => ({
      ...prev,
      [questionId]: optionValue
    }));
    if (domainValue) {
      setTargetDomain(domainValue);
    }
  };

  // Clear answer for current General step
  const handleClearGeneralAnswer = () => {
    const currentQ = GENERAL_QUESTIONS[generalStep];
    setGeneralAnswers(prev => {
      const updated = { ...prev };
      delete updated[currentQ.id];
      return updated;
    });
  };

  // Next General step
  const handleNextGeneral = () => {
    const currentQ = GENERAL_QUESTIONS[generalStep];
    if (!generalAnswers[currentQ.id]) {
      setValidationError('Please select an option to proceed.');
      return;
    }
    setValidationError('');
    if (generalStep < totalGeneralSteps - 1) {
      setGeneralStep(prev => prev + 1);
    } else {
      // Transition to Technical domain assessment
      setPhase('domain_test');
      setDomainStep(0);
    }
  };

  // Prev General step
  const handlePrevGeneral = () => {
    setValidationError('');
    if (generalStep > 0) {
      setGeneralStep(prev => prev - 1);
    } else {
      setPhase('intro');
    }
  };

  // Handler for Domain question option selection
  const handleSelectDomainOption = (questionId, selectedOption) => {
    setValidationError('');
    setDomainAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  // Clear answer for current Domain step
  const handleClearDomainAnswer = () => {
    const currentQ = activeDomainQuestions[domainStep];
    setDomainAnswers(prev => {
      const updated = { ...prev };
      delete updated[currentQ.id];
      return updated;
    });
  };

  // Next Domain step
  const handleNextDomain = () => {
    const currentQ = activeDomainQuestions[domainStep];
    if (!domainAnswers[currentQ.id]) {
      setValidationError('Please select an answer to continue.');
      return;
    }
    setValidationError('');
    if (domainStep < totalDomainSteps - 1) {
      setDomainStep(prev => prev + 1);
    } else {
      // Calculate assessment results
      calculateAndFinishAssessment();
    }
  };

  // Prev Domain step
  const handlePrevDomain = () => {
    setValidationError('');
    if (domainStep > 0) {
      setDomainStep(prev => prev - 1);
    } else {
      setPhase('general');
      setGeneralStep(totalGeneralSteps - 1);
    }
  };

  // Compute final score & recommendation
  const calculateAndFinishAssessment = () => {
    let correctCount = 0;
    activeDomainQuestions.forEach(q => {
      if (domainAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const domainScoresObj = {
      [targetDomain]: {
        correct: correctCount,
        total: totalDomainSteps
      }
    };

    const recResult = calculateRecommendation(generalAnswers, domainScoresObj);
    recResult.generalAnswers = generalAnswers;
    recResult.domainAnswers = domainAnswers;
    recResult.score = correctCount;
    recResult.totalQuestions = totalDomainSteps;
    recResult.completedAt = new Date().toISOString();

    setFinalResult(recResult);
    saveAssessmentResult(recResult);
    setPhase('completed');
  };

  // Reset assessment
  const handleRestartAssessment = () => {
    setPhase('intro');
    setGeneralStep(0);
    setGeneralAnswers({});
    setDomainStep(0);
    setDomainAnswers({});
    setValidationError('');
    setFinalResult(null);
  };

  // View Roadmap CTA
  const handleViewRoadmap = () => {
    if (finalResult && finalResult.recommendedCourse) {
      enrollInCourse(finalResult.recommendedCourse);
    }
    navigate('/course-summary');
  };

  // RENDER: Intro Screen
  if (phase === 'intro') {
    return (
      <div className="assessment-wrapper py-5">
        <div className="container" style={{ maxWidth: '850px' }}>
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden hero-card">
            <div className="card-body p-4 p-md-5 text-center bg-gradient-primary text-white position-relative">
              <div className="badge bg-warning text-dark px-3 py-2 rounded-pill mb-3 fw-bold shadow-sm">
                ⚡ Adaptive AI Skill Assessment
              </div>
              <h1 className="display-5 fw-extrabold mb-3">Discover Your Ideal Tech Learning Path</h1>
              <p className="lead opacity-90 mb-4" style={{ maxWidth: '650px', margin: '0 auto' }}>
                Answer a few quick questions about your goals, preferences, and technical baseline. Our system will generate a personalized recommendation and visual learning roadmap.
              </p>
              
              <div className="row g-3 justify-content-center text-start my-4">
                <div className="col-md-4">
                  <div className="bg-white bg-opacity-15 p-3 rounded-3 border border-white border-opacity-25 h-100">
                    <h6 className="fw-bold mb-1 text-warning">🎯 Personal Preferences</h6>
                    <small>Tell us your career goals, experience, and weekly available time.</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-white bg-opacity-15 p-3 rounded-3 border border-white border-opacity-25 h-100">
                    <h6 className="fw-bold mb-1 text-warning">🧠 Baseline Check</h6>
                    <small>Quick 5-question check across 11 technical domains.</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="bg-white bg-opacity-15 p-3 rounded-3 border border-white border-opacity-25 h-100">
                    <h6 className="fw-bold mb-1 text-warning">🚀 Visual Roadmap</h6>
                    <small>Get your match percentage & step-by-step topic roadmap.</small>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setPhase('general')}
                className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg mt-2 hover-lift"
              >
                Start Skill Assessment <FaArrowRight className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: General Questions Step-by-Step
  if (phase === 'general') {
    const currentQ = GENERAL_QUESTIONS[generalStep];
    const progressPct = Math.round(((generalStep + 1) / totalGeneralSteps) * 50); // 0-50% for general

    return (
      <div className="assessment-wrapper py-5">
        <div className="container" style={{ maxWidth: '800px' }}>
          {/* Top Progress Header */}
          <div className="bg-white rounded-4 p-4 shadow-sm border mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill">
                Step 1 of 2: General Profile & Preferences
              </span>
              <span className="fw-bold text-muted">
                Question {generalStep + 1} of {totalGeneralSteps}
              </span>
            </div>
            <div className="progress rounded-pill style-progress" style={{ height: '10px' }}>
              <div 
                className="progress-bar bg-gradient-primary rounded-pill transition-all" 
                role="progressbar" 
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="card-body p-4 p-md-5">
              <div className="mb-4">
                <span className="badge bg-light text-secondary border px-3 py-1 rounded-pill mb-2">
                  {currentQ.title}
                </span>
                <h3 className="fw-bold text-dark mb-2">{currentQ.question}</h3>
                <p className="text-muted">{currentQ.subtitle}</p>
              </div>

              {/* Validation Warning */}
              {validationError && (
                <div className="alert alert-danger d-flex align-items-center rounded-3 mb-4 py-2 px-3">
                  <FaExclamationTriangle className="me-2 flex-shrink-0" />
                  <div>{validationError}</div>
                </div>
              )}

              {/* Option List */}
              <div className="d-flex flex-column gap-3 mb-4">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = generalAnswers[currentQ.id] === opt.value;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectGeneralOption(currentQ.id, opt.value, opt.domain)}
                      className={`option-card p-3 rounded-3 border transition-all cursor-pointer d-flex align-items-center justify-content-between ${
                        isSelected 
                          ? 'bg-primary-subtle border-primary text-primary fw-bold shadow-sm option-card-selected' 
                          : 'bg-white text-dark hover-border-primary'
                      }`}
                    >
                      <div className="d-flex align-items-center">
                        <div className={`option-badge me-3 rounded-circle d-flex align-items-center justify-content-center ${
                          isSelected ? 'bg-primary text-white' : 'bg-light text-muted border'
                        }`} style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span>{opt.label}</span>
                      </div>
                      {isSelected && <FaCheckCircle className="text-primary fs-5" />}
                    </div>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                <button
                  onClick={handlePrevGeneral}
                  className="btn btn-outline-secondary px-4 rounded-pill fw-semibold"
                >
                  <FaArrowLeft className="me-2" /> Previous
                </button>

                <div className="d-flex gap-2">
                  {generalAnswers[currentQ.id] && (
                    <button
                      onClick={handleClearGeneralAnswer}
                      className="btn btn-link text-muted text-decoration-none px-3"
                    >
                      <FaRedo className="me-1" /> Clear Answer
                    </button>
                  )}
                  <button
                    onClick={handleNextGeneral}
                    className="btn btn-primary px-5 rounded-pill fw-bold shadow-sm"
                  >
                    Next Question <FaArrowRight className="ms-2" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Domain Technical Questions Step-by-Step
  if (phase === 'domain_test') {
    const currentQ = activeDomainQuestions[domainStep];
    const progressPct = Math.round(50 + ((domainStep + 1) / totalDomainSteps) * 50); // 50-100%

    return (
      <div className="assessment-wrapper py-5">
        <div className="container" style={{ maxWidth: '800px' }}>
          {/* Top Progress Header */}
          <div className="bg-white rounded-4 p-4 shadow-sm border mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-success-subtle text-success fw-bold px-3 py-2 rounded-pill">
                Step 2 of 2: {targetDomain} Knowledge Check
              </span>
              <span className="fw-bold text-muted">
                Question {domainStep + 1} of {totalDomainSteps}
              </span>
            </div>
            <div className="progress rounded-pill style-progress" style={{ height: '10px' }}>
              <div 
                className="progress-bar bg-success rounded-pill transition-all" 
                role="progressbar" 
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="card-body p-4 p-md-5">
              <div className="mb-4">
                <span className="badge bg-primary text-white px-3 py-1 rounded-pill mb-2">
                  Domain: {targetDomain}
                </span>
                <h3 className="fw-bold text-dark mb-2">{currentQ.question}</h3>
              </div>

              {/* Validation Error */}
              {validationError && (
                <div className="alert alert-danger d-flex align-items-center rounded-3 mb-4 py-2 px-3">
                  <FaExclamationTriangle className="me-2 flex-shrink-0" />
                  <div>{validationError}</div>
                </div>
              )}

              {/* Option List */}
              <div className="d-flex flex-column gap-3 mb-4">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = domainAnswers[currentQ.id] === opt;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectDomainOption(currentQ.id, opt)}
                      className={`option-card p-3 rounded-3 border transition-all cursor-pointer d-flex align-items-center justify-content-between ${
                        isSelected 
                          ? 'bg-success-subtle border-success text-success fw-bold shadow-sm option-card-selected' 
                          : 'bg-white text-dark hover-border-primary'
                      }`}
                    >
                      <div className="d-flex align-items-center">
                        <div className={`option-badge me-3 rounded-circle d-flex align-items-center justify-content-center ${
                          isSelected ? 'bg-success text-white' : 'bg-light text-muted border'
                        }`} style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <FaCheckCircle className="text-success fs-5" />}
                    </div>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                <button
                  onClick={handlePrevDomain}
                  className="btn btn-outline-secondary px-4 rounded-pill fw-semibold"
                >
                  <FaArrowLeft className="me-2" /> Previous
                </button>

                <div className="d-flex gap-2">
                  {domainAnswers[currentQ.id] && (
                    <button
                      onClick={handleClearDomainAnswer}
                      className="btn btn-link text-muted text-decoration-none px-3"
                    >
                      <FaRedo className="me-1" /> Clear Selection
                    </button>
                  )}
                  <button
                    onClick={handleNextDomain}
                    className="btn btn-success px-5 rounded-pill fw-bold shadow-sm"
                  >
                    {domainStep === totalDomainSteps - 1 ? 'Complete Assessment 🎉' : 'Next Question'} <FaArrowRight className="ms-2" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Assessment Completed Screen
  if (phase === 'completed' && finalResult) {
    const { recommendedCourse, matchPercentage, matchReasons, score, totalQuestions, alternatives } = finalResult;

    return (
      <div className="assessment-wrapper py-5">
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {/* Header Badge */}
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center bg-success text-white px-4 py-2 rounded-pill shadow-sm mb-3">
              <FaTrophy className="me-2 fs-5" /> Assessment Successfully Completed!
            </div>
            <h2 className="display-6 fw-extrabold text-dark mb-2">Your AI Skill Analysis Results</h2>
            <p className="text-muted">Here is your customized course recommendation & learning path.</p>
          </div>

          {/* Best Match Hero Box */}
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5 border-top border-primary border-4">
            <div className="card-body p-4 p-md-5">
              <div className="row align-items-center g-4">
                
                <div className="col-md-7">
                  <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-2">
                    🎯 YOUR BEST MATCH COURSE
                  </span>
                  <h2 className="fw-bold text-dark display-6 mb-2">{recommendedCourse.title}</h2>
                  <p className="text-muted mb-3">{recommendedCourse.description}</p>
                  
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {recommendedCourse.skillsCovered?.map((sk, i) => (
                      <span key={i} className="badge bg-light text-dark border px-2 py-1">
                        {sk}
                      </span>
                    ))}
                  </div>

                  <h6 className="fw-bold text-dark mb-2">Why this is your best match:</h6>
                  <ul className="list-unstyled mb-4">
                    {matchReasons.map((reason, idx) => (
                      <li key={idx} className="d-flex align-items-center text-secondary mb-2">
                        <FaCheckCircle className="text-success me-2 flex-shrink-0" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-md-5 text-center">
                  <div className="bg-light p-4 rounded-4 border">
                    <div className="position-relative d-inline-block mb-3">
                      <div 
                        className="rounded-circle d-flex align-items-center justify-content-center shadow-sm text-white bg-gradient-primary mx-auto"
                        style={{ width: '130px', height: '130px', fontSize: '2.5rem', fontWeight: 'bold' }}
                      >
                        {matchPercentage}%
                      </div>
                    </div>
                    <h5 className="fw-bold text-dark mb-1">Match Index</h5>
                    <p className="small text-muted mb-3">Quiz Score: {score}/{totalQuestions} Correct</p>

                    <button
                      onClick={handleViewRoadmap}
                      className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow-sm"
                    >
                      View Learning Roadmap <FaArrowRight className="ms-1" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Alternative Career Paths */}
          <div className="mb-5">
            <h4 className="fw-bold text-dark mb-3">Alternative Career Paths</h4>
            <div className="row g-3">
              {alternatives.map((alt, idx) => (
                <div key={idx} className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm rounded-4 p-3 hover-lift">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="badge bg-light text-primary border">{alt.domain}</span>
                          <span className="badge bg-success-subtle text-success fw-bold">{alt.matchPercentage}% Match</span>
                        </div>
                        <h5 className="fw-bold text-dark mb-2">{alt.title}</h5>
                        <p className="small text-muted mb-3">{alt.description.substring(0, 85)}...</p>
                      </div>

                      <button
                        onClick={() => {
                          enrollInCourse(alt);
                          navigate('/course-summary');
                        }}
                        className="btn btn-outline-primary btn-sm rounded-pill fw-semibold w-100 mt-2"
                      >
                        Explore Path
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions Footer */}
          <div className="d-flex justify-content-center gap-3">
            <button
              onClick={handleRestartAssessment}
              className="btn btn-outline-secondary rounded-pill px-4"
            >
              <FaRedo className="me-2" /> Retake Assessment
            </button>
            <button
              onClick={handleViewRoadmap}
              className="btn btn-success rounded-pill px-5 fw-bold shadow-sm"
            >
              Go to Student Roadmap & Dashboard
            </button>
          </div>

        </div>
      </div>
    );
  }

  return null;
};

export default SkillTest;