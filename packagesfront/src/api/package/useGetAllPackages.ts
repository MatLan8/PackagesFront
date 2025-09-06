import { useQuery } from "@tanstack/react-query";
import type { Package } from "../../types/Package";
import axios from "axios";

export const useGetAllPackages = () => {
  return useQuery<Package[], Error>({
    queryKey: ["getAllPackages"],
    queryFn: async () => {
      const { data } = await axios.get<Package[]>(
        `${import.meta.env.VITE_BASE_URL}/Package/GetAll`
      );
      return data;
    },
  });
};
