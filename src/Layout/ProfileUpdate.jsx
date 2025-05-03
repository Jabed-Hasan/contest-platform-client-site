import React, { useContext, useState, useRef } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { AuthContext } from '../providers/AuthProvider';
import { FaUser, FaCamera, FaSpinner } from 'react-icons/fa';
import useAxiosPublic from '../hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ProfileUpdate = ({ onComplete }) => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.photoURL || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const axiosPublic = useAxiosPublic();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let photoURL = user?.photoURL || '';

      // Upload new image if selected
      if (imageFile) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axiosPublic.post(image_hosting_api, formData, {
          headers: { 'content-type': 'multipart/form-data' }
        });

        if (response.data.success) {
          photoURL = response.data.data.display_url;
        } else {
          throw new Error("Image upload failed");
        }
        setIsUploading(false);
      }

      // Update user profile
      await updateUserProfile({
        displayName: displayName,
        photoURL: photoURL
      });

      Swal.fire({
        icon: 'success',
        title: 'Profile updated successfully!',
        showConfirmButton: false,
        timer: 1500
      });

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error updating profile: ${error.message || 'Something went wrong'}`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <form onSubmit={handleUpdateProfile} className="space-y-6">
      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md bg-gray-50">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt={displayName || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FaUser className="text-gray-400 text-5xl" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={triggerFileInput}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
            disabled={isUploading}
          >
            {isUploading ? <FaSpinner className="animate-spin" /> : <FaCamera />}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Click the camera icon to upload a new profile picture
        </p>
      </div>

      {/* Display Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Display Name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your display name"
        />
      </div>

      {/* Email (non-editable) */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          value={user?.email || ''}
          disabled
          className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg"
        />
        <p className="text-xs text-gray-500">Email cannot be changed</p>
      </div>

      {/* Buttons */}
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed min-w-[100px]"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Updating...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  );
};

export default ProfileUpdate;
