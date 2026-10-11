"use client";
import { useState } from "react";
import { CheckCircle2, XCircle, Clock, Search, Filter, AlertCircle } from "lucide-react";
import Navbar from "@/layouts/Navbar";
import AdminSidebar from "@/layouts/sidebar/AdminSidebar";
import ProtectedRoute from "@/routes/ProtectedRoute";
interface ApprovalItem {
  id: string;
  title: string;
  user: string;
  amount: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

export default function ApprovePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="h-screen bg-slate-100 flex overflow-hidden">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-sky-950">ອນຸມັດລາຍການ (Approval Management)</h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">ກວດສອບ ແລະ ອະນຸມັດການເຮັດທຸລະກຳຕ່າງໆ ພາຍໃນລະບົບ FINA Central Fee</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="ຄົ້ນຫາລາຍການ, ຊື່ຜູ້ໃຊ້..."
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div className="text-xs text-slate-500 self-end sm:self-auto">
                    ທັງໝົດ <span className="font-bold text-sky-950"></span> ລາຍການ
                  </div>
                </div>
                {/* table here */}

              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}