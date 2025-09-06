import { MoreVertical, RefreshCw, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import Pagination from '../pageNamtion';
import { sessions } from '../../../../lib/Api';

function StatusBadge({ status }) {
  const colors = {
    Upcoming: "bg-yellow-100 text-yellow-700 border border-yellow-400",
    Completed: "bg-green-100 text-green-700 border border-green-400",
    Cancelled: "bg-red-100 text-red-700 border border-red-400",
    Pending: "bg-blue-100 text-blue-700 border border-blue-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status] || colors.Pending}`}
    >
      {status}
    </span>
  );
}

export default function AppointmentTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Format date for display
  // const formatDateTime = (dateString, timeString) => {
  //   try {
  //     if (!dateString) return 'Not set';
      
  //     const date = new Date(dateString);
  //     const dateFormatted = date.toLocaleDateString('en-GB', {
  //       day: '2-digit',
  //       month: '2-digit',
  //       year: 'numeric'
  //     });
      
  //     if (timeString) {
  //       return `${dateFormatted}. ${timeString}`;
  //     }
      
  //     return dateFormatted;
  //   } catch (error) {
  //     console.error('Date formatting error:', error);
  //     return 'Invalid date';
  //   }
  // };

  // Load sessions from API
  const loadSessions = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      setError(null);
      
      const response = await sessions.getAll();
      
      // Transform API data to match table format
      const transformedData = response.data ? response.data.map(session => ({
        id: session.id,
        name: session.fullName || session.full_name || 'Unknown',
        method: session.contactMethod || session.contact_method || 'Not specified',
        email: session.email || 'Not provided',
        phone: session.phone_number || 'Not provided',
        // datetime: formatDateTime(session.prefered_date, session.prefered_time),
       datetime: `${session.date || 'Not set'} ${session.time || ''}`.trim(),


        status: session.status || 'Pending',
        rawDate: session.date,
        rawTime: session.time
      })) : [];
      
      setData(transformedData);
      
    } catch (error) {
      console.error('Error loading sessions:', error);
      setError(error.message);
      
      // If API fails, keep any existing data
      if (data.length === 0) {
        // Fallback to empty state
        setData([]);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Update session status
  const handleStatusUpdate = async (sessionId, newStatus) => {
    try {
      await sessions.updateStatus(sessionId, newStatus);
      
      // Update local state
      setData(prevData => 
        prevData.map(session => 
          session.id === sessionId 
            ? { ...session, status: newStatus }
            : session
        )
      );
      
      alert('Session status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update session status: ' + error.message);
    }
  };

  // Delete session
  const handleDelete = async (sessionId) => {
    if (!confirm('Are you sure you want to delete this session?')) {
      return;
    }
    
    try {
      await sessions.delete(sessionId);
      
      // Remove from local state
      setData(prevData => prevData.filter(session => session.id !== sessionId));
      
      alert('Session deleted successfully!');
    } catch (error) {
      console.error('Error deleting session:', error);
      alert('Failed to delete session: ' + error.message);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadSessions();
  }, []);

  // Refresh function
  const handleRefresh = () => {
    loadSessions(true);
  };

  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Appointment Sessions ({data.length})
        </h2>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error: {error}</p>
          <button 
            onClick={() => loadSessions()}
            className="mt-2 text-red-700 underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      <div className="rounded-xl overflow-auto max-h-[450px] border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <Loader className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Loading sessions...</span>
          </div>
        ) : (
          <table className="w-full text-left text-sm relative border-collapse">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 sticky top-0 bg-gray-100">Full name</th>
                <th className="p-2 sticky top-0 bg-gray-100">Contact method</th>
                <th className="p-3 sticky top-0 bg-gray-100">Email address</th>
                <th className="p-3 sticky top-0 bg-gray-100">Phone number</th>
                <th className="p-3 sticky top-0 bg-gray-100">Date and time</th>
                <th className="p-3 sticky top-0 bg-gray-100">Status</th>
                <th className="p-3 sticky top-0 bg-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    {error ? 'Failed to load sessions' : 'No sessions found'}
                  </td>
                </tr>
              ) : (
                data.map((row, idx) => (
                  <tr key={row.id || idx} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{row.name}</td>
                    <td className="p-3">{row.method}</td>
                    <td className="p-3">{row.email}</td>
                    <td className="p-3">{row.phone}</td>
                    <td className="p-3">{row.datetime}</td>
                    <td className="p-3">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {/* Status update dropdown */}
                        <select
                          value={row.status}
                          onChange={(e) => handleStatusUpdate(row.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Upcoming">Upcoming</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        
                        {/* Delete button */}
                        <button 
                          onClick={() => handleDelete(row.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Delete session"
                        >
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      
      {data.length > 0 && (
        <div className="w-full mt-4">
          <Pagination />
        </div>
      )}
    </>
  );
}