import React, { useState } from 'react'
import AdminLayout from './adminLayout'
import EmailHistoryTable from './AdminComponents/Tables/EmailHistoryTable'
import ComposeEmailModal from './AdminComponents/ComposeEmailModal'
import withAuth from '../../lib/withAuth'

function Index() {
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const handleComposeClick = () => {
    setIsComposeModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsComposeModalOpen(false);
  };

  const handleEmailSent = (emailData) => {
    // Handle successful email send
    console.log('Email sent:', emailData);
    // You can add logic here to refresh the email history table or show a success message
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];

  return (
    <AdminLayout>
      <div className="usernmae font-extrabold font-[Geist] text-[24px] mb-6">
        Email History
      </div>
      
      <div className="flex items-center justify-between mb-6">
        {/* Tab Navigation */}
        <div className="bg-[#F0F1F2] rounded-full p-1 inline-flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`
                px-4 py-2 rounded-full text-[14px] font-[Geist] font-[400] transition-all duration-200
                ${activeTab === tab 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Compose Email Button */}
        <button 
          onClick={handleComposeClick} 
          className="bg-[#5B1EF6] inline-flex items-center gap-2 py-2 px-4 rounded-full text-white text-[14px] font-[Geist] font-[500] hover:bg-[#4A18D4] transition-colors duration-200 cursor-pointer"
        >
          Compose Email
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="Appointment">
        <EmailHistoryTable activeTab={activeTab} />
      </div>

      {/* Compose Email Modal */}
      <ComposeEmailModal
        isOpen={isComposeModalOpen}
        onClose={handleCloseModal}
        onSend={handleEmailSent}
      />
    </AdminLayout>
  );
}

export default withAuth(Index);