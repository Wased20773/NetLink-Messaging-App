import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSender, getSenderPicture } from "../../config/ChatLogics";

const Favorites = ({
  user,
  loggedUser,
  refreshTrigger,
  selectedChat,
  setSelectedChat,
}) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get("/api/chat/favorites", config);
        setFavorites(data);
      } catch (error) {
        console.warn("Failed to fetch favorites");
      }
    };

    fetchFavorites();
  }, [user, refreshTrigger]);

  if (!user) return <div>Loading...</div>;

  // if (!selectedChat) return;

  return (
    <div id="Favorites" className="tabcontent">
      {favorites.length === 0 ? (
        <div className="content-info"></div>
      ) : (
        <div className="content-info">Your Favorite Chats</div>
      )}
      <div className="chat-container">
        {favorites.length === 0 ? (
          <div className="content-info">You Have No Favorite Chats</div>
        ) : (
          favorites.map((chat) => (
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
