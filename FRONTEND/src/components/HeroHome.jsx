import '../App.css';
import SkillForgeImage from '../assets/hero-image_2.avif';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowRight, FaClipboardCheck, FaBookOpen, FaMagic, FaUserCheck, FaMapMarkedAlt, FaGraduationCap } from 'react-icons/fa';

function HeroHome() {
  const navigate = useNavigate();

  return (
    <section className="hero-section py-5 bg-gradient-dark text-white position-relative overflow-hidden">
      <div className="container py-4">
        <div className="row align-items-center g-5">
          
          {/* Hero Left Content */}
          <div className="col-lg-7">
            <div className="d-inline-flex align-items-center bg-white bg-opacity-10 border border-white border-opacity-20 px-3 py-2 rounded-pill mb-3">
              <FaMagic className="text-warning me-2" />
              <span className="small text-white fw-semibold">Skill-Based Adaptive AI Recommendation Engine</span>
            </div>

            <h1 className="display-4 fw-extrabold lh-sm mb-3 text-white">
              Accelerate Your Career with <span className="bg-gradient-brand text-transparent bg-clip-text">Personalized Learning Paths</span>
            </h1>

            <p className="lead opacity-90 mb-4 text-light" style={{ maxWidth: '620px' }}>
              SkillForge evaluates your goals, existing knowledge baseline, and learning preferences to deliver tailored course recommendations and interactive visual step-by-step roadmaps.
            </p>

            {/* Main Action Buttons */}
            <div className="d-flex flex-wrap gap-3 mb-5">
              <button 
                type="button" 
                className="btn btn-warning btn-lg px-4 py-3 rounded-pill fw-bold shadow-lg hover-lift d-flex align-items-center gap-2 text-dark"
                onClick={() => navigate('/skill-assessment')}
              >
                <FaClipboardCheck className="fs-5" /> Start Skill Assessment <FaArrowRight />
              </button>

              <button 
                type="button" 
                className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill fw-semibold hover-lift d-flex align-items-center gap-2"
                onClick={() => navigate('/courses')}
              >
                <FaBookOpen /> Explore Courses
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="row g-3 pt-3 border-top border-secondary border-opacity-30">
              <div className="col-4">
                <div className="fw-bold fs-3 text-warning">11+</div>
                <div className="small opacity-75">Tech Domains</div>
              </div>
              <div className="col-4">
                <div className="fw-bold fs-3 text-info">94%</div>
                <div className="small opacity-75">Recommendation Match</div>
              </div>
              <div className="col-4">
                <div className="fw-bold fs-3 text-success">100%</div>
                <div className="small opacity-75">Interactive Roadmaps</div>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Banner */}
          <div className="col-lg-5 text-center">
            <div className="position-relative d-inline-block">
              <img 
                src={SkillForgeImage} 
                className="img-fluid rounded-4 shadow-2xl border border-white border-opacity-10 position-relative z-1" 
                alt="SkillForge Adaptive Learning Platform" 
                style={{ maxHeight: '420px', objectFit: 'cover', width: '100%' }}
              />
              <div className="position-absolute bottom-0 start-0 translate-middle-x mb-4 ms-4 bg-white text-dark p-3 rounded-3 shadow-lg z-2 d-none d-md-block" style={{ width: '200px' }}>
                <div className="d-flex align-items-center gap-2">
                  <FaGraduationCap className="text-primary fs-3" />
                  <div className="text-start">
                    <div className="fw-bold small">AI Path Match</div>
                    <small className="text-success fw-bold">88% Verified</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroHome;