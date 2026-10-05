import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBookOpen, 
  FaClipboardList, 
  FaQuestionCircle, 
  FaCheckDouble, 
  FaRobot, 
  FaRoute, 
  FaChartLine, 
  FaArrowRight 
} from 'react-icons/fa';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: '01',
      title: 'Explore Courses',
      desc: 'Browse through 11+ specialized tech domains (Web Dev, Java, Python, AI/ML, Cloud, Security).',
      icon: <FaBookOpen className="text-primary fs-3" />
    },
    {
      step: '02',
      title: 'Start Skill Assessment',
      desc: 'Take our step-by-step adaptive questionnaire covering preferences and baseline knowledge.',
      icon: <FaClipboardList className="text-warning fs-3" />
    },
    {
      step: '03',
      title: 'General & Domain Questions',
      desc: 'Answer general goal questions followed by 5 quick technical domain questions.',
      icon: <FaQuestionCircle className="text-info fs-3" />
    },
    {
      step: '04',
      title: 'AI Recommendation Result',
      desc: 'Receive your match percentage, tailored reasons, and alternative career paths.',
      icon: <FaRobot className="text-success fs-3" />
    },
    {
      step: '05',
      title: 'Visual Learning Roadmap',
      desc: 'Follow an interactive node flowchart step by step and mark topics as completed.',
      icon: <FaRoute className="text-danger fs-3" />
    },
    {
      step: '06',
      title: 'Student Dashboard',
      desc: 'Track overall progress, current/next topic, skill proficiency, and completed checklists.',
      icon: <FaChartLine className="text-purple fs-3" />
    }
  ];

  return (
    <section className="py-5 bg-white position-relative">
      <div className="container py-4">
        <div className="text-center mb-5">
          <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-bold mb-2">
            STORY & WORKFLOW
          </span>
          <h2 className="display-6 fw-extrabold text-dark mb-2">How SkillForge Works</h2>
          <p className="text-muted lead" style={{ maxWidth: '650px', margin: '0 auto' }}>
            A seamless journey from initial curiosity to structured career skill mastery.
          </p>
        </div>

        <div className="row g-4">
          {steps.map((item, idx) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 hover-lift position-relative overflow-hidden bg-light">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="p-3 bg-white rounded-3 shadow-xs">
                    {item.icon}
                  </div>
                  <span className="fw-extrabold fs-4 text-muted opacity-50 font-monospace">
                    {item.step}
                  </span>
                </div>
                <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                <p className="small text-muted mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <button
            onClick={() => navigate('/skill-assessment')}
            className="btn btn-warning btn-lg px-5 py-3 rounded-pill fw-bold shadow-sm"
          >
            Start Your Free Assessment Now <FaArrowRight className="ms-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
