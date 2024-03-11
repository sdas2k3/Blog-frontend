/* eslint-disable react/prop-types */
import  { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    fetch("https://blog-backend-sdas2k3.vercel.app/api1/user/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, [userInfo]);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
};