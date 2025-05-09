export interface IAuthContextProps {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  name: string | null;
}