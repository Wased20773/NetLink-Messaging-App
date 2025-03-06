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
      {/* Notification Button */}
      <div className="sidebar-button">
        <button className="tab-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 -960 960 960"
            width="25px"
            fill="black"
          >
            <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
          </svg>
        </button>
      </div>

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

      {/* Settings Button */}
      <div className="sidebar-button">
        <button
          className="tab-link"
          data-tab="Settings"
          onClick={(e) => handleTabClick(e, "Settings")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 -960 960 960"
            width="25px"
            fill="black"
          >
            <path d="m382-80-18.67-126.67q-17-6.33-34.83-16.66-17.83-10.34-32.17-21.67L178-192.33 79.33-365l106.34-78.67q-1.67-8.33-2-18.16-.34-9.84-.34-18.17 0-8.33.34-18.17.33-9.83 2-18.16L79.33-595 178-767.67 296.33-715q14.34-11.33 32.34-21.67 18-10.33 34.66-16L382-880h196l18.67 126.67q17 6.33 35.16 16.33 18.17 10 31.84 22L782-767.67 880.67-595l-106.34 77.33q1.67 9 2 18.84.34 9.83.34 18.83 0 9-.34 18.5Q776-452 774-443l106.33 78-98.66 172.67-118-52.67q-14.34 11.33-32 22-17.67 10.67-35 16.33L578-80H382Zm55.33-66.67h85l14-110q32.34-8 60.84-24.5T649-321l103.67 44.33 39.66-70.66L701-415q4.33-16 6.67-32.17Q710-463.33 710-480q0-16.67-2-32.83-2-16.17-7-32.17l91.33-67.67-39.66-70.66L649-638.67q-22.67-25-50.83-41.83-28.17-16.83-61.84-22.83l-13.66-110h-85l-14 110q-33 7.33-61.5 23.83T311-639l-103.67-44.33-39.66 70.66L259-545.33Q254.67-529 252.33-513 250-497 250-480q0 16.67 2.33 32.67 2.34 16 6.67 32.33l-91.33 67.67 39.66 70.66L311-321.33q23.33 23.66 51.83 40.16 28.5 16.5 60.84 24.5l13.66 110Zm43.34-200q55.33 0 94.33-39T614-480q0-55.33-39-94.33t-94.33-39q-55.67 0-94.5 39-38.84 39-38.84 94.33t38.84 94.33q38.83 39 94.5 39ZM480-480Z" />
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
