import React, { useEffect, useRef } from "react";
import { ChatState } from "../Context/ChatProvider";
import { getFormatedDate } from "../config/ChatLogics";

const Messages = ({ messages }) => {
  const { user } = ChatState();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "instant",
        block: "end",
      });
    }
  }, [messages]);

  console.log(messages);
  return (
    <div>
      {messages &&
        messages.map((m, i) => (
          <div className="messages" key={m._id || i}>
            {m.sender._id === user._id ? (
              <div className="user">
                <div className="user-bubble-message">
                  {/* User Messages */}
                  <div className="message">{m.content}</div>
                  <div className="timestamp">
                    {getFormatedDate(m.createdAt)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="sender">
                {/* Senders Messages */}
                <div className="sender-name">{m.sender.name}</div>
                <div className="sender-bubble-message">
                  <div className="message">{m.content}</div>
                  <div className="timestamp">
                    {getFormatedDate(m.createdAt)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      <div ref={lastMessageRef} />
    </div>
  );
};

export default Messages;
