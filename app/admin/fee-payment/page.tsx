"use client";
import ProtectedRoute from "@/routes/ProtectedRoute";
import AdminSidebar from "@/layouts/sidebar/AdminSidebar";
import Navbar from "@/layouts/Navbar";
import { useState } from "react";
import { Search } from "lucide-react";
import DataTable from "@/components/DataTable";
import { useOwner } from "@/hooks/useOwner";
import { OwnerNotActiveHeader } from "@/utils/OwnerHeader";
import { Owner } from "@/types/owner";
import { FormatDate, FormatDateTime } from "@/helpers/FormatDate";
export default function FeePayment() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {notActiveOwners, searchNotActiveOwners, setSearchNotActiveOwners} = useOwner();
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
         <div className="h-screen bg-slate-100 flex overflow-hidden">
            <AdminSidebar isOpen={sidebarOpen} onClose={()=> setSidebarOpen(false)}/>
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
               <Navbar onMenuClick={()=>setSidebarOpen(true)}/>
                  <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                     <div className="max-w-7xl mx-auto space-y-6">
                           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-sky-950">ຕິດຕາມການຊຳລະຄ່າບໍລິການ</h1>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">ກວດສອບ ແລະ ຕິດຕາມການຊຳລະຄ່າບໍລິການຂອງຜູ້ໃຊ້ບໍລິການ</p>
                              </div>
                           </div>
                           <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                             <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col lg:flex-row gap-3 items-center justify-between">
                                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
                                     <div className="relative w-full sm:w-72">
                                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                         <input value={searchNotActiveOwners} onChange={(e)=>setSearchNotActiveOwners(e.target.value)}
                                         type="text"
                                         placeholder="ຄົ້ນຫາຊື່, ນາມສະກຸນ, ເບີໂທ, ອີເມວ..."
                                         className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                         />
                                    </div>
                                </div>
                             </div>
                             <DataTable headers={OwnerNotActiveHeader} itemsPerPage={7} data={notActiveOwners} renderRow={(item: Owner, index: number) => (
                                <tr key={index} className="hover:bg-slate-50 transition">
                                    <td className="py-4 px-4 sm:px-6 font-mono text-sky-950 font-bold">{index + 1}</td>
                                    <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{item.laoName} {item.laoLastname || ""}</td>
                                    <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{item.engName} {item.engLastname || ""} </td>
                                    <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{item.gender} </td>
                                    <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{FormatDate(item.birth)}</td>
                                    <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{item.tel}</td>
                                    <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{item.email}</td>
                                    <td className="py-4 px-4 sm:px-6 font-mono text-end text-sky-950">{FormatDateTime(item.createdAt)}</td>
                                </tr>
                             )}/>
                           </div>
                     </div>
                  </main>
            </div>
         </div>
    </ProtectedRoute>
  )
}