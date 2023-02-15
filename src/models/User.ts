import mongoose, { Document } from "mongoose";

export interface IUser {
  ownerAddress: string;
  apiKey: string;
  oracles: Array<{
    oracleAddress: string;
    masterAddress: string;
    clientAddress: string;
    userAddress: string;
    oracleKey: string;
  } | null>
}

export type TUserDocument = Document & IUser;

const IUserSchema = new mongoose.Schema(
  {
    ownerAddress: { type: String, required: true },
    apiKey: { type: String, required: true },
    oracles: [{
      oracleAddress: { type: String, required: false },
      masterAddress: { type: String, required: false },
      clientAddress: { type: String, required: false },
      userAddress: { type: String, required: false },
      oracleKey: { type: String, required: false },
    }]
  },
  { timestamps: true }
);

export const User = mongoose.model<TUserDocument>("User", IUserSchema);
