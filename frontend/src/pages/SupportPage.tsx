import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoSendSharp, IoHelpCircleOutline, IoCallOutline, IoMailOutline, IoTimeOutline } from 'react-icons/io5';

const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button 
              onClick={handleBack}
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <IoArrowBack className="text-gray-600 text-xl" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isSubmitted ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <IoSendSharp className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              We've received your message and will get back to you as soon as possible, 
              usually within 24 hours.
            </p>
            <button
              onClick={handleBack}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors duration-300"
            >
              Return to Home
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a topic</option>
                      <option value="account">Account Issues</option>
                      <option value="booking">Booking Questions</option>
                      <option value="payment">Payment Problems</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors duration-300 flex items-center justify-center"
                    >
                      <IoSendSharp className="mr-2" />
                      Submit Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                        <IoCallOutline className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                        <IoMailOutline className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">support@carrentalplatform.com</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                        <IoTimeOutline className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Hours</p>
                      <p className="text-sm text-gray-600">Monday-Friday: 9AM-6PM</p>
                      <p className="text-sm text-gray-600">Saturday: 10AM-4PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">FAQ</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 flex items-center">
                      <IoHelpCircleOutline className="mr-2 text-blue-500" />
                      How do I become a car renter?
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 flex items-center">
                      <IoHelpCircleOutline className="mr-2 text-blue-500" />
                      What documents do I need?
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 flex items-center">
                      <IoHelpCircleOutline className="mr-2 text-blue-500" />
                      How do payments work?
                    </p>
                  </div>
                  <div className="pt-2">
                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      View all FAQs →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SupportPage;