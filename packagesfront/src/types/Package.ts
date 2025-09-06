import type { Status } from "./Status";

export type Package = {
  id: string;
  creationDate: Date;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  statusHistory: Status[];
};
