import { MoreVertical } from "lucide-react";
import Pagination from '../pageNamtion'
const data = [
  {
    name: "John Doe",
    method: "Whatsapp",
    email: "JohnDoe@gmail.com",
    phone: "+1 202 555 0199",
    datetime: "12/05/2025. 03:00pm",
    status: "Upcoming",
  },
  {
    name: "Mary Johnson",
    method: "Email",
    email: "mary.johnson@gmail.com",
    phone: "+44 7700 900123",
    datetime: "18/05/2025. 04:30pm",
    status: "Cancelled",
  },
  {
    name: "Samuel Adeyemi",
    method: "Whatsapp",
    email: "samuelade@gmail.com",
    phone: "+234 812 345 6788",
    datetime: "20/05/2025. 12:00pm",
    status: "Completed",
  },
  {
    name: "Fatima Bello",
    method: "Whatsapp",
    email: "Fatimabello@gmail.com",
    phone: "+233 54 123 4567",
    datetime: "25/05/2025. 10:30am",
    status: "Upcoming",
  },
  {
    name: "Micheal Smith",
    method: "Email",
    email: "Micheal345@gmail.com",
    phone: "+1 416 555 2678",
    datetime: "27/05/2025. 02:00pm",
    status: "Completed",
  },
  {
    name: "John Doe",
    method: "Whatsapp",
    email: "JohnDoe@gmail.com",
    phone: "+1 202 555 0199",
    datetime: "12/05/2025. 03:00pm",
    status: "Upcoming",
  },
  {
    name: "Mary Johnson",
    method: "Email",
    email: "mary.johnson@gmail.com",
    phone: "+44 7700 900123",
    datetime: "18/05/2025. 04:30pm",
    status: "Cancelled",
  },
  {
    name: "Samuel Adeyemi",
    method: "Whatsapp",
    email: "samuelade@gmail.com",
    phone: "+234 812 345 6788",
    datetime: "20/05/2025. 12:00pm",
    status: "Completed",
  },
  {
    name: "Fatima Bello",
    method: "Whatsapp",
    email: "Fatimabello@gmail.com",
    phone: "+233 54 123 4567",
    datetime: "25/05/2025. 10:30am",
    status: "Upcoming",
  },
  {
    name: "Micheal Smith",
    method: "Email",
    email: "Micheal345@gmail.com",
    phone: "+1 416 555 2678",
    datetime: "27/05/2025. 02:00pm",
    status: "Completed",
  },
  // add more rows for testing scroll
];

function StatusBadge({ status }) {
  const colors = {
    Upcoming: "bg-yellow-100 text-yellow-700 border border-yellow-400",
    Completed: "bg-green-100 text-green-700 border border-green-400",
    Cancelled: "bg-red-100 text-red-700 border border-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}

export default function AppointmentTable() {
  return (
    <>
      <div className="rounded-xl  overflow-auto max-h-[450px] overflowWidth-0">
        <table className="w-full text-left text-sm relative border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 sticky top-0 bg-gray-100">Full name</th>
              <th className="p-2 sticky top-0 bg-gray-100">Contact method</th>
              <th className="p-3 sticky top-0 bg-gray-100">Email address</th>
              <th className="p-3 sticky top-0 bg-gray-100">Phone number</th>
              <th className="p-3 sticky top-0 bg-gray-100">Date and time</th>
              <th className="p-3 sticky top-0 bg-gray-100">Status</th>
              <th className="p-3 sticky top-0 bg-gray-100"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-3">{row.name}</td>
                <td className="p-3">{row.method}</td>
                <td className="p-3">{row.email}</td>
                <td className="p-3">{row.phone}</td>
                <td className="p-3">{row.datetime}</td>
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
      <div className="w-full">
        < Pagination />
      </div>
    </>
  );
}
