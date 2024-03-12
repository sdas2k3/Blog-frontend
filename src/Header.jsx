/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    fetch("https://blog-backend-sdas2k3.vercel.app/api1/user/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);
  function logout() {
    fetch("https://blog-backend-sdas2k3.vercel.app/api1/auth/logout", {
      credentials: "include",
      method: "POST",
    });
    setRedirect(true);
    setUserInfo(null);
  }

  const username = userInfo?.username;

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
