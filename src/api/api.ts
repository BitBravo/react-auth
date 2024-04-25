import axios, { CancelTokenSource } from "axios";
import {
  AuthorResponse,
  InfoResponse,
  LoginResponse,
  LogoutResponse,
  ProfileResponse,
  QuoteResponse,
} from "../types/api";
import { StorageKeys } from "../config/constants";

axios.defaults.baseURL = "";

export const fetchInfo = async (): Promise<InfoResponse> => {
  try {
    const response = await axios.get<InfoResponse>("/info");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch company info");
  }
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await axios.delete("/logout");
    return response.data;
  } catch (error) {
    throw new Error("Logout failed");
  }
};

export const fetchProfile = async (): Promise<ProfileResponse> => {
  try {
    const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
    const response = await axios.get<ProfileResponse>(`/profile?token=${token}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile");
  }
};

export const fetchAuthor = async (source?: CancelTokenSource): Promise<AuthorResponse> => {
  try {
    const sourceAction = source ? { cancelToken: source?.token } : {};
    const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
    const response = await axios.get<AuthorResponse>(`/author?token=${token}`, sourceAction);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch author");
  }
};

export const fetchQuote = async (authorId: number, source?: CancelTokenSource): Promise<QuoteResponse> => {
  try {
    const sourceAction = source ? { cancelToken: source?.token } : {};
    const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
    const response = await axios.get<QuoteResponse>(`/quote?token=${token}&authorId=${authorId}`, sourceAction);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch quote");
  }
};
