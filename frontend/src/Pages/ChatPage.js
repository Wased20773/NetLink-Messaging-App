import "../components/ChatsPage.css";
import { ChatState } from "../Context/ChatProvider";
import SideBar from "../components/SideBar";
import ChatBox from "../components/ChatBox";
import Account from "../components/miscellaneous/Account";
import DarkOrLight from "../components/miscellaneous/DarkOrLight";
import Favorites from "../components/miscellaneous/Favorites";
import MyChats from "../components/miscellaneous/MyChats";
import SearchBar from "../components/miscellaneous/SearchBar";
import Settings from "../components/miscellaneous/Settings";
import { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState(null);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isDataReady, setIsDataReady] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [clickedGroupChat, setClickedGroupChat] = useState(false);

  const [fetchAgain, setFetchAgain] = useState(false);

  const toggleAddUsersButton = () => {
    if (hasSearched) {
      setHasSearched(false);
    }
    setIsAdding((prevState) => !prevState);
  };

  useEffect(() => {
    if (user) {
      console.log("Currently logged in as...");
      console.log("Name: ", user.name);
      console.log("URL Picture: ", user.picture);
      setIsDataReady(true);
      setSearchResult([]);
    }
  }, [user]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (!search) {
      console.log("Nothing was entered");

      // check if we need to go back to messages
      if (isAdding) {
        toggleAddUsersButton();
      }
      setHasSearched(false);
      return;
    }
    setClickedGroupChat(false);

    console.log("Searching for", search);
    setHasSearched(true);

    // hid all tabcontents and only make messages visable.
    const tabContents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
    }
    document.getElementById("Messages").style.display = "flex";

    if (!isAdding) {
      toggleAddUsersButton();
    }

    // API call
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);

      // test out data
      console.log(data);
    } catch (error) {
      console.warn("Error Occured!");
    }
  };

  if (!isDataReady) {
    console.log("Data is not ready yet");
    return <div>Loading...</div>;
  }

  return (
    <div className="chatpage-container">
      {/* Sidebar */}
      <div className="sidebar-container">
        <SideBar />
      </div>

      {/* Contents Section */}
      <div className="contents-container">
        {/* Search Bar */}
        <div className="contents-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="25px"
            viewBox="0 -960 960 960"
            width="25px"
            fill="black"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>

          <input
            className="input-search"
            type="text"
            name="search"
            id="search"
            placeholder="Search User"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={handleSearch}>
            Go
          </button>
        </div>

        {/* Contents */}
        <div className="contents-of-sidebar">
          <Account />
          <DarkOrLight />
          <Favorites
            user={user}
            loggedUser={loggedUser}
            refreshTrigger={refreshTrigger}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
          <MyChats
            toggleAddUsersButton={toggleAddUsersButton}
            isAdding={isAdding}
            loading={loading}
            setLoading={setLoading}
            hasSearched={hasSearched}
            searchResult={searchResult}
            user={user}
            chats={chats}
            setChats={setChats}
            loggedUser={loggedUser}
            setLoggedUser={setLoggedUser}
            setRefreshTrigger={setRefreshTrigger}
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            clickedGroupChat={clickedGroupChat}
            setClickedGroupChat={setClickedGroupChat}
          />
          <SearchBar />
          <Settings />
        </div>
      </div>

      {/* Chat Box */}
      <div className="chatbox-container">
        {/* ChatBox Bar */}
        <div className="chatbox-bar">
          {/* Kebab Button */}

          <button className="kebab-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
            </svg>
          </button>
        </div>
        {/* ChatBox Contents */}
        <div className="chatbox-content">
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
