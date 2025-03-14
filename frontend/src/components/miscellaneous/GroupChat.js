import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import SearchChatsLoading from "../Loaders/SearchChatLoading";

const GroupChat = () => {
  const [groupChatName, setgroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [userToAdd, setUserToAdd] = useState("");
  const [picture, setPicture] = useState();

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

  const postDetails = async (picture) => {
    if (picture === undefined) {
      console.warn("Please select an Image!");
      return;
    }
    if (picture.type === "image/jpeg" || picture.type === "image/png") {
      const data = new FormData();
      data.append("file", picture);
      data.append("upload_preset", "NetLink");
      data.append("cloud_name", "netlink");
      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/netlink/image/upload",
          { method: "POST", body: data }
        );
        const result = await res.json();
        return result.url; // Return the image URL
      } catch (error) {
        console.error("Image upload failed", error);
        return null;
      }
    } else {
      console.warn("Please select an Image!");
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers || !picture) {
      console.warn("Please fill in the blanks");
      return;
    }

    setLoadingSubmit(true);

    try {
      let uploadedPicture = picture;

      if (uploadedPicture instanceof File) {
        uploadedPicture = await postDetails(uploadedPicture);
        if (!uploadedPicture) {
          console.warn("Image upload failed");
          setLoadingSubmit(false);
          return;
        }
      }

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
          picture: uploadedPicture,
        },
        config
      );

      console.log("API RESPONSE Data:", data);

      setChats([data, ...chats]);

      setLoadingSubmit(false);
      console.log("New Group Chat Created");
    } catch (error) {
      setLoadingSubmit(false);
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
      <input
        className="group-chat-input-file"
        type="file"
        accept="image/*"
        onChange={(e) => setPicture(e.target.files[0])}
        required
      />
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
      </div>
      {/* Render search results */}
      {loading ? (
        <div>
          <SearchChatsLoading />
          <SearchChatsLoading />
          <SearchChatsLoading />
          <SearchChatsLoading />
          <SearchChatsLoading />
          <SearchChatsLoading />
          <SearchChatsLoading />
          <SearchChatsLoading />
        </div>
      ) : (
        searchResult
          ?.filter((user) => !selectedUsers.some((u) => u._id === user._id)) // Filter out all the selected users
          .slice(0, 4)
          .map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => handleGroup(user)}
              buttonMessage="Add"
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
        {loadingSubmit ? (
          <div className="circle-loader-container">
            <div className="circle-loader"></div>
          </div>
        ) : (
          "Create"
        )}
      </button>
    </div>
  );
};

export default GroupChat;
