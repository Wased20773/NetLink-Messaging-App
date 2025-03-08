import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import MessageChatLoading from "./Loaders/MessageChatLoading";
import axios from "axios";
import "./tabletstyle.css";
import Messages from "./Messages";
import ListUsersName from "./userAvatar/ListUsersName";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const ChatBox = (fetchAgain, setFetchAgain) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

  const [loading, setLoading] = useState(false);

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

      // console.log("Messages fetched: ", messages);

      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.warn("Error Occured: could not get the chat messages");
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // give notification
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

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

        // console.log("Message Sent Data: ", data);

        socket.emit("new message", data);
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

  const adjustHeight = (e) => {
    e.target.style.height = "auto";

    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="chatbox">
      {selectedChat ? (
        <div className="chatbox-message-space">
          {!selectedChat.isGroupChat ? (
            // Chat Name
            <div className="chatbox-name">
              {/* {getSender(user, selectedChat.users)} */}
            </div>
          ) : (
            <ListUsersName />
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
              <form
                data-testid="send-message"
                onSubmit={sendMessage}
                isRequired
              >
                <textarea
                  className="message-textarea"
                  name="message"
                  id="message"
                  onChange={typingHandler}
                  onInput={adjustHeight}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault(); // Prevents a new line
                      sendMessage(e); // Submits the form
                    }
                  }}
                  value={newMessage}
                  placeholder="Enter a Message..."
                  rows="1"
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
