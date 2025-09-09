import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

interface AppToastProps {
  show: boolean;
  onClose: () => void;
  header: string;
  body: string | React.ReactNode;
}

const AppToast: React.FC<AppToastProps> = ({
  show,
  onClose,
  header,
  body,
}) => {
  return (
    <ToastContainer position="bottom-end" className="p-3 position-fixed">
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">{header}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body className="bg-white text-dark">{body}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default AppToast;
