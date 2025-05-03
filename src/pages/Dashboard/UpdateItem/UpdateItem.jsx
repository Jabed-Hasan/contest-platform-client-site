import { useEffect, useState, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaImage, FaSave, FaArrowLeft, FaCalendarAlt, FaMoneyBillWave, FaTrophy, FaInfoCircle } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const contest = useLoaderData();
    const { name, price, category, details, image, _id, prizeMoney, taskSubmissionText, ContestDeadline } = contest;

    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm();
    const [imagePreview, setImagePreview] = useState(image || null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Set default form values
    useEffect(() => {
        setValue('name', name);
        setValue('category', category);
        setValue('price', price);
        setValue('details', details);
        setValue('prizeMoney', prizeMoney);
        setValue('taskSubmissionText', taskSubmissionText);
        setValue('ContestDeadline', typeof ContestDeadline === 'string' ? ContestDeadline.split('T')[0] : '');
        setValue('email', user?.email);
    }, [name, category, price, details, prizeMoney, taskSubmissionText, ContestDeadline, user, setValue]);

    // Watch the image file selection
    const imageFile = watch('image');
    useEffect(() => {
        if (imageFile && imageFile[0]) {
            const file = imageFile[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [imageFile]);

    const onSubmit = async (data) => {
        try {
            setIsUploading(true);
            setUploadProgress(10);
            
            let imageUrl = image; // Default to existing image

            // Only upload a new image if one is selected
            if (data.image && data.image[0]) {
                const imageFile = { image: data.image[0] };
                setUploadProgress(30);
                
                const res = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: { 'content-type': 'multipart/form-data' },
                    onUploadProgress: progressEvent => {
                        const progress = Math.round((progressEvent.loaded * 70) / progressEvent.total);
                        setUploadProgress(30 + progress);
                    }
                });
                
                if (res.data.success) {
                    imageUrl = res.data.data.display_url;
                } else {
                    throw new Error("Image upload failed");
                }
            }
            
            setUploadProgress(90);
            
            // Prepare the updated contest data
            const contestData = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                details: data.details,
                prizeMoney: parseFloat(data.prizeMoney),
                taskSubmissionText: data.taskSubmissionText,
                ContestDeadline: data.ContestDeadline,
                email: data.email,
                image: imageUrl
            };
            
            // Send to server
            const response = await axiosSecure.patch(`/menu/${_id}`, contestData);
            
            setUploadProgress(100);
            setIsUploading(false);
            
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Contest Updated Successfully",
                    text: `${data.name} has been updated.`,
                    showConfirmButton: true,
                    confirmButtonText: "View Contests",
                    confirmButtonColor: "#3085d6"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/dashboard/manageItems');
                    }
                });
            }
        } catch (error) {
            setIsUploading(false);
            console.error("Update error:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to Update Contest",
                text: error.message || "Something went wrong. Please try again.",
                showConfirmButton: true
            });
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    // Category options
    const categoryOptions = [
        { value: "Business", label: "Business Contest" },
        { value: "Medical", label: "Medical Innovation" },
        { value: "Article", label: "Article Writing" },
        { value: "Gaming", label: "Gaming Competition" },
        { value: "WebApp", label: "Web Application" },
        { value: "Design", label: "Design Challenge" },
        { value: "Mobile", label: "Mobile App" },
        { value: "Photography", label: "Photography" }
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Update Contest</h1>
                        <p className="text-gray-600 mt-1">Make changes to the contest details and settings</p>
                    </div>
                    <button 
                        onClick={goBack}
                        className="px-4 py-2 flex items-center text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" /> Back
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Contest Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Contest Name*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter contest name"
                                    {...register('name', { 
                                        required: "Contest name is required",
                                        minLength: { value: 3, message: "Name must be at least 3 characters long" }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Category*
                                </label>
                                <select 
                                    {...register('category', { required: "Category is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="" disabled>Select a category</option>
                                    {categoryOptions.map((option, index) => (
                                        <option key={index} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                                )}
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Entry Fee*
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        {...register('price', { 
                                            required: "Entry fee is required",
                                            min: { value: 0, message: "Price cannot be negative" }
                                        })}
                                        className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                {errors.price && (
                                    <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
                                )}
                            </div>

                            {/* Prize Money */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Prize Money*
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaTrophy className="text-yellow-500" />
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        {...register('prizeMoney', { 
                                            required: "Prize money is required",
                                            min: { value: 0, message: "Prize money cannot be negative" }
                                        })}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                {errors.prizeMoney && (
                                    <p className="text-red-500 text-xs mt-1">{errors.prizeMoney.message}</p>
                                )}
                            </div>

                            {/* Deadline */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Contest Deadline*
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendarAlt className="text-gray-500" />
                                    </div>
                                    <input
                                        type="date"
                                        {...register('ContestDeadline', { 
                                            required: "Contest deadline is required" 
                                        })}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                {errors.ContestDeadline && (
                                    <p className="text-red-500 text-xs mt-1">{errors.ContestDeadline.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Creator Email*
                                </label>
                                <input
                                    type="email"
                                    readOnly
                                    {...register('email', { required: true })}
                                    className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Contest Image */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Contest Image
                                </label>
                                <div className="mt-1 flex flex-col items-center">
                                    <div className="w-full h-48 mb-3 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                                        {imagePreview ? (
                                            <img 
                                                src={imagePreview} 
                                                alt="Contest" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-center p-6">
                                                <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                                                <p className="mt-1 text-sm text-gray-500">No image selected</p>
                                            </div>
                                        )}
                                    </div>
                                    <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                                        <FaImage className="mr-2" />
                                        <span>Change Image</span>
                                        <input
                                            type="file"
                                            {...register('image')}
                                            className="sr-only"
                                            accept="image/*"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>
                                </div>
                            </div>

                            {/* Contest Details */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Contest Details*
                                </label>
                                <textarea 
                                    {...register('details', { 
                                        required: "Contest details are required",
                                        minLength: { value: 10, message: "Details must be at least 10 characters long" }
                                    })}
                                    rows="4"
                                    placeholder="Describe the contest, requirements, expectations..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                ></textarea>
                                {errors.details && (
                                    <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>
                                )}
                            </div>

                            {/* Task Submission Requirements */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Task Submission Requirements*
                                </label>
                                <textarea 
                                    {...register('taskSubmissionText', { 
                                        required: "Task submission requirements are required",
                                        minLength: { value: 10, message: "Requirements must be at least 10 characters long" }
                                    })}
                                    rows="4"
                                    placeholder="Explain what participants need to submit, format, etc..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                ></textarea>
                                {errors.taskSubmissionText && (
                                    <p className="text-red-500 text-xs mt-1">{errors.taskSubmissionText.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={goBack}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm mr-3 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="mr-2" />
                                        Update Contest
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    {isUploading && (
                        <div className="mt-4">
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                            Uploading
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-semibold inline-block text-blue-600">
                                            {uploadProgress}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                    <div
                                        style={{ width: `${uploadProgress}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;