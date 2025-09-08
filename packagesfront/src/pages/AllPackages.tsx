import { useGetAllPackages } from "../api/package/useGetAllPackages";
import PackagesTable from "../components/PackagesTable/Table";

const AllPackages = () => {
  const { data, error, isLoading } = useGetAllPackages();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="container mt-5 pt-3">
      {data && data.length === 0 ? (
        <h1 style={{ color: "white" }}>There are no packages to track</h1>
      ) : (
        <>
          <h1 style={{ color: "white" }}>All Packages</h1>
          {data && <PackagesTable packages={data} />}
        </>
      )}
    </div>
  );
};

export default AllPackages;
