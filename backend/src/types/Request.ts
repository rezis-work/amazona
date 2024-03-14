declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      name: string;
      email: string;
      phoneNumber: number;
      isAdmin: boolean;
      token: string;
    };
  }
}
