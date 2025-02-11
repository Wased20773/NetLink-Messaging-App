import React, { useEffect, useState } from "react";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import {
  createFavorite,
  getSender,
  getSenderPicture,
} from "../../config/ChatLogics";

const MyChats = ({
  toggleAddUsersButton,
  isAdding,
  loading,
  hasSearched,
  searchResult,
  user,
  setLoadingChat,
  setSelectedChat,
}) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, chats, setChats } = ChatState();

  const [selectedKebab, setSelectedKebab] = useState(false);

  // const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      // console.log(data);
      setChats(data);
    } catch (error) {
      console.warn("Failed to load the chats");
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // console.log("userInfo: ", userInfo);
    setLoggedUser(userInfo); // Store logged-in user info
    fetchChats();
  }, []);

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      onclose();
    } catch (error) {
      console.warn("Error fetching the chat");
    }
  };

  const handleKebab = (chatId, event) => {
    event.stopPropagation();

    setSelectedKebab(selectedKebab === chatId ? null : chatId);
  };

  if (!loggedUser) {
    return <div>Loading...</div>;
  }

  return (
    <div id="Messages" className="tabcontent">
      {/* Add Button */}
      <div>
        <button className="add-button" onClick={(e) => toggleAddUsersButton(e)}>
          {isAdding ? (
            <div className="svg-group-chat-button">
              <div>Go Back</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="black"
                className="back-svg-button"
              >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
              </svg>
            </div>
          ) : (
            <div className="svg-group-chat-button">
              <div>Create a Group Chat</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill="black"
                className="add-svg-button"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </div>
          )}
        </button>
      </div>
      <div className="contents-separater"></div>
      <div className="chat-container">
        <div
          className="info-your-chats"
          style={{ display: isAdding ? "none" : "flex" }}
        >
          your chats
        </div>
        {chats ? (
          <div>
            {chats.map((chat) => (
              <div
                className="chat-button"
                style={{
                  backgroundColor:
                    selectedChat && selectedChat._id === chat._id
                      ? "rgb(58, 137, 206)"
                      : "white",
                  color:
                    selectedChat && selectedChat._id === chat._id
                      ? "white"
                      : "black",
                  display: isAdding ? "none" : "flex",
                }}
                onClick={() => setSelectedChat(chat)}
              >
                <img
                  className="picture-chat"
                  src={getSenderPicture(loggedUser, chat.users)}
                  alt="users profile picture"
                  width={40}
                  height={40}
                />

                {/* display name */}
                <div>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>

                {/* Kebab Option Button */}
                <div
                  className="kebab-chat-container"
                  style={{ position: "relative" }}
                >
                  <button
                    className="kebab-button-chat"
                    onClick={(e) => handleKebab(chat._id, e)}
                  >
                    {selectedKebab === chat._id ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="black"
                      >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="black"
                      >
                        <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                      </svg>
                    )}
                  </button>

                  {/* Kebab Menu Options */}
                  {selectedKebab === chat._id && (
                    <div className="kebab-options-group">
                      <button className="kebab-option-buttons">Delete</button>
                      <button className="kebab-option-buttons">Favorite</button>
                      <button className="kebab-option-buttons">Mute</button>

                      {/* How to access the chats here */}
                      {console.log(
                        "users name: ",
                        !chat.isGroupChat
                          ? getSender(loggedUser, chat.users)
                          : chat.chatName
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
      <div className="chat-container">
        {hasSearched &&
          (loading ? (
            <ChatLoading />
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
                isDisabled={loading} // disables button when clicked
              />
            ))
          ))}
      </div>
    </div>
  );
};

export default MyChats;
