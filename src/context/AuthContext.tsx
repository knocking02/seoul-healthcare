import { useState, type ReactNode } from "react";
import { AuthContext } from "./auth-context";
import type { LoginForm, LoginResult, User } from "../types";

const STORAGE_KEY = "study-auth";

function readStoredUser(): User | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? (JSON.parse(stored) as User) : null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(readStoredUser);

  const login = ({ email, password }: LoginForm): LoginResult => {
    if (!email.trim() || !password.trim()) {
      return { ok: false, message: "이메일과 비밀번호를 입력해주세요." };
    }

    const nextUser: User = {
      email,
      nickname: email.split("@")[0],
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);

    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: Boolean(user),
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
