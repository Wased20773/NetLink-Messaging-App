import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Signup = ({ toggleForm }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [picture, setPicture] = useState();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { setUser } = ChatState();

  const postDetails = async (picture) => {
    setLoading(true);
    if (picture === undefined) {
      console.warn("Please select an Image!");
      setLoading(false);
      return;
    }
    if (picture.type === "image/jpeg" || picture.type === "image/png") {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmpassword) {
      console.warn("Please fill in all the fields");
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      console.warn("Password does not match");
      setLoading(false);
      return;
    }

    try {
      let uploadedPicture = picture;

      if (uploadedPicture instanceof File) {
        uploadedPicture = await postDetails(uploadedPicture);
        if (!uploadedPicture) {
          console.warn("Image upload failed");
          setLoading(false);
        }
      }

      const config = {
        header: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          picture: uploadedPicture,
        },
        config
      );

      console.log("--- Registration Successful ---");
      // console.log("Name: ", data.name);
      // console.log("Email: ", data.email);
      // console.log("Picture URL: ", data.picture);

      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data);
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      console.error("Error Occured!");
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={submitHandler}>
      <div className="button-group">
        <input
          className="form-button"
          type="button"
          value="Login"
          onClick={toggleForm}
        />
        <input className="form-button" type="button" value="Signup" />
      </div>

      {/* Name */}
      <input
        className="signup-input-field"
        type="text"
        name="name"
        id="name"
        placeholder="First Name*"
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Email */}
      <input
        className="signup-input-field"
        type="text"
        name="email"
        id="email"
        placeholder="Email Address*"
        onChange={(e) => setEmail(e.target.value)}
        required
        maxLength={18}
      />

      {/* Password */}
      <div className="password-container">
        <input
          className="signup-input-field"
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Password*"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "hide" : "show"}
        </span>
      </div>

      {/* Confirm Password */}
      <div className="password-container">
        <input
          className="signup-input-field"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password*"
          onChange={(e) => setConfirmpassword(e.target.value)}
          required
        />
        <span
          className="toggle-password"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? "hide" : "show"}
        </span>
      </div>

      {/* Profile Picture */}
      <div className="signup-file-selector">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPicture(e.target.files[0])}
          // onChange={(e) => postDetails(e.target.files[0])}
        />
      </div>

      {/* Signup Button */}
      <div className="button-group">
        <input
          className="submit-button"
          type="submit"
          value="Signup"
          // disabled={loading}
          isLoading={loading}
        />
      </div>
    </form>
  );
};

export default Signup;
