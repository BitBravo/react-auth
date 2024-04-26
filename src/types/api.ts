export interface InfoResponse {
  success: boolean;
  data: {
    info: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token?: string;
    message?: string;
  };
}

export interface LogoutResponse {
  success: boolean;
  data: unknown;
}

export interface ProfileResponse {
  success: boolean;
  data: {
    fullName: string;
    email: string;
  };
}

export interface AuthorResponse {
  success: boolean;
  data: {
    authorId: number;
    name: string;
  };
}

export interface QuoteResponse {
  success: boolean;
  data: {
    quoteId: number;
    authorId: number;
    quote: string;
  };
}
