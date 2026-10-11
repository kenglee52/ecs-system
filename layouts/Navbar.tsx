"use client";
import { useState, useEffect } from "react";
import { Bell, Menu, Calendar, Clock } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format ວັນທີເປັນພາສາລາວ (ຕົວຢ່າງ: ວັນພະຫັດ, 10 ກັນຍາ 2026)
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("lo-LA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format ເວລາ (ຕົວຢ່າງ: 10:39:15 AM)
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 shadow-sm">
      {/* Toggle Button & Date/Time Display */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:text-sky-950 hover:bg-slate-100 rounded-lg transition"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Real-time Clock Widget */}
        <div className="flex items-center gap-2 sm:gap-4 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700">
          {/* ວັນທີ */}
          <div className="flex items-center gap-1.5 text-xs font-medium border-r border-slate-200 pr-3 hidden sm:flex">
            <Calendar className="h-3.5 w-3.5 text-sky-950" />
            <span>{time ? formatDate(time) : "ກຳລັງໂຫຼດ..."}</span>
          </div>

          {/* ເວລາ (Real-time) */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-950">
            <Clock className="h-3.5 w-3.5 text-yellow-600 animate-pulse" />
            <span className="font-mono tracking-wide">{time ? formatTime(time) : "--:--:--"}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 py-3">
        <button className="relative p-2 text-slate-500 hover:text-sky-950 hover:bg-slate-100 rounded-lg transition">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-600 rounded-full ring-2 ring-white" />
        </button>

        <div className="h-6 w-[1px] bg-slate-200" />

        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-sky-950 text-white flex items-center justify-center font-bold text-sm shadow-sm border border-yellow-500/30">
            A
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-bold text-slate-800">Admin User</p>
            <p className="text-[10px] text-slate-500">admin@fina.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}