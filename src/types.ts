export interface User {
  email: string;
  nickname: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResult {
  ok: boolean;
  message?: string;
}

export interface Post {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostFormValues {
  title: string;
  content: string;
}

export interface PostPayload extends PostFormValues {
  author: string;
}

export interface kim {
  junghun: string;
  age: number;
}
