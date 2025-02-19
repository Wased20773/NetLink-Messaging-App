import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";
import UserBadgeItem from "../userAvatar/UserBadgeItem";

const GroupChat = () => {
  const [groupChatName, setgroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userToAdd, setUserToAdd] = useState("");

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.warn("Failed to load the search result");
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      console.warn("Please fill in the blanks");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      console.log("New Group Chat Created");
    } catch (error) {
      console.warn("Failed to Create the Group Chat!");
    }
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers.some((user) => user._id === userToAdd._id)) {
      console.warn("User already added");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <div className="create-group-chat-box">
      <div className="create-group-header">Create group chat</div>
      {/* Group Chat Name */}
      <div className="group-chat-group">
        <input
          className="group-chat-input"
          type="text"
          name="group-name"
          id="group-name"
          placeholder="Group Name"
          value={groupChatName}
          onChange={(e) => setgroupChatName(e.target.value)}
          required
        />
        <button className="set-group-chat-name-button">set</button>
      </div>
      {/* Users to Add */}
      <div className="group-chat-group">
        <input
          className="group-chat-input"
          type="text"
          name="user-name"
          id="user-name"
          placeholder="User to Add"
          //   value={userToAdd}
          onChange={(e) => handleSearch(e.target.value)}
          required
        />
        <button className="set-group-chat-name-button">set</button>
      </div>
      {/* Render search results */}
      {loading ? (
        <div>loading</div>
      ) : (
        searchResult
          ?.slice(0, 4)
          .map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => handleGroup(user)}
            />
          ))
      )}

      {/* List of Users Currently Added */}
      <div className="added-users-container">
        {/* Render Added Users */}
        {selectedUsers.map((u) => (
          <UserBadgeItem
            key={u._id}
            user={u}
            handleFunction={() => handleDelete(u)}
          />
        ))}
      </div>
      <button className="create-group-chat-button" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

export default GroupChat;
