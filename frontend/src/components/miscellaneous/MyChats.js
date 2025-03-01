import React, { useEffect, useState } from "react";
import SearchChatsLoading from "../Loaders/SearchChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import {
  // toggleFavorite,
  getSender,
  getSenderPicture,
} from "../../config/ChatLogics";
import GroupChat from "./GroupChat";

const MyChats = ({
  toggleAddUsersButton,
  isAdding,
  loading,
  setLoading,
  hasSearched,
  searchResult,
  user,
  setLoadingChat,
  chats,
  setChats,
  loggedUser,
  setLoggedUser,
  setRefreshTrigger,
  fetchAgain,
  setFetchAgain,
}) => {
  const { selectedChat, setSelectedChat } = ChatState();
  const [selectedKebab, setSelectedKebab] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [clickedGroupChat, setClickedGroupChat] = useState(false);
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
  }, [fetchAgain]);

  // console.log("Logged: ", loggedUser);
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

  const HandleSelectedChat = (chat) => {
    if (selectedChat === chat) {
      // if the same chat was selected again,
      setSelectedChat(null);
      return;
    }
    setSelectedChat(chat);
  };

  const toggleFavorite = async (chatId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.put(
        `/api/chat/favorite/${chatId}`,
        {},
        config
      );
      // console.log("API response:", data);
      if (!data || !data.favorites) {
        throw new Error("Invalid response format");
      }

      // if (!data.ok) throw new Error("Failed to update favorite status");

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === chatId
            ? { ...chat, favorites: data.favorites } // Update favorites array with response
            : chat
        )
      );

      setRefreshTrigger((prev) => !prev); // Toggle refreshTrigger to update Favorites.js
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const handleRemove = async (chat) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // make sure to remove the user from the favorite list before removing
      // prevents chat from showing up in favorites tab
      toggleFavorite(chat._id);

      if (chat.users.length === 2) {
        // Delete the chat (now works for one-on-one and small group chats)
        await axios.delete(`/api/chat/${chat._id}`, config);
        setSelectedChat(null);
      } else if (chat.isGroupChat && chat.users.length > 2) {
        // Remove user from group chat
        await axios.put(
          `/api/chat/groupremove`,
          { chatId: chat._id, userId: user._id },
          config
        );

        setSelectedChat(null);
      }

      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.warn("Error: Could not leave/delete the chat", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCreateGroupChat = () => {
    setClickedGroupChat((prevState) => !prevState);
  };

  const checkFavorite = (chat) => {
    return chat.favorites.includes(loggedUser._id);
  };

  const handleKebab = (chat, event) => {
    event.stopPropagation();

    setSelectedKebab(selectedKebab === chat._id ? null : chat._id);
  };

  // Handle the kebab button being clicked outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".kebab-chat-container")) {
        setSelectedKebab(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  if (!loggedUser) {
    return <div>Loading...</div>;
  }

  return (
    <div id="Messages" className="tabcontent">
      {/* Add Button */}
      <div>
        <button
          className="add-button"
          onClick={(e) => {
            toggleAddUsersButton(e);
            toggleCreateGroupChat(e);
          }}
        >
          {console.log(clickedGroupChat)}
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
      <div className="contents-separater">
        <div className="separater-line"></div>
      </div>
      <div className="chat-container">
        {clickedGroupChat ? <GroupChat /> : ""}
        <div
          className="content-info"
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
                      ? "rgb(58, 137, 206)" // tuffs-blue
                      : "white",
                  color:
                    selectedChat && selectedChat._id === chat._id
                      ? "white"
                      : "black",
                  display: isAdding ? "none" : "flex",
                }}
                onClick={() => HandleSelectedChat(chat)}
              >
                {/* Display image */}
                <img
                  className="picture-chat"
                  src={
                    chat.isGroupChat
                      ? chat.picture ||
                        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                      : getSenderPicture(loggedUser, chat.users)
                  }
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
                    onClick={(e) => handleKebab(chat, e)}
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
                    <div
                      className="kebab-options-group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="kebab-option-buttons"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(chat);
                        }}
                      >
                        Leave
                      </button>
                      <button
                        className="kebab-option-buttons"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(chat._id);
                        }}
                      >
                        {!checkFavorite(chat) ? "Favorite" : "Unfavorite"}
                      </button>

                      {/* How to access the chats here */}
                      {/* {console.log(
                        "users name: ",
                        !chat.isGroupChat
                          ? getSender(loggedUser, chat.users)
                          : chat.chatName
                      )} */}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <SearchChatsLoading />
        )}
      </div>
      <div className="chat-container">
        <div className="content-info"></div>
        {hasSearched &&
          (loading ? (
            <SearchChatsLoading />
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
