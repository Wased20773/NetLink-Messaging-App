import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";

const ChatBox = (fetchAgain, setFetchAgain) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  const [loading, setLoading] = useState(false);

  return (
    <div className="chatbox">
      {selectedChat ? (
        <div>
          {/* Chat Name */}
          {!selectedChat.isGroupChat ? (
            <div>
              {getSender(user, selectedChat.users)}
              <button>Remove Self</button>
            </div>
          ) : (
            <div>
              {selectedChat.chatName}
              <button>Remove Self</button>
            </div>
          )}
        </div>
      ) : (
        <div>No Chat Selected</div>
      )}

      {/* contents of chat room */}
      <div className="chatbox-contents">
        {selectedChat ? (
          <div>
            {/* Chat Name */}
            {!selectedChat.isGroupChat ? (
              <div>
                <div>Yo</div>
                <div>This is a test</div>
                <div>Realy?</div>
                <div>Yes Really!</div>
                <div>Ok, bye-bye</div>
              </div>
            ) : (
              <div>{selectedChat.chatName}</div>
            )}
          </div>
        ) : (
          <div>No Chat Selected</div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
