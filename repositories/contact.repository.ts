import { ContactModel } from "@/models/contact.model";
import { IContact } from "@/types/contact.types";

export const getContacts = async (query: Record<string, unknown> = {}) => {
  return ContactModel.find(query).sort({ createdAt: -1 });
};

export const getContactById = async (id: string) => {
  return ContactModel.findById(id);
};

export const updateContact = async (id: string, data: Partial<IContact>) => {
  return ContactModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteContact = async (id: string) => {
  return ContactModel.findByIdAndDelete(id);
};
