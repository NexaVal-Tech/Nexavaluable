import React, { useState } from 'react'
import { Calendar, Clock, ChevronDown } from 'lucide-react'
import LandindgLayout from '../components/Layouts/LadingLayout'
import Footer from '../components/Fotter/Footer'

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

  const contactMethods = [
    'Email',
    'WhatsApp',
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // TODO: Handle form submission (API, email, etc.)
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
            </span>{" "}<br />
            to explore how we can help
          </h1>
          <p className="mt-4 text-gray-600">
            We want to understand your needs and challenges.
            <br />
            Get you expert insights and actionable advice.
          </p>

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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none form-input"
              />
            </div>

            {/* Contact Method */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Preferred contact Method
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsContactDropdownOpen(!isContactDropdownOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg flex justify-between items-center focus:ring-2 focus:ring-purple-500 outline-none form-input"
                >
                  <span className={formData.contactMethod ? "text-gray-900" : "text-gray-400"}>
                    {formData.contactMethod || "Select an option"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${isContactDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isContactDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                    {contactMethods.map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => {
                          handleInputChange("contactMethod", method);
                          setIsContactDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-purple-50 first:rounded-t-lg last:rounded-b-lg"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none form-input"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none form-input"
              />
            </div>

            {/* Date & Time */}

            {/* Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Pick a date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-600 form-input"
                  />
                  {/* <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-600 form-input"
                  />
                  {/* <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                </div>
              </div>

            {/* Submit */}
            <button type="button" onClick={handleSubmit} className="w-full bg-purple-600 text-white font-semibold py-4 px-6 rounded-full hover:bg-purple-700 transition mt-6 button">
              Continue
            </button>
          </div>
        </div>
      </div>

        < Footer />
    </LandindgLayout>
  )
}

export default BookASession
