import * as contactRepo from "@/repositories/contact.repository";
import { IContact } from "@/types/contact.types";

export const getContactsService = async (status?: string) => {
  const query: { status?: { $in: string[] } } = {};
  if (status) {
    query.status = { $in: status.split(",") };
  }
  return contactRepo.getContacts(query);
};

export const getContactByIdService = async (id: string) => {
  return contactRepo.getContactById(id);
};

export const updateContactService = async (id: string, data: Partial<IContact>) => {
  return contactRepo.updateContact(id, data);
};

export const deleteContactService = async (id: string) => {
  return contactRepo.deleteContact(id);
};
