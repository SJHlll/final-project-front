import React, {
  createContext,
  useState,
  useEffect,
} from 'react';

export const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab !== null ? parseInt(savedTab, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const updateActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <TabContext.Provider
      value={{ activeTab, updateActiveTab }}
    >
      {children}
    </TabContext.Provider>
  );
};
