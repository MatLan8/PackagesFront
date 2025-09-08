import React from "react";
import type { Package } from "../../types/Package";
import { StatusLabels } from "../../Data/StatusValue";
import StatusDropdown from "../StatusDropdown";

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
  return (
    <div className="table-responsive mt-4">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Tracking Number</th>
            <th>Sender Name</th>
            <th>Receiver Name</th>
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
                <td>{pkg.id}</td>
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
