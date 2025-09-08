import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetPackageAvailableStatuses = (packageId: string) => {
  return useQuery<number[], Error>({
    queryKey: ["getPackageAvailableStatuses", packageId],
    queryFn: async () => {
      const { data } = await axios.get<number[]>(
        `${
          import.meta.env.VITE_BASE_URL
        }/Package/GetAvailableStatuses?packageId=${packageId}`
      );
      return data;
    },
    enabled: !!packageId,
  });
};
