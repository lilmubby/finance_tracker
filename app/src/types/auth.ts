export interface UserData {
  email: string;
  password: string
}

export interface RegisterUserData extends UserData {
  name: string,
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface SignUpApiResponse<T> extends ApiResponse<T> {
  message?: string;
}

export interface LoginResponse {
  status: string;
  data: {
    name: string;
    email: string;
  };
  token: string;
}

export interface SignUpResponse {
  data: null;
  status: number;
  message: string;
}