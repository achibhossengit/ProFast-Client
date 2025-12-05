import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";

const UpdateUserEmailModal = ({ isOpen, onClose }) => {
  const { user, updateUserEmail } = useContext(AuthContext);

  const [emailForm, setEmailForm] = useState({
    password: "",
    newEmail: "",
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmailForm({
        password: "",
        newEmail: "",
      });
    }
  }, [isOpen]);

  // Mutation for updating email
  const updateEmailMutation = useMutation({
    mutationFn: async () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailForm.newEmail)) {
        throw new Error("Invalid email format");
      }
      if (emailForm.newEmail === user?.email) {
        throw new Error("New email must be different from current email");
      }
      await updateUserEmail(emailForm.password, emailForm.newEmail);
    },
    onSuccess: () => {
      toast.success(
        "Verification email sent! Please check your new email and click the verification link to complete the change."
      );
      onClose();
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update email");
    },
  });

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateEmail = () => {
    if (!emailForm.password || !emailForm.newEmail) {
      toast.error("Please fill in all fields");
      return;
    }
    updateEmailMutation.mutate();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Update Email Address</h3>

        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Current Password</span>
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              value={emailForm.password}
              onChange={handleEmailChange}
              placeholder="Enter your password to confirm"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">New Email</span>
            </label>
            <input
              type="email"
              name="newEmail"
              className="input input-bordered w-full"
              value={emailForm.newEmail}
              onChange={handleEmailChange}
              placeholder="Enter new email address"
            />
          </div>

          <div className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-xs">
              You will need to verify your new email address.
            </span>
          </div>
        </div>

        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={onClose}
            disabled={updateEmailMutation.isLoading}
          >
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={handleUpdateEmail}
            disabled={updateEmailMutation.isLoading}
          >
            {updateEmailMutation.isLoading ? "Updating..." : "Update Email"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default UpdateUserEmailModal;
