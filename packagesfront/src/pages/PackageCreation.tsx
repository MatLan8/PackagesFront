import React, { useState } from "react";
import { useCreatePackage } from "../api/package/useCreatePackage";
import type { PackageCreate } from "../api/package/useCreatePackage";
import FormInput from "../components/FormInput";
import AppToast from "../components/AppToast";

const PackageCreation: React.FC = () => {
  const mutation = useCreatePackage();

  const [formData, setFormData] = useState<PackageCreate>({
    senderName: "",
    senderAddress: "",
    senderPhone: "",
    receiverName: "",
    receiverAddress: "",
    receiverPhone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [showToast, setShowToast] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData, {
      onSuccess: () => {
        setShowToast(true);
        setFormData({
          senderName: "",
          senderAddress: "",
          senderPhone: "",
          receiverName: "",
          receiverAddress: "",
          receiverPhone: "",
        });
      },
      onError: (err: any) => {
        alert(`Error creating package: ${err.message}`);
      },
    });
  };

  return (
    <div className="container mt-4">
      <AppToast
        show={showToast}
        onClose={() => setShowToast(false)}
        header={"Packaged Created"}
        body={"Packed created successfully!"}
      />
      <h2>Create New Package</h2>
      <form onSubmit={handleSubmit}>
        <h5>Sender Information</h5>
        <FormInput
          label="Name"
          name="senderName"
          value={formData.senderName}
          onChange={handleChange}
          required
          maxLength={40}
        />
        <FormInput
          label="Address"
          name="senderAddress"
          value={formData.senderAddress}
          onChange={handleChange}
          required
          maxLength={40}
        />
        <FormInput
          label="Phone"
          name="senderPhone"
          value={formData.senderPhone}
          onChange={handleChange}
          required
          type="text"
          maxLength={15}
          pattern="^\+?[0-9]{7,15}$"
          placeholder="+37000000000"
        />

        <h5>Recipient Information</h5>
        <FormInput
          label="Name"
          name="receiverName"
          value={formData.receiverName}
          onChange={handleChange}
          required
          maxLength={40}
        />
        <FormInput
          label="Address"
          name="receiverAddress"
          value={formData.receiverAddress}
          onChange={handleChange}
          required
          maxLength={40}
        />
        <FormInput
          label="Phone"
          name="receiverPhone"
          value={formData.receiverPhone}
          onChange={handleChange}
          required
          type="tel"
          maxLength={15}
          pattern="^\+?[0-9]{7,15}$"
          placeholder="+37000000000"
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={mutation.status === "pending"}
        >
          {mutation.status === "pending" ? "Creating..." : "Create Package"}
        </button>
      </form>
    </div>
  );
};

export default PackageCreation;
