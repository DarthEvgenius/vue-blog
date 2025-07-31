export interface IAuthResponse {
  id: number;
  login: string;
  username: string;
  authorities: { authority: string }[];
}