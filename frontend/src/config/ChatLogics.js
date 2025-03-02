export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderPicture = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].picture : users[0].picture;
};

export const getFormatedDate = (timestamp) => {
  const formattedDate = new Date(timestamp).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // for 12-hour format (AM/PM)
  });
  return formattedDate;
};
