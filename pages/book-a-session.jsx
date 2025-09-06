import React, { useState } from 'react'
import { Calendar, Clock, ChevronDown, Loader } from 'lucide-react'
import LandindgLayout from '../components/Layouts/LadingLayout'
import Footer from '../components/Fotter/Footer'
import { sessions } from '../lib/Api';

function BookASession() {
  const [formData, setFormData] = useState({
    fullName: '',
    contactMethod: '',
    email: '',
    phone: '',
    date: '',
    time: ''
  });

  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const contactMethods = [
    'Email',
    'WhatsApp',
    'Phone call'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear any previous messages when user starts typing
    if (submitMessage) {
      setSubmitMessage('');
    }
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.fullName.trim()) errors.push('Full name is required');
    if (!formData.contactMethod) errors.push('Contact method is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.date) errors.push('Date is required');
    if (!formData.time) errors.push('Time is required');
    
    // Basic email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Check if date is in the future
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.push('Please select a future date');
      }
    }
    
    return errors;
  };

  const handleSubmit = async () => {
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setSubmitMessage('Error: ' + validationErrors.join(', '));
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      console.log('Submitting form data:', formData);

      // Prepare data for API (match expected field names)
      const submitData = {
        fullName: formData.fullName.trim(),
        contactMethod: formData.contactMethod,
        email: formData.email.trim().toLowerCase(),
        phone_number: formData.phone.trim(),
        prefered_date: formData.date,
        prefered_time: formData.time
      };

      console.log('Prepared submit data:', submitData);

      // Test API connectivity first
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      console.log('API Base URL:', apiUrl);

      const response = await sessions.book(submitData);

      console.log('Booking success:', response);
      
      setSubmitMessage('Session booked successfully! We\'ll contact you soon. ✅');

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: '',
          contactMethod: '',
          email: '',
          phone: '',
          date: '',
          time: ''
        });
        setSubmitMessage('');
      }, 3000);

    } catch (error) {
      console.error('Booking failed:', error);
      console.error('Full error object:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      let errorMessage = 'Failed to book session. ';
      
      // Handle specific error cases
      if (error.message.includes('fetch')) {
        errorMessage += 'Please check your internet connection and try again.';
      } else if (error.message.includes('Server returned non-JSON')) {
        errorMessage += 'Server error - please try again later or contact support.';
      } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        errorMessage += 'Cannot connect to server. Make sure your backend is running.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      setSubmitMessage('Error: ' + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LandindgLayout>
      {/* Background gradient */}
      <div className="min-h-screen bg-gradient-to-b from-purple-200 via-white to-white flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Just a{" "}
            <span className="bg-gradient-to-r heroStyledText bg-clip-text text-transparent">
              friendly chat
            </span>{" "}to<br />
            explore how we can help
          </h1>
          <p className="mt-4 text-gray-600">
            We wanna understand your needs and challenges.
            
            Get you expert insights and actionable advice.
          </p>

          {/* Submission Message */}
          {submitMessage && (
            <div className={`mt-6 p-4 rounded-lg ${
              submitMessage.includes('Error:') 
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-green-50 border border-green-200 text-green-700'
            }`}>
              {submitMessage}
            </div>
          )}

          {/* Form */}
          <div className="mt-10 space-y-6 text-left">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="John Doe"
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none form-input disabled:bg-gray-50"
              />
            </div>

            {/* Contact Method */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Preferred contact method
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => !isSubmitting && setIsContactDropdownOpen(!isContactDropdownOpen)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg flex justify-between items-center focus:ring-2 focus:ring-purple-500 outline-none form-input disabled:bg-gray-50"
                >
                  <span className={formData.contactMethod ? "text-gray-900" : "text-gray-400"}>
                    {formData.contactMethod || "Select an option"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${isContactDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isContactDropdownOpen && !isSubmitting && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {contactMethods.map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => {
                          handleInputChange("contactMethod", method);
                          setIsContactDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-purple-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="jon.doe@gmail.com"
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none form-input disabled:bg-gray-50"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone number (include country code)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                disabled={isSubmitting}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none form-input disabled:bg-gray-50"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Calendar
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  disabled={isSubmitting}
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                  placeholder="dd/mm/yyyy"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-600 form-input disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Pick a time
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  disabled={isSubmitting}
                  placeholder="00:00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-600 form-input disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Submit */}
            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-700 transition mt-6 button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Booking Session...
                </>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </LandindgLayout>
  )
}

export default BookASession