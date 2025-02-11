import React from "react";

const UserListItem = ({ user, handleFunction }) => {
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

      <button className="add-user-button" onClick={handleFunction}>
        Start Chat
      </button>
    </div>
  );
};

export default UserListItem;
