import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Package } from "../../types/Package";

export const useGetByIdPackage = (packageId: string) => {
  return useQuery<Package, Error>({
    queryKey: ["getByIdPackage", packageId],
    queryFn: async () => {
      const { data } = await axios.get<Package>(
        `${
          import.meta.env.VITE_BASE_URL
        }/Package/GetById?packageId=${packageId}`
      );
      return data;
    },
    enabled: !!packageId,
  });
};
