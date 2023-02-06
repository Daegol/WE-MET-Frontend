import { JwtPayload } from 'jwt-decode';

export interface Credentials {
  username: string;
  password: string;
}

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  token: any;
  userName: string;
  decodedToken: DecodedToken;
}

export interface DecodedToken extends JwtPayload {
  email: any;
  roles: any;
  firstName: string;
  lastName: string;
  uid: string;
}

