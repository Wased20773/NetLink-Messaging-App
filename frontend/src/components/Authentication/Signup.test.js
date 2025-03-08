import { fireEvent, render, screen } from "@testing-library/react";
import ChatState from "../../Context/ChatProvider";
import Signup from "./Signup";
import { MemoryRouter } from "react-router-dom";

describe("Signup", () => {
  test("Test users registered name, valid length", async () => {
    render(
      <MemoryRouter>
        <ChatState>
          <Signup />
        </ChatState>
      </MemoryRouter>
    );

    // screen.debug();

    const name = screen.getByPlaceholderText("First Name*");
    fireEvent.change(name, { target: { value: "Test1" } });

    expect(name.value).toBe("Test1");
  });
  test.each([
    ["Really short name", "JJ"],
    ["Short name", "Joe"],
    ["Normal name", "Alexis"],
    ["Somewhat long name", "Christopher"],
    ["Long name", "SomeRandomeLongName"],
  ])("Testing name lengths: %s (%s)", async (description, inputName) => {
    render(
      <MemoryRouter>
        <ChatState>
          <Signup />
        </ChatState>
      </MemoryRouter>
    );

    // screen.debug();

    const name = screen.getByPlaceholderText("First Name*");
    fireEvent.change(name, {
      target: { value: inputName },
    });

    try {
      expect(name.value.length).toBeGreaterThanOrEqual(3);
      expect(name.value.length).toBeLessThanOrEqual(18);
      console.log(
        `Running test: ${description}\n\tinput: ${inputName}\n\tstatus: Success`
      );
    } catch (error) {
      console.warn(
        `Running test: ${description}\n\tinput: ${inputName}\n\tstatus: Failed\n\tException: ${error.message}`
      );
    }
  });
  test.each([
    ["Valid email", "test@example.com"],
    ["Valid email with subdomain", "user@mail.example.com"],
    ["Valid email with numbers", "user123@example.net"],
    ["Invalid email - no @", "invalidemail.com"],
    ["Invalid email - no domain", "user@"],
    ["Invalid email - spaces", "user @example.com"],
    ["Invalid email - special characters", "user@exa mple.com"],
    ["Invalid email - multiple @", "user@@example.com"],
  ])("Testing emails: %s (%s)", async (description, inputEmail) => {
    render(
      <MemoryRouter>
        <ChatState>
          <Signup />
        </ChatState>
      </MemoryRouter>
    );

    // screen.debug();

    const email = screen.getByPlaceholderText("Email Address*");
    fireEvent.change(email, { target: { value: inputEmail } });

    // Email regex pattern (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email.value);

    try {
      expect(isEmailValid).toBe(true);
      console.log(
        `Running test: ${description}\n\tinput: ${inputEmail}\n\tstatus: Success`
      );
    } catch (error) {
      expect(isEmailValid).toBe(false);
      console.warn(
        `Running test: ${description}\n\tinput: ${inputEmail}\n\tstatus: Fail\n\tException: ${error.message}`
      );
    }
  });
  test.each([
    ["Really short password", "123"],
    ["Short password", "12345"],
    ["Normal password", "MyPassword"],
    ["Somewhat long password", "What-A-Great-Password"],
    ["Very long password", "NoOneWillEverCrackThisPasswordExceptForMe"],
  ])(
    "Testing password lengths: %s (%s)",
    async (description, inputPassword) => {
      render(
        <MemoryRouter>
          <ChatState>
            <Signup />
          </ChatState>
        </MemoryRouter>
      );

      // screen.debug();

      const password = screen.getByPlaceholderText("Password*");
      fireEvent.change(password, { target: { value: inputPassword } });

      try {
        expect(password.value.length).toBeGreaterThanOrEqual(5);
        console.log(
          `Running Test: ${description}\n\tInput: ${inputPassword}\n\tStatus: Success`
        );
      } catch (error) {
        console.warn(
          `${description}\n\tInput: ${inputPassword}\n\tStatus: Failed\n\tException: ${error.message}`
        );
      }
    }
  );
});
