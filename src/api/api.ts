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
  const response = await axios.get<InfoResponse>("/info");
  return response.data;
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("/login", {
    email,
    password,
  });
  return response.data;
};

export const logout = async (): Promise<LogoutResponse> => {
  const response = await axios.delete("/logout");
  return response.data;
};

export const fetchProfile = async (): Promise<ProfileResponse> => {
  const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
  const response = await axios.get<ProfileResponse>(`/profile?token=${token}`);
  return response.data;
};

export const fetchAuthor = async (source?: CancelTokenSource): Promise<AuthorResponse> => {
  const sourceAction = source ? { cancelToken: source?.token } : {};
  const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
  const response = await axios.get<AuthorResponse>(`/author?token=${token}`, sourceAction);
  return response.data;
};

export const fetchQuote = async (authorId: number, source?: CancelTokenSource): Promise<QuoteResponse> => {
  const sourceAction = source ? { cancelToken: source?.token } : {};
  const token = localStorage.getItem(StorageKeys.ACCESS_TOKEN);
  const response = await axios.get<QuoteResponse>(`/quote?token=${token}&authorId=${authorId}`, sourceAction);
  return response.data;
};
