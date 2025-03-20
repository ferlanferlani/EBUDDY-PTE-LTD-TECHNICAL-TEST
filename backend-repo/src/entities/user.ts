export interface User {
  uuid: string;
  email: string;
  password: string;
  displayName?: string;
  address?: string;
  phoneNumber?: number;
  createdAt: string;
}
