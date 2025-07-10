import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiLock, FiTrash2, FiSave, FiImage, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import defaultProfileImage from '../assets/default-profile.png';

interface FormData {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  form?: string;
  delete?: string;
  image?: string;
}

const AccountSettingsPage = () => {
  const { 
    user, 
    updateUser, 
    deleteAccount, 
    updateProfileImage,
    getMe
  } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [imagePreview, setImagePreview] = useState(defaultProfileImage);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone:user.phone
      }));
      if (user.profileImage) {
        setImagePreview(user.profileImage);
      }
    }
  }, [user]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone) {
      const phoneRegex = /^\d{3}-?\d{3}-?\d{4}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number (e.g., 555-123-4567)';
      }
    }
    
    if (showPasswordSection) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required to set a new password';
      }
      
      if (formData.newPassword && formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters long';
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      const updateData: any = {
        name: formData.name,
        email: formData.email
      };
      
      if (formData.phone) {
        updateData.phone = formData.phone;
      }
      
      if (showPasswordSection && formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }
      
      const { success, message } = await updateUser(updateData);
      
      if (success) {
        setSuccessMessage(message || 'Your account has been successfully updated');
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        setShowPasswordSection(false);
        await getMe();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrors({ form: message || 'Failed to update account' });
      }
    } catch (error: any) {
      setErrors({ form: error.message || 'Failed to update account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ image: 'Image size must be less than 5MB' });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      
      try {
        setImageUploadProgress(1);
        
        const { success, message } = await updateProfileImage(
          file, 
          (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setImageUploadProgress(percentCompleted);
          }
        );
        
        if (success) {
          setSuccessMessage('Profile image updated successfully');
          await getMe();
          setTimeout(() => setSuccessMessage(''), 3000);
        } else {
          setErrors({ image: message || 'Failed to update profile image' });
        }
      } catch (error: any) {
        setErrors({ image: error.message || 'Failed to update profile image' });
      } finally {
        setTimeout(() => setImageUploadProgress(0), 500);
      }
    }
  };
  
  const handleDeleteRequest = () => {
    setShowDeleteConfirm(true);
  };
  
  const handleDeleteConfirm = async () => {
    try {
      setIsSubmitting(true);
      const { success, message } = await deleteAccount();
      if (success) {
        navigate('/');
      } else {
        setErrors({ delete: message || 'Failed to delete account' });
        setShowDeleteConfirm(false);
      }
    } catch (error: any) {
      setErrors({ delete: error.message || 'Failed to delete account. Please try again.' });
      setShowDeleteConfirm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Account Settings</h1>
        
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {successMessage}
          </div>
        )}
        
        {errors.form && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
            <FiAlertCircle className="w-5 h-5 mr-2" />
            {errors.form}
          </div>
        )}
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
            <img 
              src={imagePreview} 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultProfileImage;
              }}
            />
            <label 
              htmlFor="profileImage"
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
            >
              <FiImage className="text-white text-2xl" />
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-2">{errors.image}</p>
          )}
          {imageUploadProgress > 0 && (
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${imageUploadProgress}%` }}
              ></div>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-2">Click on the image to update your profile photo</p>
        </div>
        
        {showDeleteConfirm ? (
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-red-700 mb-4">Delete Account</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            {errors.delete && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
                <FiAlertCircle className="w-5 h-5 mr-2" />
                {errors.delete}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDeleteConfirm}
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="mr-2" />
                    Yes, Delete My Account
                  </>
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isSubmitting}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-lg font-medium disabled:opacity-70"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className={`flex items-center border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                      <div className="bg-gray-100 p-3 text-gray-500">
                        <FiUser />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="flex-1 p-3 outline-none"
                        placeholder="Your full name"
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className={`flex items-center border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                      <div className="bg-gray-100 p-3 text-gray-500">
                        <FiMail />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="flex-1 p-3 outline-none"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                    <div className={`flex items-center border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                      <div className="bg-gray-100 p-3 text-gray-500">
                        <FiPhone />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="flex-1 p-3 outline-none"
                        placeholder="555-123-4567"
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>
              </div>
              
              <div>
                <button
                  type="button"
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  {showPasswordSection ? '- Hide Password Section' : '+ Change Password'}
                </button>
              </div>
              
              {showPasswordSection && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">Change Password</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <div className={`flex items-center border ${errors.currentPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                        <div className="bg-gray-100 p-3 text-gray-500">
                          <FiLock />
                        </div>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className="flex-1 p-3 outline-none"
                        />
                      </div>
                      {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <div className={`flex items-center border ${errors.newPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                        <div className="bg-gray-100 p-3 text-gray-500">
                          <FiLock />
                        </div>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="flex-1 p-3 outline-none"
                        />
                      </div>
                      {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <div className={`flex items-center border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                        <div className="bg-gray-100 p-3 text-gray-500">
                          <FiLock />
                        </div>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="flex-1 p-3 outline-none"
                        />
                      </div>
                      {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="h-5 w-5" />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDeleteRequest}
                  className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 py-2"
                >
                  <FiTrash2 className="h-5 w-5" />
                  Delete Account
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountSettingsPage;