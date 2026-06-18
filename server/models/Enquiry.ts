import { Schema, model } from 'mongoose';

export interface IEnquiry {
  studentName: string;
  parentEmail: string;
  parentPhone: string;
  createdAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>({
  studentName: {
    type: String,
    required: [true, "Student's name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"]
  },
  parentEmail: {
    type: String,
    required: [true, "Parent's email is required"],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
  },
  parentPhone: {
    type: String,
    required: [true, "Parent's phone number is required"],
    trim: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Enquiry = model<IEnquiry>('Enquiry', EnquirySchema);
