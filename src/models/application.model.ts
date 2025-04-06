import mongoose, { Document, Schema } from 'mongoose';

export type ApplicationStatus =
  | 'pending'
  | 'verified'
  | 'rejected_by_verifier'
  | 'approved'
  | 'rejected_by_admin';

export interface IApplication extends Document {
  fullName: string;
  loanTenure: number;
  reason: string;
  amount: number;
  employmentStatus: string;
  employmentAddress: string;
  status: ApplicationStatus;
}

const ApplicationSchema: Schema = new Schema<IApplication>(
  {
    fullName: { type: String, required: true },
    loanTenure: { type: Number, required: true },
    reason: { type: String, required: true },
    amount: { type: Number, required: true },
    employmentStatus: { type: String, required: true },
    employmentAddress: { type: String, required: true },
    status: {
      type: String,
      enum: [
        'pending',
        'verified',
        'rejected_by_verifier',
        'approved',
        'rejected_by_admin',
      ],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IApplication>('Application', ApplicationSchema);

