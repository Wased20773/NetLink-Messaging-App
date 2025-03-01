import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import MessageChatLoading from "./Loaders/MessageChatLoading";
import axios from "axios";
import "./tabletstyle.css";
import Messages from "./Messages";

const ChatBox = (fetchAgain, setFetchAgain) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();

  const [loading, setLoading] = useState(false);

  const handleExit = () => {
    setSelectedChat(null);
  };

  const fetchMessages = async (event) => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      console.log("Messages fetched: ", messages);

      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.warn("Error Occured: could not get the chat messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        console.log("Message Sent Data: ", data);

        setMessages([...messages, data]);
      } catch (error) {
        console.warn("Failed to send the Message");
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // Typing Indicator Logic
  };

  return (
    <div className="chatbox">
      {/* Chat Name */}
      {selectedChat ? (
        <div className="chatbox-message-space">
          {!selectedChat.isGroupChat ? (
            <div className="chatbox-name">
              <button onClick={handleExit}>exit</button>
              {getSender(user, selectedChat.users)}
            </div>
          ) : (
            <div className="chatbox-name">{selectedChat.chatName}</div>
          )}
          {/* Messages go here */}
          <div className="messages-container">
            {loading ? (
              <MessageChatLoading />
            ) : (
              <Messages messages={messages} />
            )}
            {/* Input Field For Message Sending */}
            <div className="message-input-container">
              <div className="message-input-divider"></div>
              <form onSubmit={sendMessage} isRequired>
                <input
                  type="text"
                  name="message"
                  id="message"
                  onChange={typingHandler}
                  value={newMessage}
                  placeholder="Enter a Message..."
                />
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="messages-container-chat-not-selected">
          <div className="circle">No Chat Selected</div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
