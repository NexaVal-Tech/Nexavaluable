import React, { useState, useEffect } from 'react';
import { X, Bold, Italic, Link, Strikethrough, List, Search, User } from 'lucide-react';
import { emails, users } from '../../../lib/Api'; // Make sure the path and case match your actual file

// Helper function to convert array of recipients to comma-separated string
const formatRecipientsForAPI = (recipients) => {
  if (Array.isArray(recipients)) {
    return recipients.join(', ');
  }
  return recipients; // Already a string
};

const ComposeEmailModal = ({ isOpen, onClose, onSend }) => {
  const [emailData, setEmailData] = useState({
    type: 'mass', // 'mass' or 'individual'
    recipients: 'all',
    selectedUsers: [], // For individual emails
    subject: '',
    body: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Load users when modal opens or when switching to individual
  useEffect(() => {
    if (isOpen) {
      loadUsers();
    }
  }, [isOpen]);

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = usersList.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(usersList);
    }
  }, [searchTerm, usersList]);

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      // Call your Laravel users endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/v1/admin/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Users response:', data);
      
      // Based on your Laravel controller, the structure is data.data.users
      const users = data.data?.users || data.users || [];
      setUsersList(users);
      setFilteredUsers(users);
    } catch (error) {
      console.error('Error loading users:', error);
      // Fallback mock data for development - remove this in production
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'johndoe@gmail.com' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@gmail.com' },
        { id: 3, name: 'Mike Johnson', email: 'mikejohnson@gmail.com' },
        { id: 4, name: 'Sarah Wilson', email: 'sarahwilson@gmail.com' },
        { id: 5, name: 'David Brown', email: 'davidbrown@gmail.com' }
      ];
      setUsersList(mockUsers);
      setFilteredUsers(mockUsers);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEmailData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmailTypeChange = (newType) => {
    console.log('Email type changing from', emailData.type, 'to', newType);
    setEmailData(prev => ({
      ...prev,
      type: newType,
      selectedUsers: newType === 'mass' ? usersList : [] // Auto-select all for mass email
    }));
    setSearchTerm('');
    console.log('Email type changed successfully');
  };

  const handleUserSelection = (user) => {
    setEmailData(prev => {
      const isSelected = prev.selectedUsers.some(u => u.id === user.id);
      const newSelectedUsers = isSelected
        ? prev.selectedUsers.filter(u => u.id !== user.id)
        : [...prev.selectedUsers, user];
      
      return {
        ...prev,
        selectedUsers: newSelectedUsers
      };
    });
  };

  const selectAllUsers = () => {
    const allFiltered = filteredUsers.every(user => 
      emailData.selectedUsers.some(selected => selected.id === user.id)
    );
    
    if (allFiltered) {
      // Remove all filtered users from selection
      setEmailData(prev => ({
        ...prev,
        selectedUsers: prev.selectedUsers.filter(selected => 
          !filteredUsers.some(filtered => filtered.id === selected.id)
        )
      }));
    } else {
      // Add all filtered users to selection (avoid duplicates)
      setEmailData(prev => {
        const newUsers = filteredUsers.filter(filtered => 
          !prev.selectedUsers.some(selected => selected.id === filtered.id)
        );
        return {
          ...prev,
          selectedUsers: [...prev.selectedUsers, ...newUsers]
        };
      });
    }
  };

  const handleSend = async () => {
    if (!emailData.subject || !emailData.body) {
      alert('Please fill in both subject and body');
      return;
    }

    let recipientEmails;
    if (emailData.type === 'mass') {
      // For mass email, use all users from database
      recipientEmails = usersList.map(user => user.email);
    } else {
      // For individual email, use selected users
      if (emailData.selectedUsers.length === 0) {
        alert('Please select at least one recipient');
        return;
      }
      recipientEmails = emailData.selectedUsers.map(user => user.email);
    }

    setIsLoading(true);
    try {
      const emailPayload = {
        type: emailData.type,
        recipients: formatRecipientsForAPI(recipientEmails), // Convert array to string
        subject: emailData.subject,
        body: emailData.body
      };
      
      await emails.send(emailPayload);
      onSend && onSend(emailPayload);
      setEmailData({ type: 'mass', recipients: 'all', selectedUsers: [], subject: '', body: '' });
      setSearchTerm('');
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      alert(error.message || 'Failed to send email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      let recipientEmails;
      if (emailData.type === 'mass') {
        recipientEmails = usersList.map(user => user.email);
      } else {
        recipientEmails = emailData.selectedUsers.map(user => user.email);
      }

      const draftPayload = {
        type: emailData.type,
        recipients: formatRecipientsForAPI(recipientEmails), // Convert array to string
        subject: emailData.subject,
        body: emailData.body
      };
      
      await emails.saveDraft(draftPayload);
      alert('Draft saved successfully');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert(error.message || 'Failed to save draft.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
            <h2 className="text-[24px] font-extrabold font-[Geist]">Compose Email</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Email Type */}
          <div>
            <h3 className="text-[16px] font-medium mb-3">Email Type</h3>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="emailType"
                  value="mass"
                  checked={emailData.type === 'mass'}
                  onChange={(e) => handleEmailTypeChange(e.target.value)}
                  className="w-4 h-4 text-[#5B1EF6]"
                />
                <span className="text-[14px]">Mass Email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="emailType"
                  value="individual"
                  checked={emailData.type === 'individual'}
                  onChange={(e) => handleEmailTypeChange(e.target.value)}
                  className="w-4 h-4 text-[#5B1EF6]"
                />
                <span className="text-[14px]">Individual Email</span>
              </label>
            </div>
          </div>

          {/* Send To */}
          <div>
            <h3 className="text-[16px] font-medium mb-3">Send To</h3>
            
            {/* Mass Email Display */}
            {emailData.type === 'mass' && (
              <div className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium">All Users</span>
                  <span className="text-[12px] text-gray-600">
                    {loadingUsers ? 'Loading...' : `${usersList.length} recipients`}
                  </span>
                </div>
                <p className="text-[12px] text-gray-500 mt-1">
                  This email will be sent to all users in your database
                </p>
              </div>
            )}

            {/* Individual Email Selection */}
            {emailData.type === 'individual' && (
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-[#5B1EF6]"
                  />
                </div>

                {/* Selected Count & Select All */}
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-gray-600">
                    {emailData.selectedUsers.length} of {filteredUsers.length} users selected
                  </span>
                  <button
                    onClick={selectAllUsers}
                    className="text-[14px] text-[#5B1EF6] hover:text-[#4A18D4] font-medium"
                  >
                    {filteredUsers.every(user => emailData.selectedUsers.some(selected => selected.id === user.id))
                      ? 'Deselect All' 
                      : 'Select All'
                    }
                  </button>
                </div>

                {/* Users List */}
                <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
                  {loadingUsers ? (
                    <div className="p-4 text-center text-gray-500">Loading users...</div>
                  ) : filteredUsers.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      {searchTerm ? 'No users found matching your search' : 'No users available'}
                    </div>
                  ) : (
                    filteredUsers.map(user => (
                      <div key={user.id} className="p-3 hover:bg-gray-50 border-b last:border-b-0">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={emailData.selectedUsers.some(u => u.id === user.id)}
                            onChange={() => handleUserSelection(user)}
                            className="w-4 h-4 text-[#5B1EF6]"
                          />
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <User size={16} className="text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <div className="text-[14px] font-medium">{user.name}</div>
                              <div className="text-[12px] text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Subject */}
          <div>
            <h3 className="text-[16px] font-medium mb-3">Subject</h3>
            <input
              type="text"
              placeholder="Enter email subject"
              value={emailData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-[#5B1EF6]"
            />
          </div>

          {/* Body */}
          <div>
            <h3 className="text-[16px] font-medium mb-3">Body</h3>
            
            {/* Toolbar */}
            <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-t-lg border">
              <button className="p-2 hover:bg-gray-200 rounded">
                <Bold size={16} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <Italic size={16} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <Link size={16} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <Strikethrough size={16} />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <List size={16} />
              </button>
            </div>

            {/* Text Area */}
            <textarea
              placeholder="Compose your email here"
              value={emailData.body}
              onChange={(e) => handleInputChange('body', e.target.value)}
              className="w-full p-4 border border-t-0 border-gray-300 rounded-b-lg text-[14px] min-h-[200px] focus:outline-none focus:border-[#5B1EF6] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <button
            onClick={handleSaveDraft}
            className="text-[14px] text-gray-600 hover:text-gray-800 font-medium"
          >
            Save as Draft
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-full text-[14px] font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="px-6 py-2 bg-[#5B1EF6] text-white rounded-full text-[14px] font-medium hover:bg-[#4A18D4] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Email'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeEmailModal;