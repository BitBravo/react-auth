import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../pages/LoginPage";
import { AuthProvider } from "../context/AuthContext";

describe("Login Page", () => {
  beforeEach(() => {
    render(
      <Router>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </Router>
    );
  });

  it("render page correctly", () => {
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("displays validation errors for empty fields", async () => {
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(await screen.findAllByText(/required/i)).toHaveLength(2);
  });

  it("displays an error for invalid email", async () => {
    await userEvent.type(screen.getByLabelText("Email Address"), "bademail");
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
  });

  it("calls login on valid form submission", async () => {
    const emailInput = screen.getByLabelText("Email Address");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);
  });
});
