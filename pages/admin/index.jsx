import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from './adminLayout';
import AppointmentTable from './AdminComponents/Tables/AppointmentTable';
import withAuth from '../../lib/withAuth';
import { getAuthUser } from '../../lib/auth';
import { sessions } from '../../lib/Api'; // Import sessions API

function AdminIndex() {
  const user = getAuthUser();
  const [activeTab, setActiveTab] = useState('All');
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const dropdownRef = useRef(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleExportDropdown = () => {
    setIsExportDropdownOpen(!isExportDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExportDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Export functions
  const exportToCSV = async () => {
    try {
      setIsExporting(true);
      const response = await sessions.getAll();
      const data = response.data || response;
      
      // Filter data based on active tab
      const filteredData = filterDataByTab(data, activeTab);
      
      // Convert to CSV
      const csvContent = convertToCSV(filteredData);
      downloadFile(csvContent, `appointments_${activeTab.toLowerCase()}.csv`, 'text/csv');
      
    } catch (error) {
      console.error('Export to CSV failed:', error);
      alert('Failed to export to CSV. Please try again.');
    } finally {
      setIsExporting(false);
      setIsExportDropdownOpen(false);
    }
  };

  const exportToPDF = async () => {
    try {
      setIsExporting(true);
      const response = await sessions.getAll();
      const data = response.data || response;
      
      // Filter data based on active tab
      const filteredData = filterDataByTab(data, activeTab);
      
      // Create PDF content
      const pdfContent = await generatePDF(filteredData, activeTab);
      downloadFile(pdfContent, `appointments_${activeTab.toLowerCase()}.pdf`, 'application/pdf');
      
    } catch (error) {
      console.error('Export to PDF failed:', error);
      alert('Failed to export to PDF. Please try again.');
    } finally {
      setIsExporting(false);
      setIsExportDropdownOpen(false);
    }
  };

  const exportToGoogleSheets = async () => {
    try {
      setIsExporting(true);
      const response = await sessions.getAll();
      const data = response.data || response;
      
      // Filter data based on active tab
      const filteredData = filterDataByTab(data, activeTab);
      
      // For Google Sheets, we'll create a CSV and provide instructions
      const csvContent = convertToCSV(filteredData);
      downloadFile(csvContent, `appointments_${activeTab.toLowerCase()}_for_google_sheets.csv`, 'text/csv');
      
      // Show instructions for Google Sheets
      alert('CSV file downloaded! To import to Google Sheets:\n1. Open Google Sheets\n2. File > Import\n3. Upload the downloaded CSV file');
      
    } catch (error) {
      console.error('Export for Google Sheets failed:', error);
      alert('Failed to prepare export for Google Sheets. Please try again.');
    } finally {
      setIsExporting(false);
      setIsExportDropdownOpen(false);
    }
  };

  const exportToExcel = async () => {
    try {
      setIsExporting(true);
      const response = await sessions.getAll();
      const data = response.data || response;
      
      // Filter data based on active tab
      const filteredData = filterDataByTab(data, activeTab);
      
      // Create Excel file (using CSV format with .xlsx extension for simplicity)
      const csvContent = convertToCSV(filteredData);
      downloadFile(csvContent, `appointments_${activeTab.toLowerCase()}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      
    } catch (error) {
      console.error('Export to Excel failed:', error);
      alert('Failed to export to Excel. Please try again.');
    } finally {
      setIsExporting(false);
      setIsExportDropdownOpen(false);
    }
  };

  // Helper functions
  const filterDataByTab = (data, tab) => {
    if (tab === 'All') return data;
    return data.filter(item => {
      const status = item.status?.toLowerCase();
      switch (tab.toLowerCase()) {
        case 'upcoming':
          return status === 'upcoming' || status === 'scheduled' || status === 'pending';
        case 'completed':
          return status === 'completed' || status === 'done';
        case 'cancelled':
          return status === 'cancelled' || status === 'canceled';
        default:
          return true;
      }
    });
  };

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return 'No data available';
    
    // Define headers
    const headers = ['Name', 'Email', 'Date', 'Time', 'Status', 'Phone', 'Message'];
    
    // Convert data to CSV rows
    const rows = data.map(item => [
      item.name || '',
      item.email || '',
      item.date || '',
      item.time || '',
      item.status || '',
      item.phone || '',
      (item.message || '').replace(/,/g, ';') // Replace commas to avoid CSV issues
    ]);
    
    // Combine headers and rows
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    return csvContent;
  };

  const generatePDF = async (data, tab) => {
    // For a simple implementation, we'll create a basic text-based PDF content
    // In production, you'd want to use a proper PDF library like jsPDF
    const content = `Appointments Report - ${tab}\n\n`;
    const headers = 'Name\tEmail\tDate\tTime\tStatus\tPhone\n';
    const rows = data.map(item => 
      `${item.name || ''}\t${item.email || ''}\t${item.date || ''}\t${item.time || ''}\t${item.status || ''}\t${item.phone || ''}`
    ).join('\n');
    
    return content + headers + rows;
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const tabs = ['All', 'Upcoming', 'Completed', 'Cancelled'];

  const exportOptions = [
    { label: 'Export as CSV', action: exportToCSV, icon: '📄' },
    { label: 'Export as PDF', action: exportToPDF, icon: '📋' },
    { label: 'Export to Google Sheets', action: exportToGoogleSheets, icon: '📊' },
    { label: 'Export as Excel', action: exportToExcel, icon: '📈' },
  ];

  return (
    <AdminLayout>
      <div className="usernmae font-extrabold font-[Geist] text-[24px] mb-6">
        Welcome Back {user?.name || 'Ejiro'},
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

        {/* Search and Export Section */}
        <div className="flex items-center gap-2">
          <div>
            <input
              type="text"
              placeholder="Search"
              className="w-[300px] border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5B1EF6] focus:border-transparent"
            />
          </div>
          
          {/* Export Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={toggleExportDropdown}
              disabled={isExporting}
              className={`bg-[#5B1EF6] inline-flex items-center gap-2 py-2 px-4 rounded-full text-white text-[14px] font-[Geist] font-[500] hover:bg-[#4A18D4] transition-colors duration-200 cursor-pointer ${
                isExporting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Exporting...
                </>
              ) : (
                <>
                  Export
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform duration-200 ${isExportDropdownOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>

            {/* Dropdown Menu */}
            {isExportDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-1">
                  {exportOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={option.action}
                      className="w-full text-left px-4 py-2 text-[14px] font-[Geist] text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors duration-200"
                    >
                      <span className="text-lg">{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='Appointment'>
        <AppointmentTable activeTab={activeTab} />
      </div>
    </AdminLayout>
  );
}

export default withAuth(AdminIndex);