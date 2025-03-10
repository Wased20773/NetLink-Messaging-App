import "../components/ChatsPage.css";
import React from "react";
import { openTab } from "../components/miscellaneous/SideBarTabFunctionality";
import { ChatState } from "../Context/ChatProvider";
// import { useState } from "react";

const SideBar = () => {
  const { user } = ChatState();

  const handleTabClick = (event, tabName) => {
    openTab(event, tabName);
  };

  return (
    <div className="sidebar">
      {/* Message Button */}
      <div className="sidebar-button">
        <button
          className="tab-link"
          data-tab="Messages"
          onClick={(e) => handleTabClick(e, "Messages")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 -960 960 960"
            width="25px"
            fill="black"
          >
            <path d="M310.67-522q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5ZM482-522q17 0 28.5-11.5T522-562q0-17-11.5-28.5T482-602q-17 0-28.5 11.5T442-562q0 17 11.5 28.5T482-522Zm166.67 0q17 0 28.5-11.5t11.5-28.5q0-17-11.5-28.5t-28.5-11.5q-17 0-28.5 11.5t-11.5 28.5q0 17 11.5 28.5t28.5 11.5ZM80-80v-733.33q0-27 19.83-46.84Q119.67-880 146.67-880h666.66q27 0 46.84 19.83Q880-840.33 880-813.33v506.66q0 27-19.83 46.84Q840.33-240 813.33-240H240L80-80Zm131.33-226.67h602v-506.66H146.67v575l64.66-68.34Zm-64.66 0v-506.66 506.66Z" />
          </svg>
        </button>
      </div>

      {/* Favorite Button */}
      <div className="sidebar-button">
        <button
          className="tab-link"
          data-tab="Favorites"
          onClick={(e) => handleTabClick(e, "Favorites")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 -960 960 960"
            width="25px"
            fill="black"
          >
            <path d="M333.33-259 480-347l146.67 89-39-166.67 129-112-170-15L480-709l-66.67 156.33-170 15 129 112.34-39 166.33ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-353.33Z" />
          </svg>
        </button>
      </div>

      {/* Account Button */}
      <div className="sidebar-button">
        <div className="account-button">
          <button
            className="tab-link"
            data-tab="Account"
            onClick={(e) => handleTabClick(e, "Account")}
          >
            <img className="sidebar-users-picture" src={user.picture} />
            {user.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
