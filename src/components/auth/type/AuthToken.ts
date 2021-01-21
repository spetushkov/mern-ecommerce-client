export interface AuthToken {
  token: string;
  expiresIn: number; // seconds
  expiresAt: string;
}
