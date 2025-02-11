import React, { useEffect, useState } from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const Homepage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const history = useHistory();
  const { setUser } = ChatState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    // For Testing
    // localStorage.removeItem("userInfo"); // Clear local storage
    // setUser(null); // Clear user in context
    // history.push("/"); // Redirect to homepage
    if (user) {
      console.log(user.name);
      console.log(user.email);
      console.log(user.password);
      console.log(user.picture);
    }
    // history.push("/chats");
    if (user) {
      setUser(user);
      history.push("/chats");
    }
  }, [history, setUser]);

  return (
    <div>
      <div className="header1-container">
        <h1 className="app-name-design">Net Link</h1>
      </div>

      {/* Tab Buttons */}
      <div className="auth-form">
        {isLogin ? (
          <Login toggleForm={() => setIsLogin(false)} />
        ) : (
          <Signup toggleForm={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default Homepage;
