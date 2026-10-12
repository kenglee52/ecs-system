"use client";
import { useState } from "react";
import { Search, Calendar, AlertCircle, Loader2 } from "lucide-react";
import Navbar from "@/layouts/Navbar";
import AdminSidebar from "@/layouts/sidebar/AdminSidebar";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { useOwner } from "@/hooks/useOwner";
import DataTable from "@/components/DataTable";
import { OwnerHeader } from "@/utils/OwnerHeader";
import { Owner } from "@/types/owner";
import { FormatDate, FormatDateTime } from "@/helpers/FormatDate";
import CheckPage from "@/components/CheckPage";

export default function ApprovePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState<"default" | "check">("default");
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [selectedMenu, setSelectedMenu] = useState(0);

  const menu = [
    { name: "ລໍຖ້າກວດສອບ" },
    { name: "ອະນຸມັດແລ້ວ" },
    { name: "ປະຕິເສດ" },
  ]

  const {
    error,
    loading,
    owners,
    approvedOwners,
    searchQuery,
    setSearchQuery,
    startDate,
    setStartDate,
    endDate,
    rejectedOwners,
    setEndDate
  } = useOwner();
    const dataList: Owner[] = selectedMenu === 0 ? owners : selectedMenu === 1 ? approvedOwners : rejectedOwners;
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="h-screen bg-slate-100 flex overflow-hidden">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {page === "default" ? (
              <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-sky-950">ອນຸມັດເປີດຮ້ານ (Approval)</h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">ກວດສອບ ແລະ ອະນຸມັດການເປີດຮ້ານອອນລາຍ ແລະ POS</p>
                  </div>
                  <div className="flex gap-1.5 p-4">
                    {menu.map((item, index) =>
                      selectedMenu === index ? (
                        <button key={index} onClick={()=>setSelectedMenu(index)} className="bg-sky-800 px-3 py-2 rounded-lg font-bold text-white cursor-pointer text-sm">{item.name}</button>
                      ) : (
                        <button key={index} onClick={()=>setSelectedMenu(index)} className="bg-gray-200 px-3 py-2 border font-bold border-gray-400 rounded-lg text-sky-900 cursor-pointer text-sm">{item.name}</button>
                      )
                    )}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>ເກີດຂໍ້ຜິດພາດ: {error}</span>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col lg:flex-row gap-3 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto items-center">
                      <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="ຄົ້ນຫາຊື່, ນາມສະກຸນ, ເບີໂທ, ອີເມວ..."
                          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="relative flex items-center">
                          <Calendar className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                        </div>
                        <span className="text-xs text-slate-400">ເຖິງ</span>
                        <div className="relative flex items-center">
                          <Calendar className="absolute left-3 h-4 w-4 text-slate-400 pointer-events-none" />
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 self-end lg:self-auto">
                      ທັງໝົດ <span className="font-bold text-sky-950">{owners.length}</span> ລາຍການ
                    </div>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                      <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
                      <p className="text-sm text-slate-500">ກຳລັງໂຫຼດຂໍ້ມູນ...</p>
                    </div>
                  ) : (
                    <DataTable
                      headers={OwnerHeader}
                      data={dataList}
                      itemsPerPage={7}
                      renderRow={(item: Owner, index) => (
                        <tr key={index} className="hover:bg-slate-50 transition">
                          <td className="py-4 px-4 sm:px-6 font-mono text-sky-950 font-bold">{index + 1}</td>
                          <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{item.laoName} {item.laoLastname || ""}</td>
                          <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{item.engName} {item.engLastname || ""} </td>
                          <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{item.gender} </td>
                          <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{FormatDate(item.birth)}</td>
                          <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{item.tel}</td>
                          <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{item.email}</td>
                          <td className="py-4 px-4 sm:px-6 font-mono text-sky-950">{FormatDateTime(item.createdAt)}</td>
                          <td>
                            <div className="flex gap-1.5 justify-center items-center">
                              <button
                                onClick={() => {
                                  setSelectedOwner(item);
                                  setPage("check");
                                }}
                                className="text-white p-1.5 rounded-md bg-yellow-600 hover:bg-yellow-700 cursor-pointer hover:scale-95 transform transition duration-300 text-xs font-bold"
                              >
                                {selectedMenu === 0 ? <span>ກວດສອບ</span> : <span>ລາຍລະອຽດ</span>}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    />
                  )}
                </div>
              </div>
            ) : (
              <CheckPage
                owner={selectedOwner}
                onBack={() => {
                  setPage("default");
                  setSelectedOwner(null);
                }}
              />
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}