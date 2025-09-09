import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useQueryClient } from "@tanstack/react-query";
import { useGetPackageAvailableStatuses } from "../api/package/useGetPackageAvailableStatuses";
import { useUpdatePackageStatus } from "../api/package/useUpdatePackageStatus";
import { StatusLabels } from "../Data/StatusValue";

interface ChangeStatusButtonProps {
  packageId: string;
}

const StatusDropdown: React.FC<ChangeStatusButtonProps> = ({ packageId }) => {
  const { data, error, isLoading } = useGetPackageAvailableStatuses(packageId);
  const updateStatusMutation = useUpdatePackageStatus();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSelectStatus = (statusValue: number) => {
    setPendingStatus(statusValue);
    setShowModal(true);
  };

  const confirmChange = () => {
    if (pendingStatus === null) return;

    updateStatusMutation.mutate(
      { packageId, status: pendingStatus },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllPackages"] });
          queryClient.invalidateQueries({
            queryKey: ["getPackageAvailableStatuses", packageId],
          });
          queryClient.invalidateQueries({
            queryKey: ["getByIdPackage", packageId],
          });
          setShowModal(false);
          setPendingStatus(null);
          setShowToast(true);
        },
        onError: () => {
          setShowModal(false);
          setPendingStatus(null);
        },
      }
    );
  };

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span className="text-danger">Error</span>;

  return (
    <>
      <ToastContainer position="bottom-end" className="p-3 position-fixed">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Status Updated</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body className="bg-white text-dark">
            <strong>Package status updated successfully!</strong>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          size="sm"
          id={`dropdown-${packageId}`}
        >
          Select...
        </Dropdown.Toggle>

        <Dropdown.Menu
          renderOnMount
          popperConfig={{
            strategy: "fixed",
          }}
        >
          {data && data.length > 0 ? (
            data.map((statusValue) => (
              <Dropdown.Item
                key={statusValue}
                onClick={() => handleSelectStatus(statusValue)}
                disabled={updateStatusMutation.status === "pending"}
              >
                {StatusLabels[statusValue]}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item className="text-dark" disabled>
              Final Status
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      {/* Confirmation Modal */}
      <Modal
        className="text-dark"
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header className="text-dark" closeButton>
          <Modal.Title>Confirm Status Change</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          Are you sure you want to change status to{" "}
          <strong>
            {pendingStatus !== null && StatusLabels[pendingStatus]}
          </strong>
          ?
        </Modal.Body>
        <Modal.Footer className="text-dark">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={confirmChange}
            disabled={updateStatusMutation.status === "pending"}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StatusDropdown;
