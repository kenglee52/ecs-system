import { Owner } from "./owner";
export interface Income {
   _id? : string;
   amount: number;
   payBy: Owner;
   createdAt: string;
}