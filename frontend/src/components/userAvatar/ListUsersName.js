import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";

const ListUsersName = () => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(false);
  }, [selectedChat]);

  const handleUserListButton = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleExit = () => {
    setSelectedChat(null);
  };

  return (
    <div className="chatbox-name">
      <button className="exit-chat-button" onClick={handleExit}>
        exit
      </button>
      <div>{selectedChat.chatName}</div>
      <button className="users-button" onClick={handleUserListButton}>
        users
      </button>

      {/* Modal for Listing Users */}
      <div className={`modal-container ${isModalOpen ? "show" : ""}`}>
        <div className="modal">
          <button className="exit-modal-button" onClick={handleUserListButton}>
            exit
          </button>
          <h2>Group Chat Users</h2>
          <div className="list-users-container">
            {selectedChat?.users
              ?.filter((chatUser) => chatUser._id !== user._id) // Filter out logged-in user
              .map((user) => (
                <div className="list-users" key={user._id}>
                  <img
                    className="picture-chat"
                    src={user.picture}
                    width={30}
                    height={30}
                  />
                  {user.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListUsersName;
