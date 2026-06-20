import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Importing the star icons

const ExploreMoreCourses = ({ courses, onCourseSelect }) => {
  const openCourseLink = (course) => {
    if (course?.courseLink) {
      window.open(course.courseLink, '_blank');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25; // Check for half star

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key={fullStars} className="text-warning" />);
    }

    // Ensure we don't add more stars than 5
    while (stars.length < 5) {
      stars.push(<FaStar key={stars.length} className="text-muted" />);
    }

    return stars;
  };

  const renderCourseCard = (course) => (
    <div className="col-md-3 mb-4" key={course.title}>
      <div className="card text-center shadow-sm border-light course-card" style={{ borderRadius: '10px', height: '500px', position: 'relative', cursor: 'pointer' }} onClick={() => openCourseLink(course)}>
        {course.label && (
          <span className="badge" style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: course.labelStyle?.backgroundColor }}>
            {course.label}
          </span>
        )}
        <img
          src={course.imageUrl}
          alt={course.title}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', cursor: 'pointer' }}
          onClick={(e) => { e.stopPropagation(); openCourseLink(course); }}
        />
        <div className="card-body">
          <h5 className="card-title" onClick={(e) => { e.stopPropagation(); openCourseLink(course); }} style={{ cursor: 'pointer' }}>
            {course.title}
          </h5>
          <p className="card-text"><strong>Instructor:</strong> {course.instructor}</p>
          <div className="d-flex justify-content-center align-items-center mb-2">
            {renderStars(course.rating)}
            <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>{course.rating}</span>
          </div>
          <p className="card-text mt-2">
            <small>{course.enrollments} Enrollments | {course.duration}</small>
          </p>
          <p className="card-text">
            <strong style={{ cursor: 'pointer' }}>{course.price}</strong>
          </p>
          <button className="btn btn-primary" onClick={(e) => e.stopPropagation()}>
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );

  const renderCourseSection = (title, courseList) => (
    <>
      <h3 className="text-left mb-4" style={{ fontSize: '2rem', marginBottom: '30px', fontFamily: 'Verdana, sans-serif' }}>
        {title}
      </h3>
      <div className="row mb-5">
        {courseList.map(renderCourseCard)}
      </div>
    </>
  );

  return (
    <div className="container my-5">
      {renderCourseSection('Top Courses in Web Development', courses.development)}
      {renderCourseSection('Top Courses in Machine Learning', courses.machineLearning)}
      {renderCourseSection('Other Courses', courses.others)}
    </div>
  );
};

export default ExploreMoreCourses;
