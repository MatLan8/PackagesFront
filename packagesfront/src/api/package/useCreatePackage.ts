import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface PackageCreate {
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
}

export const useCreatePackage = () => {
  return useMutation<void, Error, PackageCreate>({
    mutationFn: async (packageC: PackageCreate) => {
      const { data } = await axios.post<void>(
        `${import.meta.env.VITE_BASE_URL}/Package/Create`,
        packageC
      );
      return data;
    },
  });
};
