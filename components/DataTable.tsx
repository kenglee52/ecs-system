"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps {
  headers: string[];
  data: any[];   
  renderRow: (item: any, index: number) => React.ReactNode; 
  itemsPerPage?: number;
}

export default function DataTable({ headers, data, renderRow, itemsPerPage = 7 }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-sky-800 border-b border-slate-200 text-white text-[11px] uppercase tracking-wider">
              {headers.map((header, index) => (
                <th 
                  key={index} 
                  className={`py-3 px-4 sm:px-6 ${index === headers.length - 1 ? "text-right" : "text-left"}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {currentData.length > 0 ? (
              currentData.map((item, index) => renderRow(item, startIndex + index))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center py-10 text-slate-400">
                  ບໍ່ພົບລາຍການຂໍ້ມູນ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            ສະແດງ <span className="font-bold text-sky-950">{startIndex + 1}</span> ເຖິງ{" "}
            <span className="font-bold text-sky-950">
              {Math.min(startIndex + itemsPerPage, data.length)}
            </span>{" "}
            ຈາກທັງໝົດ <span className="font-bold text-sky-950">{data.length}</span> ລາຍການ
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-semibold text-slate-700 px-3">
              ໜ້າ {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



// How To Use
// "use client";
// import { useState } from "react";
// import DataTable from "@/components/DataTable";

// export default function UserPage() {
//   // ປະກາດ Header ຕາມທີ່ຕ້ອງການ
//   const UserHeader = ['userId', 'username', 'manage button'];

//   // ຂໍ້ມູນ Data ຕົວຢ່າງ (ຖ່າມີຫລາຍກວ່າ 7 ລາຍການ ມັນຈະແບ່ງໜ້າອັດຕະໂນມັດ)
//   const userList = [
//     { id: "U-001", name: "ສົມສັກ ໃຈດີ" },
//     { id: "U-002", name: "ມະນີວອນ ສຸວັນ" },
//     { id: "U-003", name: "ວຽງຄຳ ພົມມະສານ" },
//     { id: "U-004", name: "ສຸກສະຫວັນ ແສງຈັນ" },
//     { id: "U-005", name: "ຈັນທະວົງ ວົງສາ" },
//     { id: "U-006", name: "ນິດາ ພອນປະເສີດ" },
//     { id: "U-007", name: "ສອນທະວີ ສີສຸວັນ" },
//     { id: "U-008", name: "ວັນນະອນ ສຸລິຍະ" },
//   ];

//   return (
//     <div className="p-6">
//       <DataTable 
//         headers={UserHeader} 
//         data={userList} 
//         itemsPerPage={7} // ກຳນົດໃຫ້ສະແດງສູງສຸດ 7 ລາຍການໃນໜ້າທຳອິດ
//         renderRow={(item) => (
//           <tr key={item.id} className="hover:bg-slate-50 transition">
//             <td className="py-4 px-4 sm:px-6 font-mono text-sky-950 font-bold">{item.id}</td>
//             <td className="py-4 px-4 sm:px-6 font-medium">{item.name}</td>
//             <td className="py-4 px-4 sm:px-6 text-right">
//               <button className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-[11px]">
//                 ຈັດການ
//               </button>
//             </td>
//           </tr>
//         )}
//       />
//     </div>
//   );
// }