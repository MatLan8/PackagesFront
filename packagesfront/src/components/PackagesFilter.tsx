import React from "react";
import { StatusLabels } from "../Data/StatusValue";

type PackagesFilterProps = {
  idFilter: string;
  statusFilter: number[]; // array of selected statuses
  onIdFilterChange: (value: string) => void;
  onStatusFilterChange: (value: number[]) => void;
};

const PackagesFilter: React.FC<PackagesFilterProps> = ({
  idFilter,
  statusFilter,
  onIdFilterChange,
  onStatusFilterChange,
}) => {
  const handleCheckboxChange = (status: number) => {
    if (statusFilter.includes(status)) {
      onStatusFilterChange(statusFilter.filter((s) => s !== status));
    } else {
      onStatusFilterChange([...statusFilter, status]);
    }
  };

  return (
    <div
      className="mb-3 p-3 bg-dark text-light shadow"
      style={{
        borderRadius: "20px",
      }}
    >
      <div className="mb-2">
        <label className="form-label fs-4">Filter by Package ID:</label>
        <input
          type="text"
          className="form-control"
          value={idFilter}
          onChange={(e) => onIdFilterChange(e.target.value)}
          placeholder="Enter package ID..."
        />
      </div>

      <div>
        <label className="form-label fs-4">Filter by Status:</label>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
          {Object.entries(StatusLabels).map(([key, label]) => {
            const numKey = Number(key);
            return (
              <div key={key} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={statusFilter.includes(numKey)}
                  onChange={() => handleCheckboxChange(numKey)}
                  id={`status-${key}`}
                />
                <label className="form-check-label" htmlFor={`status-${key}`}>
                  {label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PackagesFilter;
