export type User = {
  _id: string;
  googleId: string;
  appleId: string | null;
  firstName: string | null;
  lastName: string | null;
  picture: string | null;
  dateOfBirth: string | null;
  email: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
