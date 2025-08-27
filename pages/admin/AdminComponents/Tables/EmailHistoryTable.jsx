import { MoreVertical, Plus } from "lucide-react";
import Pagination from "../pageNamtion";
import { useEffect } from "react";
const MailHistory = [
  {
    subject: "Reminder",
    recipients: "Upcoming",
    template: "With Image",
    dateSent: "12/05/2025 2:30 PM",
    status: "Scheduled",
  },
  {
    subject: "Reminder",
    recipients: "Upcoming",
    template: "With Image",
    dateSent: "12/05/2025 2:30 PM",
    status: "Scheduled",
  },
  {
    subject: "Reminder",
    recipients: "Upcoming",
    template: "With Image",
    dateSent: "12/05/2025 2:30 PM",
    status: "Scheduled",
  },

  // add more rows for testing scroll
];

function StatusBadge({ status }) {


    
  const colors = {
    Scheduled: "bg-yellow-100 text-yellow-700 border border-yellow-400",
    sent: "bg-green-100 text-green-700 border border-green-400",
    Failed: "bg-red-100 text-red-700 border border-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}

export default function EmailHistoryTable() {

  return (
    <>
      {MailHistory.length === 0 ? (
        <>
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
                    Start engaging with your clients by sending <br />{" "}
                    personalized mass emails
                  </p>
                </div>
                <div className="inline-block mt-4">
                  <div className="btn bg-[#5B1EF6] flex items-center justify-center gap-2 rounded-full text-white">
                    Compose Email{" "}
                    <span>
                      {" "}
                      <Plus size={20} color="white" />{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-xl  overflow-auto max-h-[450px] overflowWidth-0">
            <table className="w-full text-left text-sm relative border-collapse">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="p-3 sticky top-0 bg-gray-100">Subject</th>

                  <th className="p-3 sticky top-0 bg-gray-100"> Recipients</th>
                  <th className="p-3 sticky top-0 bg-gray-100"> Template</th>
                  <th className="p-3 sticky top-0 bg-gray-100">Date Sent</th>
                  <th className="p-3 sticky top-0 bg-gray-100">Status</th>
                  <th className="p-3 sticky top-0 bg-gray-100"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {MailHistory.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-3">{row.subject}</td>
                    <td className="p-3">{row.recipients}</td>
                    <td className="p-3">{row.template}</td>
                    <td className="p-3">{row.dateSent}</td>
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
          {MailHistory.length > 10 ? (
            <div className="w-full">
              <Pagination />
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}
