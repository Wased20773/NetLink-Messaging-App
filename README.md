**Author**: *Bryan Vazquez*
<br/>
**Course**: *CS314*
<br/>
**Professor**: *Fei Xie*
<br/>
**Completed Date**: *3/10/2025*
# Report
### Project Overview

  NetLink is an instant messaging app that allows users to communicate through the internet. Users can create an account, and add users to chat with. If you want to chat with someone else you can freely do so by searching for someone else, only if they are already registered in the database. 

### Code Structure and Test
- `React`: My front-end, provides a user-friendly interface, with an easy-to-use system
- `NodeJS` + ExpressJS: My back-end, handles things like API routes, and logic for the server
- `MongoDB`: My database, stores all user information such as their credentials. It also stores chatrooms and message history.
<br/>
- The test performed in my system allowed for API testing and registration testing. So all the testing done is mainly on frontend processing, specifically covering authentication, and message sending. The test plan includes details about unit testing, feature testing, and system testing.

### Challenges Faced
  There are a ton of challenges faced when developing this application, however, the one that hits the nail for my development is using my own custom CSS code. Instead of relying on a CSS framework that has a built-in structure, I decided to create my own UI. This posed many challenges with specificity. With hundrounds or morelikey thousands of CSS code, it can be hard to keep track of what is doing what. It is especially harder if one block has more specificity than another. This makes tracking much harder as i was stil learning how to use CSS. So i was left with alot of bad css code at the beginning of the development phase.
  

### Additional Features Implemented

- `Typing-indicator`: users can see when the sender, or a user, is typing on the keyboard. This allows for a more engaging experience in communication, by getting instant feedback from the other side.
- `GroupChat-integration`: users can add multiple users into a group chat and chat simultaneously.
- `GroupChat-viewer`: users can see all users who are inside the group chat. This allows users to stay in-touch with who is inside the group chat at all times. The list updates whenever a user leaves the chatroom
- `Removing-a-chatroom`: users can remove themselves from a group chat as well as a one-on-one chat. If it is a one-on-one chat, both users get removed, however, this is only the same if there are only 2 people left in the group chat.
- `Favorites`: users get the ability to save specific chats as their favorites. The favorited chat gets stored in a tab, the star, where users can easily access it. great for saving important conversations and organization.


### How To Run:

To run the application locally, follow these steps:

- Clone the Repository: Use the following command to clone the repository to your local machine
  - `git clone git@github.com:Wased20773/NetLink-Messaging-App.git`

- Install all dependencies: Go into the `root` folder, `frontend` folder, and `backend` folder to download all dependencies required to run. use the command to install all dependencies in their respective location
  - `npm install`
  
- Run the application: follow the steps below to start servers
  - Start the backend server in the `root` folder: `npm start`
  - Start the frontend server in the `frontend` folder: `npm start`

- You can now access the application, it will open up automatically, or you can visit it while the server is active through this link
  - `http://localhost:3000/`
