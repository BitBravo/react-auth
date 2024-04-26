import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InfoPage from "../pages/InfoPage";
import { GlobalProvider } from "../context/GlobalContext";
import { server } from "../mocks/server";

describe("InfoPage", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  beforeEach(() => {
    render(
      <GlobalProvider>
        <InfoPage />
      </GlobalProvider>
    );
  });

  it("displays a loading message initially", async () => {
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("displays fetched information once loaded", async () => {
    expect(await screen.findByText(/Some information/i, {}, { timeout: 3000 })).toBeInTheDocument();
  });

  it("should display loading indicator when loading is true", async () => {
    await waitFor(() => {
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });
});
