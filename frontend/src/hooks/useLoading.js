import React, {useState, useEffect} from 'react';

const initialState = 50

export const LoadingContext = React.createContext(initialState);

export const LoadingProvider = ({children}) => {
  const  [progress, setProgress] = useState(0);

  React.useEffect(() => {}, [progress]);

  return (
    <LoadingContext.Provider value={{ progress, setProgress }}>
      {children}
    </LoadingContext.Provider>
  );
}

