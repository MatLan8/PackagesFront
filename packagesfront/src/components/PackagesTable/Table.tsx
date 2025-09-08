import React from "react";
import type { Package } from "../../types/Package";
import { StatusLabels } from "../../Data/StatusValue";
import StatusDropdown from "../StatusDropdown";

type PackagesTableProps = {
  packages: Package[];
};

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
                  {latestStatus !== null ? StatusLabels[latestStatus] : "N/A"}
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
