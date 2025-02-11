import { createPortal } from "react-dom";

export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderPicture = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].picture : users[0].picture;
};

export const createFavorite = (chat) => {
  if (!chat.favorite) {
    console.log("Added to Favorites");
    return (chat.favorite = true);
  }
};

export const KebabMenu = ({ isVisible, position, menuRef }) => {
  if (!isVisible) return null;

  return createPortal(
    <div
      ref={menuRef}
      className="kebab-options-group show"
      style={{ position: "absolute", top: position.top, left: position.left }}
    >
      <button className="kebab-option-buttons">Delete</button>
      <button className="kebab-option-buttons">Favorite</button>
      <button className="kebab-option-buttons">Mute</button>
    </div>,
    document.body
  );
};
