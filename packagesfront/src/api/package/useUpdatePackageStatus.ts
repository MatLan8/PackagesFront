import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface PackageStatusUpdate {
  packageId: string;
  status: number;
}

export const useUpdatePackageStatus = () => {
  return useMutation<void, Error, PackageStatusUpdate>({
    mutationFn: async (packageC: PackageStatusUpdate) => {
      const { data } = await axios.patch<void>(
        `${import.meta.env.VITE_BASE_URL}/Package/UpdateStatus`,
        packageC
      );
      return data;
    },
  });
};
