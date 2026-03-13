export enum ContactStatus {
  UNREAD = "unread",
  READ = "read",
}

export interface IContact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}
