import "../App.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { SkillsContext } from "../context/SkillsContext";
import SkillForgeImage from "../assets/SkillForge_5.jpg";
import Chatbot from "./Chatbot";
import { 
  FaHome, 
  FaBookOpen, 
  FaClipboardCheck, 
  FaUserGraduate, 
  FaEnvelope, 
  FaSearch, 
  FaSignOutAlt, 
  FaSignInAlt, 
  FaUserPlus,
  FaMapMarkedAlt
} from "react-icons/fa";

function Header() {
  const { isAuthenticated, user, logout } = useContext(SkillsContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-sticky bg-dark-gradient border-bottom border-dark border-opacity-25 shadow-sm sticky-top">
      <div className="container-fluid px-4 py-2">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          
          {/* Brand Logo */}
          <Link to="/" className="d-flex align-items-center text-white text-decoration-none me-3">
            <img
              src={SkillForgeImage}
              alt="SkillForge Logo"
              height="45"
              className="rounded-3 shadow-sm me-2 bg-white p-1"
            />
            <span className="fw-extrabold fs-4 tracking-tight bg-gradient-brand text-transparent bg-clip-text">
              SkillForge
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="nav me-auto mb-2 mb-md-0 d-none d-md-flex align-items-center gap-1">
            <Link 
              to="/" 
              className={`nav-link px-3 py-2 rounded-pill transition-all fw-semibold ${
                isActive('/') || isActive('/home') ? 'bg-primary text-white shadow-sm' : 'text-light opacity-85 hover-opacity-100'
              }`}
            >
              <FaHome className="me-1 mb-1" /> Home
            </Link>

            <Link 
              to="/courses" 
              className={`nav-link px-3 py-2 rounded-pill transition-all fw-semibold ${
                isActive('/courses') ? 'bg-primary text-white shadow-sm' : 'text-light opacity-85 hover-opacity-100'
              }`}
            >
              <FaBookOpen className="me-1 mb-1" /> Explore Courses
            </Link>

            <Link 
              to="/skill-assessment" 
              className={`nav-link px-3 py-2 rounded-pill transition-all fw-semibold ${
                isActive('/skill-assessment') ? 'bg-warning text-dark shadow-sm fw-bold' : 'text-light opacity-85 hover-opacity-100'
              }`}
            >
              <FaClipboardCheck className="me-1 mb-1 text-warning" /> Skill Assessment
            </Link>

            <Link 
              to="/course-summary" 
              className={`nav-link px-3 py-2 rounded-pill transition-all fw-semibold ${
                isActive('/course-summary') ? 'bg-primary text-white shadow-sm' : 'text-light opacity-85 hover-opacity-100'
              }`}
            >
              <FaMapMarkedAlt className="me-1 mb-1" /> Roadmap
            </Link>

            <Link 
              to="/my-profile" 
              className={`nav-link px-3 py-2 rounded-pill transition-all fw-semibold ${
                isActive('/my-profile') ? 'bg-primary text-white shadow-sm' : 'text-light opacity-85 hover-opacity-100'
              }`}
            >
              <FaUserGraduate className="me-1 mb-1" /> Dashboard
            </Link>

            <Link 
              to="/contact" 
              className={`nav-link px-3 py-2 rounded-pill transition-all fw-semibold ${
                isActive('/contact') ? 'bg-primary text-white shadow-sm' : 'text-light opacity-85 hover-opacity-100'
              }`}
            >
              <FaEnvelope className="me-1 mb-1" /> Contact
            </Link>
          </nav>

          {/* Right Action Bar: Search, Chatbot, User Account */}
          <div className="d-flex align-items-center gap-3">
            
            {/* Search Input */}
            <form
              className="position-relative d-none d-lg-block"
              style={{ width: '220px' }}
              onSubmit={(e) => {
                e.preventDefault();
                if (searchTerm.trim()) {
                  navigate(`/courses?q=${encodeURIComponent(searchTerm.trim())}`);
                } else {
                  navigate('/courses');
                }
              }}
            >
              <input
                type="search"
                className="form-control form-control-sm rounded-pill bg-dark text-white border-secondary ps-4 pe-3 py-2"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="position-absolute start-0 top-50 translate-middle-y ms-2 text-muted small" />
            </form>

            {/* AI Assistant Chatbot Widget */}
            <Chatbot />

            {/* Authentication Buttons / Profile */}
            <div className="text-end">
              {isAuthenticated ? (
                <div className="d-flex align-items-center gap-2">
                  <span className="text-white small fw-bold d-none d-sm-inline">
                    {user?.name || user?.email || 'Learner'}
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger rounded-pill px-3 fw-bold"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-1" /> Logout
                  </button>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <Link to="/login" className="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold">
                    <FaSignInAlt className="me-1" /> Login
                  </Link>
                  <Link to="/signup" className="btn btn-sm btn-warning rounded-pill px-3 fw-bold shadow-sm">
                    <FaUserPlus className="me-1" /> Sign Up
                  </Link>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
