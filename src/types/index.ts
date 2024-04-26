export type LoginPayload = {
  email: string;
  password: string;
};

export interface User {
  email: string;
  fullName: string;
}

export interface Author {
  authorId: number;
  name: string;
}

export interface Quote {
  quoteId: number;
  authorId: number;
  quote: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  user?: User | null;
  error: string | null;
}

export interface ProfileState {
  profile: User | null;
  author: Author | null;
  quote: Quote | null;
}

export enum ProfileStep {
  READY = 0,
  START = 1,
  FETCH_AUTHOR_FAILED = 2,
  FETCH_AUTHOR_SUCCESS = 3,
  FETCH_QUOTE_FAILED = 4,
  FETCH_QUOTE_SUCCESS = 5,
}
