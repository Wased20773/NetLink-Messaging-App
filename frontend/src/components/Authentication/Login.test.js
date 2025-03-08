import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import ChatState from "../../Context/ChatProvider"; // Use ChatProvider, not ChatState
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

describe("Login", () => {
  test("Test if login credentials match with entered values", async () => {
    render(
      <MemoryRouter>
        <ChatState>
          <Login />
        </ChatState>
      </MemoryRouter>
    );

    // screen.debug();

    const emailInput = screen.getByPlaceholderText("Email Address*");
    const passwordInput = screen.getByPlaceholderText("Password*");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("Password123");
  });

  test("Test if login is successful", async () => {
    axios.post.mockResolvedValue({
      data: {
        message: "Login Successful",
        userInfo: { id: 1, email: "test@example.com" },
      },
    });

    const setItemMock = jest.fn();
    const getItemMock = jest.fn().mockReturnValue(null); // Mocking localStorage.getItem as well
    Object.defineProperty(window, "localStorage", {
      value: {
        setItem: setItemMock,
        getItem: getItemMock,
      },
    });
    render(
      <MemoryRouter>
        <ChatState>
          <Login />
        </ChatState>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginButton = screen.getByTestId("login-button"); // Make sure to use the correct testId for your button

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });

    fireEvent.click(loginButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(axios.post).toHaveBeenCalledWith(
      "/api/user/login",

      { email: "test@example.com", password: "12345" },
      { headers: { "Content-type": "application/json" } }
    );

    expect(setItemMock).toHaveBeenCalledWith(
      "userInfo",
      JSON.stringify({
        message: "Login Successful",
        userInfo: { id: 1, email: "test@example.com" },
      })
    );
  });
});
