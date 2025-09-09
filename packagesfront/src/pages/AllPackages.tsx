import { useState } from "react";
import { useGetAllPackages } from "../api/package/useGetAllPackages";
import PackagesTable from "../components/PackagesTable/Table";
import PackagesFilter from "../components/PackagesFilter";

const AllPackages = () => {
  const { data, error, isLoading } = useGetAllPackages();

  const [idFilter, setIdFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<number[]>([]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredPackages = data?.filter((pkg) => {
    const matchesId =
      idFilter === "" ||
      pkg.id.toLowerCase().startsWith(idFilter.toLowerCase());

    const latestStatus =
      pkg.statusHistory?.[pkg.statusHistory.length - 1]?.statusValue;

    const matchesStatus =
      statusFilter.length === 0 ||
      (latestStatus !== undefined && statusFilter.includes(latestStatus));

    return matchesId && matchesStatus;
  });

  return (
    <div className="container mt-5 pt-3">
      {data && data.length === 0 ? (
        <h1 style={{ color: "white" }}>There are no packages to track</h1>
      ) : (
        <>
          <PackagesFilter
            idFilter={idFilter}
            statusFilter={statusFilter}
            onIdFilterChange={setIdFilter}
            onStatusFilterChange={setStatusFilter}
          />
          <br />
          {filteredPackages && filteredPackages.length === 0 ? (
            <h1 style={{ color: "white" }}>There are no matching packages</h1>
          ) : (
            <>
              <h1 style={{ color: "white" }}>All Packages</h1>
              {filteredPackages && (
                <PackagesTable packages={filteredPackages} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AllPackages;
