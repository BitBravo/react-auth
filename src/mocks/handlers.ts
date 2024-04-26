import { delay, http, HttpResponse } from "msw";
import {
  AuthorResponse,
  InfoResponse,
  LoginRequest,
  LoginResponse,
  ProfileResponse,
  QuoteResponse,
} from "../types/api";
import { TestUser } from "../config/constants";

export const handlers = [
  http.get("/info", () => {
    const response: InfoResponse = {
      success: true,
      data: { info: "Some information about the <b>company</b>." },
    };
    return HttpResponse.json(response);
  }),

  http.post<Record<string, never>, LoginRequest, LoginResponse>("/login", async ({ request }) => {
    const { email, password } = await request.json();
    if (!email) {
      return HttpResponse.json({
        success: false,
        data: { message: "Email is required" },
      });
    }

    if (!password) {
      return HttpResponse.json({
        success: false,
        data: { message: "Password is required" },
      });
    }

    if (email !== TestUser.email || password !== TestUser.password) {
      return HttpResponse.json({
        success: false,
        data: { message: "Invalid email or password" },
      });
    }

    const response = {
      success: true,
      data: { token: "fb566635a66295da0c8ad3f467c32dcf" },
    };
    return HttpResponse.json(response);
  }),

  http.get("/profile", ({ request }) => {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    if (!token || token === "null") {
      return HttpResponse.json({
        success: false,
        data: { message: "Token is required" },
      });
    }
    const response: ProfileResponse = {
      success: true,
      data: { fullName: "Aleksei K", email: "aleksei@example.com" },
    };
    return HttpResponse.json(response);
  }),

  http.get("/author", async ({ request }) => {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    if (!token) {
      return HttpResponse.json({
        success: false,
        data: { message: "Token is required" },
      });
    }
    const response: AuthorResponse = {
      success: true,
      data: { authorId: 1, name: "Charlie Chaplin" },
    };
    await delay(3000);

    return HttpResponse.json(response);
  }),

  http.get("/quote", async ({ request }) => {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const authorId = url.searchParams.get("authorId");

    if (!token) {
      return HttpResponse.json({
        success: false,
        data: { message: "Token is required" },
      });
    }

    if (!authorId) {
      return HttpResponse.json({
        success: false,
        data: { message: "authorId is required" },
      });
    }
    await delay(3000);

    const response: QuoteResponse = {
      success: true,
      data: {
        quoteId: 1,
        authorId: 1,
        quote: "A day without laughter is a day wasted.",
      },
    };
    return HttpResponse.json(response);
  }),

  http.delete("/logout", () => {
    return HttpResponse.json({
      success: true,
      data: {},
    });
  }),
];
