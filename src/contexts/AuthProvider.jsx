import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "./AuthContext";
import useAxios from "../hooks/useAxios";

const AuthProvider = ({ children }) => {
  const axiosInstance = useAxios();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // Re-authenticate user (required before sensitive operations like email/password change)
  const reauthenticateUser = async (password) => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      return { success: true };
    } catch (error) {
      console.error("Error re-authenticating:", error);
      throw error;
    }
  };

  // Create user with email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user with email and password
  const loginUser = (email, password) => {
    console.log({ email, password });
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Logout user
  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  // Update user profile (Firebase only - for displayName and photoURL)
  const updateUserProfile = async (updatedInfo) => {
    return updateProfile(auth.currentUser, updatedInfo);
  };

  // Update user email (Firebase + Backend)
  const updateUserEmail = async (userPassword, newEmail) => {
    try {
      // Step 1: Reauthenticate the user
      await reauthenticateUser(userPassword);

      // Step 2: Send verification email and update email atomically
      await verifyBeforeUpdateEmail(auth.currentUser, newEmail);

      return { success: true };
    } catch (error) {
      console.error("Error updating email:", error);
      throw error;
    }
  };

  // Update user password (Firebase only)
  const updateUserPassword = async (oldPassword, newPassword) => {
    try {
      await reauthenticateUser(oldPassword);
      await updatePassword(auth.currentUser, newPassword);
      return { success: true };
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Monitor auth state changes
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const token = await currentUser?.getIdToken();
      if (token) {
        const res = await axiosInstance.get("users/role", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        currentUser.role = res?.data?.role || "user";
      }

      setUser(currentUser);

      setAuthLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [axiosInstance]);

  const authInfo = {
    user,
    authLoading,
    createUser,
    loginUser,
    loginWithGoogle,
    logoutUser,
    updateUserProfile,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    reauthenticateUser,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
