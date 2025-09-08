import React from "react";
import { useGetPackageAvailableStatuses } from "../api/package/useGetPackageAvailableStatuses";

const IndividualPackage: React.FC = () => {
  const packageId = "fdbe83b5-7193-4633-a3b3-93cc96b298f2";
  const { data, error, isLoading } = useGetPackageAvailableStatuses(packageId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Available Statuses for Package</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default IndividualPackage;
