import React from "react";
import CircleLoading from "../Loaders/CircleLoading";
const UserListItem = ({ user, handleFunction, loadingChat, buttonMessage }) => {
  return (
    <div className="chat-button">
      <img
        className="picture-chat"
        src={user.picture}
        alt="users profile picture"
        width={40}
        height={40}
      />

      <div>{user.name}</div>

      {loadingChat ? (
        <div className="add-user-button">
          <div className="circle-loader-container">
            <CircleLoading />
          </div>
        </div>
      ) : (
        <button className="add-user-button" onClick={handleFunction}>
          {buttonMessage}
        </button>
      )}
    </div>
  );
};

export default UserListItem;
