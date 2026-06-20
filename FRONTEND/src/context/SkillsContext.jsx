import React, { createContext, useState, useEffect } from 'react';

// Create a context for skills
export const SkillsContext = createContext();

export const SkillsProvider = ({ children }) => {
  const [interestedSkills, setInterestedSkills] = useState([]);
  const [recommendationLevel, setRecommendationLevel] = useState("");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    location: '',
    skills: []
  });

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedProfile = localStorage.getItem('userProfile');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // Load profile if available
        if (storedProfile) {
          const parsedProfile = JSON.parse(storedProfile);
          setProfileData(parsedProfile);
        } else if (parsedUser) {
          // Initialize profile from user data
          setProfileData({
            name: parsedUser.name || '',
            email: parsedUser.email || '',
            location: parsedUser.location || '',
            skills: parsedUser.skills || []
          });
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('userProfile');
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setProfileData({
      name: userData.name || '',
      email: userData.email || '',
      location: userData.location || '',
      skills: userData.skills || []
    });
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const updateProfile = (newProfileData) => {
    setProfileData(newProfileData);
    localStorage.setItem('userProfile', JSON.stringify(newProfileData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setProfileData({
      name: '',
      email: '',
      location: '',
      skills: []
    });
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
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
        updateProfile
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};
