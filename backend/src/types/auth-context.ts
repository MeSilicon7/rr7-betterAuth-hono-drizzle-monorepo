export interface Session {
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
  id: string;
}

export interface User {
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface AuthContext {
  user: User | null | undefined;
  session: Session | null | undefined;
}
