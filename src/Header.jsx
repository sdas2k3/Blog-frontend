/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  // useEffect(() => {
  //   fetch("blog-backend-sdas2k3.vercel.app/api1/user/profile", {
  //     credentials: "include",
  //   }).then((response) => {
  //     response.json().then((userInfo) => {
  //       setUserInfo(userInfo);
  //     });
  //   });
  // }, []);
  function logout() {
    fetch("blog-backend-sdas2k3.vercel.app/api1/auth/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

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
