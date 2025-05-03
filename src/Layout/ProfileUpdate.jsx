import React, { useContext, useState } from 'react';

import Swal from 'sweetalert2'; // Import SweetAlert library
import 'sweetalert2/dist/sweetalert2.css'; // Import SweetAlert styles
import useAuth from '../hooks/useAuth';
import { AuthContext } from '../providers/AuthProvider';

const ProfileUpdate = () => {
  const { user, setUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [profilePicture, setProfilePicture] = useState('');


  const updateProfile = async (user, { displayName, photoURL }) => {
    try {
      await user.updateProfile({
        displayName,
        photoURL
      });
      // Show success notification with SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Profile updated successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error updating profile:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error updating profile: ${error.message}`
      });
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(AuthContext.currentUser, {
        displayName,
        photoURL: profilePicture
      });

      setUser({
        ...user,
        displayName,
        photoURL: profilePicture
      });

      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <form
      onSubmit={handleUpdateProfile}
      className="max-w-sm mx-auto mt-4 p-4 bg-white rounded shadow-md"
    >
      <label className="block text-sm font-semibold text-gray-600">Display Name:</label>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
      />

      <label className="block mt-4 text-sm font-semibold text-gray-600">
        Profile Picture URL:
      </label>
      <input
        type="text"
        value={profilePicture}
        onChange={(e) => setProfilePicture(e.target.value)}
        className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Update Profile
      </button>
    </form>
  );
};

export default ProfileUpdate;
