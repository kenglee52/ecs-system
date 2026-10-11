"use client";
import { LayoutDashboard, Receipt, Users, Settings, LogOut, X, FolderEdit } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const menuItems = [
    { title: "ໜ້າຫຼັກ (Dashboard)", icon: LayoutDashboard, path: "/admin/dashboard" },
    { title: "ອະນຸມັດເປີດຮ້ານ", icon: Receipt, path: "/admin/approve" },
    { title: "ຕິດຕາມການຈ່າຍຄ່າບໍລິການ", icon: Users, path: "/admin/fee-payment" },
    { title: "ຈັດການຜູ້ດູແລລະບົບ", icon: FolderEdit, path: "/admin/manage-admin" },
    { title: "ລາຍງານລາຍຮັບ", icon: Settings, path: "/admin/income-report" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-sky-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-64 bg-sky-900 text-white flex flex-col justify-between shadow-2xl lg:shadow-xl transition-transform duration-300 ease-in-out border-r border-sky-900/50 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          <div className="p-5 border-b border-yellow-500/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/usn6hg0h/image/upload/v1791689695/Gemini_Generated_Image_mphtfdmphtfdmpht.jpg"
                alt="ECS System"
                className="w-11 h-10 rounded-lg object-fill border border-yellow-500/30"
              />
              <div>
                <h1 className="text-sm font-bold tracking-wide text-white">LAO ECS</h1>
                <p className="text-[10px] text-sky-300">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-sky-300 hover:text-white hover:bg-white/10 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link
                  key={index}
                  href={item.path || "#"}
                  onClick={onClose} 
                  className={`cursor-pointer w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-yellow-600 text-white shadow-md shadow-yellow-600/30 font-semibold"
                      : "text-sky-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-sky-900/60">
          <button
            onClick={() => {
              localStorage.clear();
              router.push("/");
            }}
            className="w-full flex cursor-pointer items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <LogOut className="h-4 w-4" />
            <span>ອອກຈາກລະບົບ</span>
          </button>
        </div>
      </aside>
    </>
  );
}