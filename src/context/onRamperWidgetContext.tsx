import React, { createContext, useState } from 'react';

interface WidgetContextType {
    isWidgetOpen: boolean;
    toggleWidget: () => void;
  }

const defaultValue: WidgetContextType = {
    isWidgetOpen: false,
    toggleWidget: () => {},
  };
const WidgetContext = createContext<WidgetContextType>(defaultValue);

export const WidgetProvider = ({ children } : {children :any}) => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  const toggleWidget = () => {
    setIsWidgetOpen(!isWidgetOpen);
  };

  return (
    <WidgetContext.Provider value={{ isWidgetOpen, toggleWidget }}>
      {children}
    </WidgetContext.Provider>
  );
};

export default WidgetContext;
