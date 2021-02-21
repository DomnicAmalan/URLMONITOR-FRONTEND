import React, { createContext, useState, useEffect } from 'react';
import { useHistory, Redirect} from 'react-router-dom';

export const AuthenticationContext  = createContext();

export const AuthenticationContextProvider = ({children}) => {
  const history = useHistory();
  const [IsAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken")
    if(!accessToken || !refreshToken){
      setIsAuthenticated(false);
      history.push('/app')
    }
    else{
      setIsAuthenticated(true);
      history.push("/app/dashboard")
    }
  }, [IsAuthenticated])

  return(
    <AuthenticationContext.Provider value={{IsAuthenticated}}>
      {children}
    </AuthenticationContext.Provider>
  )
}