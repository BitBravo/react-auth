import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfilePage from "../pages/ProfilePage";
import { AuthProvider } from "../context/AuthContext";
import { ProfileProvider } from "../context/ProfileContext";
import { server } from "../mocks/server";
import { StorageKeys } from "../config/constants";
import userEvent from "@testing-library/user-event";

describe("Profile Page Test", async () => {
  window.localStorage.setItem(StorageKeys.ACCESS_TOKEN, "access-token");
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    render(
      <AuthProvider>
        <ProfileProvider>
          <ProfilePage />
        </ProfileProvider>
      </AuthProvider>
    );
  });

  it("displays a loading message initially", async () => {
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders profile data after fetching from API", async () => {
    expect(await screen.findByText(/Aleksei/i, {}, { timeout: 3000 })).toBeInTheDocument();
  });

  it("displays modal based on step status", async () => {
    await userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/step 1.*completed/i, {}, { timeout: 4000 })).toBeInTheDocument();
    expect(await screen.findByText(/step 2./i, {}, { timeout: 4000 })).toBeInTheDocument();
  });

  it("closing action by cancel button", async () => {
    await userEvent.click(screen.getByRole("button"));
    expect(await screen.findByText(/Requesting the quote/i, {}, { timeout: 2000 })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(screen.queryByRole("button", { name: /cancel/i })).toBeNull();
  });
});
