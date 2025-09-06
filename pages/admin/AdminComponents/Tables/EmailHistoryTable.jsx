// pages/admin/AdminComponents/Tables/EmailHistoryTable.jsx
import { MoreVertical, Plus } from "lucide-react";
import Pagination from "../pageNamtion"; // assuming you already have a pagination component
import { useEffect, useState } from "react";
import { emails } from "../../../../lib/Api"; // adjust relative path if needed

function StatusBadge({ status }) {
  const colors = {
    Scheduled: "bg-yellow-100 text-yellow-700 border border-yellow-400",
    Sent: "bg-green-100 text-green-700 border border-green-400",
    Failed: "bg-red-100 text-red-700 border border-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function EmailHistoryTable() {
  const [mailHistory, setMailHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  // Fetch email history with optional page
  const fetchHistory = async (page = 1) => {
    setLoading(true);
    try {
      // pass query string for pagination
      const response = await emails.getHistory(`?page=${page}`);
      console.log("Email history response:", response);

      // Laravel returns: { success: true, data: { data: [ ... ], ...pagination } }
      const history = response?.data?.data || [];
      setMailHistory(history);

      // save pagination info
      setPagination({
        current_page: response?.data?.current_page || 1,
        last_page: response?.data?.last_page || 1,
        total: response?.data?.total || 0,
      });
    } catch (err) {
      console.error("Failed to fetch email history:", err.message);
      setMailHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(1);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p>Loading email history...</p>
      </div>
    );
  }

  return (
    <>
      {mailHistory.length === 0 ? (
        <div className="col">
          <div className="row h-[500px] ">
            <div className="col flex items-center justify-center flex-col text-center ">
              <div className="email">
                <img src="/icons/NomailIcon.svg" alt="" />
              </div>
              <div className="text mt-3">
                <h2 className="font-[Geist] font-[700] text-[20px]">
                  No Emails Sent Yet
                </h2>
                <p className="text-[14px]">
                  Start engaging with your clients by sending <br /> personalized
                  mass emails
                </p>
              </div>
              <div className="inline-block mt-4">
                <div className="btn bg-[#5B1EF6] flex items-center justify-center gap-2 rounded-full text-white cursor-pointer">
                  Compose Email <Plus size={20} color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-xl overflow-auto max-h-[450px] overflowWidth-0">
            <table className="w-full text-left text-sm relative border-collapse">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 sticky top-0 bg-gray-100">Subject</th>
                  <th className="p-3 sticky top-0 bg-gray-100">Recipients</th>
                  <th className="p-3 sticky top-0 bg-gray-100">Template</th>
                  <th className="p-3 sticky top-0 bg-gray-100">Date Sent</th>
                  <th className="p-3 sticky top-0 bg-gray-100">Status</th>
                  <th className="p-3 sticky top-0 bg-gray-100"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mailHistory.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-3">{row.subject}</td>
                    <td className="p-3">{row.recipients_filter}</td>
                    <td className="p-3">{row.body}</td>
                    <td className="p-3">{row.sent_at}</td>
                    <td className="p-3">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="p-3 text-right">
                      <button className="p-2 rounded hover:bg-gray-100">
                        <MoreVertical size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.last_page > 1 && (
            <div className="w-full mt-4">
              <Pagination
                currentPage={pagination.current_page}
                lastPage={pagination.last_page}
                onPageChange={fetchHistory}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
