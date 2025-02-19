import React from "react";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <div className="added-users-to-group-chat-bubble">
      {user.name}
      <button className="remove-user-from-group-chat" onClick={handleFunction}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="12px"
          viewBox="0 -960 960 960"
          width="12px"
          fill="var(--Poppy)"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>
    </div>
  );
};

export default UserBadgeItem;
