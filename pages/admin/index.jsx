import React from 'react'
import AdminLayout from './adminLayout'
import AppointmentTable from './AdminComponents/Tables/AppointmentTable'
function index() {
  return (
    <AdminLayout>
      <div className="usernmae font-extrabold font-[Geist] text-[24px]">
        Welcome Back Ejiro,
      </div>
      <div className="mt-3 flex item w-[100%] justify-between ">
        <div className="row bg-[#F0F1F2] w-[40%] rounded-full ">
          <ul className="flex w-full items-center justify-between font-[400] text-[14px] font-[Geist]">
            <li>All</li>
            <li>Upcoming</li>
            <li>Completed</li>
            <li>Cancelled</li>
          </ul>
        </div>
        <div className=" w-[384px] flex gap-2">
          <div className="">
            <input
              type="text"
              placeholder="Search"
              className="w-[300px] border-1 p-2 rounded-md"
            />
          </div>
          <div className=" bg-[#5B1EF6] inline-block py-2 px-3 rounded-full text-white">Export</div>
        </div>
      </div>
      <div className='Appointment mt-4 '>
        < AppointmentTable />
      </div>
    </AdminLayout>
  );
}

export default index