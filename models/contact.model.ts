import mongoose, { Model, Schema } from "mongoose";
import { IContact, ContactStatus } from "@/types/contact.types";

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ContactStatus),
      default: ContactStatus.UNREAD,
    },
  },
  { timestamps: true }
);

// Force delete the model to ensure schema changes are applied
if (mongoose.models.Contact) {
  delete mongoose.models.Contact;
}

export const ContactModel: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);
