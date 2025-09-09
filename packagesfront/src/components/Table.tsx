import React from "react";
import type { Package } from "../types/Package";
import { StatusLabels } from "../Data/StatusValue";
import StatusDropdown from "./StatusDropdown";
import { useNavigate } from "react-router-dom";

type PackagesTableProps = {
  packages: Package[];
};

const statusColors = [
  "bg-primary", // 0: Created
  "bg-warning", // 1: Sent
  "bg-danger", // 2: Returned
  "bg-success", // 3: Accepted
  "bg-secondary", // 4: Canceled
];

const PackagesTable: React.FC<PackagesTableProps> = ({ packages }) => {
  const navigate = useNavigate();

  const handleMoreClick = (packageId: string) => {
    navigate(`/package/${packageId}`);
  };

  return (
    <div className="table-responsive mt-4">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Tracking Number</th>
            <th>Sender Name</th>
            <th>Recipient Name</th>
            <th>Status</th>
            <th>Creation Date</th>
            <th>Change status</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => {
            const latestStatus: number | null =
              pkg.statusHistory && pkg.statusHistory.length > 0
                ? pkg.statusHistory[pkg.statusHistory.length - 1].statusValue
                : null;
            return (
              <tr key={pkg.id}>
                <td className="d-flex align-items-center justify-content-between">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleMoreClick(pkg.id)}
                  >
                    More
                  </button>
                  <span className="text-dark">{pkg.id}</span>
                </td>

                <td>{pkg.senderName}</td>
                <td>{pkg.receiverName}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div
                      className={`rounded-circle me-2 ${
                        statusColors[latestStatus ?? 0]
                      }`}
                      style={{ width: "20px", height: "20px" }}
                    ></div>
                    <span className="text-dark">
                      {latestStatus !== null
                        ? StatusLabels[latestStatus]
                        : "N/A"}
                    </span>
                  </div>
                </td>
                <td>{new Date(pkg.creationDate).toLocaleString()}</td>
                <td>
                  <StatusDropdown packageId={pkg.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PackagesTable;
