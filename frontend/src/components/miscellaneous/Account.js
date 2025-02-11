import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { useHistory } from "react-router-dom";

const Account = () => {
  const { user, setUser } = ChatState();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setUser(null); // just added
    history.push("/");
  };

  return (
    <div id="Account" className="tabcontent">
      <img
        className="contents-users-picture"
        src={user.picture}
        alt="profile picture"
      />
      <div>Name: {user.name}</div>
      <div>Email: {user.email}</div>
      <div>
        <button onClick={(e) => logoutHandler(e, "Account")}>Logout</button>
      </div>
    </div>
  );
};

export default Account;
