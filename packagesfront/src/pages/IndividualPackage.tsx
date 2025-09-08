import React from "react";
import { useParams } from "react-router-dom";
import { useGetByIdPackage } from "../api/package/useGetByIdPackage";
import { StatusLabels } from "../Data/StatusValue";
import StatusDropdown from "../components/StatusDropdown";

const IndividualPackage = () => {
  const {
    data: pkg,
    isLoading,
    error,
  } = useGetByIdPackage("4130c494-6e15-4569-93ac-b90dc160b12c");
  const statusColors = [
    "bg-primary", // 0: Created
    "bg-warning", // 1: Sent
    "bg-danger", // 2: Returned
    "bg-success", // 3: Accepted
    "bg-secondary", // 4: Canceled
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">Error: {error.message}</div>;
  if (!pkg) return <div>No package found.</div>;

  const latest =
    pkg.statusHistory && pkg.statusHistory.length > 0
      ? pkg.statusHistory[pkg.statusHistory.length - 1]
      : null;

  return (
    <div className="container mt-5 pt-3 text-light">
      <h1>Package Details</h1>
      <h5 className="mb-4">Tracking Number: {pkg.id}</h5>

      <div className="row">
        {/* Sender column */}
        <div className="col-md-6">
          <h4>Sender Info</h4>
          <p className="fs-5">
            <strong>Name:</strong> {pkg.senderName}
          </p>
          <p className="fs-5">
            <strong>Address:</strong> {pkg.senderAddress}
          </p>
          <p className="fs-5">
            <strong>Phone:</strong> {pkg.senderPhone}
          </p>
        </div>

        {/* Receiver column */}
        <div className="col-md-6">
          <h4>Receiver Info</h4>
          <p className="fs-5">
            <strong>Name:</strong> {pkg.receiverName}
          </p>
          <p className="fs-5">
            <strong>Address:</strong> {pkg.receiverAddress}
          </p>
          <p className="fs-5">
            <strong>Phone:</strong> {pkg.receiverPhone}
          </p>
        </div>
      </div>

      {/* Current status */}
      <div className="mt-4">
        <h2>Current Status</h2>
        {latest ? (
          <div className="d-flex justify-content-center align-items-center gap-3">
            <span className="fs-3">{StatusLabels[latest.statusValue]}</span>
            <StatusDropdown packageId={pkg.id} />
          </div>
        ) : (
          <p>N/A</p>
        )}
        {latest && (
          <p className="fs-4 mt-2">{new Date(latest.date).toLocaleString()}</p>
        )}
      </div>
      <br />
      <br />
      <div className="d-flex align-items-center flex-wrap">
        {pkg.statusHistory.map((status, index) => (
          <React.Fragment key={status.statusValue}>
            {/* Status column with dot on left and info on right */}
            <div className="d-flex align-items-center">
              {/* Dot */}
              <div
                className={`rounded-circle ${statusColors[status.statusValue]}`}
                style={{ width: "25px", height: "25px" }}
              ></div>

              {/* Status info column */}
              <div className="d-flex flex-column ms-2">
                <span className="fs-4">{StatusLabels[status.statusValue]}</span>
                <span className="fs-5">
                  {new Date(status.date).toLocaleDateString()}
                </span>
                <span className="fs-5">
                  {new Date(status.date).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Line between statuses */}
            {index < pkg.statusHistory.length - 1 && (
              <div
                className="flex-grow-1 border-top mx-3"
                style={{ alignSelf: "center" }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default IndividualPackage;
