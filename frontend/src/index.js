import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // React.StrictMode runs things in development mode to detect side affects
  // This happens only in developement mode, not the affected product
  // keep active to help with issues early on
  // <React.StrictMode>
  <BrowserRouter>
    <ChatProvider>
      <App />
    </ChatProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
