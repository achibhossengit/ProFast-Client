import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";

const UpdatePasswordModal = ({ isOpen, onClose }) => {
  const { updateUserPassword } = useContext(AuthContext);

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [isOpen]);

  // Mutation for updating password
  const updatePasswordMutation = useMutation({
    mutationFn: async () => {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      if (passwordForm.newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      await updateUserPassword(
        passwordForm.oldPassword,
        passwordForm.newPassword
      );
    },
    onSuccess: () => {
      toast.success("Password updated successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update password");
    },
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePassword = () => {
    if (
      !passwordForm.oldPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      toast.error("Please fill in all password fields");
      return;
    }
    updatePasswordMutation.mutate();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Change Password</h3>

        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Current Password</span>
            </label>
            <input
              type="password"
              name="oldPassword"
              className="input input-bordered w-full"
              value={passwordForm.oldPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              name="newPassword"
              className="input input-bordered w-full"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password (min 6 characters)"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm New Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="input input-bordered w-full"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
            />
            {passwordForm.newPassword &&
              passwordForm.confirmPassword &&
              passwordForm.newPassword !== passwordForm.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    Passwords do not match
                  </span>
                </label>
              )}
          </div>
        </div>

        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={onClose}
            disabled={updatePasswordMutation.isLoading}
          >
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={handleUpdatePassword}
            disabled={updatePasswordMutation.isLoading}
          >
            {updatePasswordMutation.isLoading
              ? "Updating..."
              : "Update Password"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default UpdatePasswordModal;
