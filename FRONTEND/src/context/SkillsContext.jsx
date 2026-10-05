import React, { createContext, useState, useEffect } from 'react';

// Create a context for skills and learning platform state
export const SkillsContext = createContext();

export const SkillsProvider = ({ children }) => {
  const [interestedSkills, setInterestedSkills] = useState([]);
  const [recommendationLevel, setRecommendationLevel] = useState("");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Learner',
    email: 'student@skillforge.io',
    location: 'Remote',
    skills: ['JavaScript', 'Problem Solving']
  });

  // Assessment results state
  const [assessmentResults, setAssessmentResults] = useState(null);

  // Completed topics across learning roadmaps: key is `${courseId}_${topicId}` -> boolean
  const [completedTopics, setCompletedTopics] = useState({});

  // Enrolled courses state
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Active course selected for roadmap viewing
  const [activeCourseId, setActiveCourseId] = useState('web-dev-fullstack');

  // Load state from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedProfile = localStorage.getItem('userProfile');
    const storedAssessment = localStorage.getItem('assessmentResults');
    const storedCompletedTopics = localStorage.getItem('completedTopics');
    const storedEnrolled = localStorage.getItem('enrolledCourses');
    const storedActiveCourse = localStorage.getItem('activeCourseId');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        if (storedProfile) {
          setProfileData(JSON.parse(storedProfile));
        } else if (parsedUser) {
          setProfileData({
            name: parsedUser.name || 'Learner',
            email: parsedUser.email || 'student@skillforge.io',
            location: parsedUser.location || 'Remote',
            skills: parsedUser.skills || ['JavaScript']
          });
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }

    if (storedAssessment) {
      try {
        setAssessmentResults(JSON.parse(storedAssessment));
      } catch (e) {
        console.error('Error loading assessment results:', e);
      }
    }

    if (storedCompletedTopics) {
      try {
        setCompletedTopics(JSON.parse(storedCompletedTopics));
      } catch (e) {
        console.error('Error loading completed topics:', e);
      }
    }

    if (storedEnrolled) {
      try {
        setEnrolledCourses(JSON.parse(storedEnrolled));
      } catch (e) {
        console.error('Error loading enrolled courses:', e);
      }
    }

    if (storedActiveCourse) {
      setActiveCourseId(storedActiveCourse);
    }
  }, []);

  const saveAssessmentResult = (results) => {
    setAssessmentResults(results);
    localStorage.setItem('assessmentResults', JSON.stringify(results));

    if (results.recommendedCourseId) {
      setActiveCourseId(results.recommendedCourseId);
      localStorage.setItem('activeCourseId', results.recommendedCourseId);
    }

    if (results.interestedSkills && results.interestedSkills.length > 0) {
      setInterestedSkills(results.interestedSkills);
    }
  };

  const toggleTopicCompletion = (courseId, topicId) => {
    const key = `${courseId}_${topicId}`;
    const updated = {
      ...completedTopics,
      [key]: !completedTopics[key]
    };
    setCompletedTopics(updated);
    localStorage.setItem('completedTopics', JSON.stringify(updated));
  };

  const isTopicCompleted = (courseId, topicId) => {
    return !!completedTopics[`${courseId}_${topicId}`];
  };

  const enrollInCourse = (course) => {
    const exists = enrolledCourses.some(c => c.id === course.id);
    if (!exists) {
      const updated = [...enrolledCourses, course];
      setEnrolledCourses(updated);
      localStorage.setItem('enrolledCourses', JSON.stringify(updated));
    }
    setActiveCourseId(course.id);
    localStorage.setItem('activeCourseId', course.id);
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    const newProf = {
      name: userData.name || 'Learner',
      email: userData.email || '',
      location: userData.location || '',
      skills: userData.skills || []
    };
    setProfileData(newProf);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userProfile', JSON.stringify(newProf));
  };

  const updateProfile = (newProfileData) => {
    setProfileData(newProfileData);
    localStorage.setItem('userProfile', JSON.stringify(newProfileData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <SkillsContext.Provider 
      value={{ 
        interestedSkills, 
        setInterestedSkills,
        recommendationLevel,
        setRecommendationLevel,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        profileData,
        setProfileData,
        updateProfile,
        assessmentResults,
        saveAssessmentResult,
        completedTopics,
        toggleTopicCompletion,
        isTopicCompleted,
        enrolledCourses,
        enrollInCourse,
        activeCourseId,
        setActiveCourseId
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};

