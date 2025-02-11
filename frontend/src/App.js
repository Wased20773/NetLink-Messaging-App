import "./App.css";
import { Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div>
      <div className="signup-div-container">
        <Route path="/" component={Homepage} exact />
      </div>
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
