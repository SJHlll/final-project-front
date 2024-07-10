import React, {
  createContext,
  useState,
  useEffect,
} from 'react';

export const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const savedState = localStorage.getItem('activeTab');
    if (savedState) {
      setActiveTab(Number(savedState));
    }
  }, []);

  const updateActiveTab = (tabIndex) => {
    setActiveTab(tabIndex);
    localStorage.setItem('activeTab', tabIndex);
  };

  return (
    <TabContext.Provider
      value={{ activeTab, updateActiveTab }}
    >
      {children}
    </TabContext.Provider>
  );
};
