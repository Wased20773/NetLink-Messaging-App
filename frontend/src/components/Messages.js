import React from "react";
import { ChatState } from "../Context/ChatProvider";

const Messages = ({ messages }) => {
  const { user } = ChatState();
  console.log(messages);
  return (
    <div className="messages">
      {messages &&
        messages.map((m, i) => (
          <div>
            {m._id === user._id ? (
              <div className="user">
                <div className="user-message">{m.content}</div>
              </div>
            ) : (
              <div className="sender">
                <div className="sender-name">Bro</div>
                <div className="sender-message">{m.content}</div>
              </div>
            )}
          </div>
        ))}
      {/* <div className="user">
        <div className="user-message">hello</div>
      </div>
      <div className="sender">
        <div className="sender-name">Bro</div>
        <div className="sender-message">hi</div>
      </div>
      <div className="user">
        <div className="user-message">what are you doing</div>
      </div>
      <div className="sender">
        <div className="sender-name">Bro</div>
        <div className="sender-message">nothing much... what about u?</div>
      </div>
      <div className="user">
        <div className="user-message">just playing on my phone :)</div>
      </div>
      <div className="user">
        <div className="user-message">You wanna do something later?</div>
      </div>
      <div className="sender">
        <div className="sender-name">Bro</div>
        <div className="sender-message">
          oh yea fs, what you planning to do tmr
        </div>
      </div>
      <div className="sender">
        <div className="sender-name">Bro</div>
        <div className="sender-message">
          i dont got work tmr so it be perfect!!! *o*
        </div>
      </div>
      <div className="user">
        <div className="user-message">Oh ok, lets make a plan</div>
      </div>
      <div className="user">
        <div className="user-message">
          Heres my what i plan to do tmr... go to the store and buy milk, get
          milk, eggs, paper, and water, go to the gym, and finish everything by
          2pm
        </div>
      </div>
      <div className="sender">
        <div className="sender-name">Bro</div>
        <div className="sender-message">
          ooh i will come over to your place at 2pm?
        </div>
      </div>
      <div className="user">
        <div className="user-message">sure!</div>
      </div>
      <div className="user">
        <div className="user-message">see you then</div>
      </div>
      <div className="sender">
        <div className="sender-name">Bro</div>
        <div className="sender-message">bye bye</div>
      </div>
      <div className="user">
        <div className="user-message">cya :)</div>
      </div> */}
    </div>
  );
};

export default Messages;
