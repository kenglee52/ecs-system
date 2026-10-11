"use client";

import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-100 shadow-xl p-8 text-center space-y-6">
        {/* Icon & Graphic */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-orange-50 border border-orange-100">
          <ShieldAlert className="w-12 h-12 text-[#FF5E1E]" />
          <div className="absolute -bottom-1 -right-1 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border-2 border-white">
            403 Unauthorization
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-800">
            ບໍ່ມີສິດທິໃນການເຂົ້າເຖິງ
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            ຂໍອະໄພ, ບັນຊີຂອງທ່ານບໍ່ມີສິດເຂົ້າເຖິງໜ້ານີ້. ກະລຸນາກວດສອບສິດທິ (Role) ຂອງທ່ານ ຫຼື ຕິດຕໍ່ຜູ້ດູແລລະບົບ.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => router.back()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ຍ້ອນກັບ</span>
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              router.push("/");
            }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF5E1E] hover:bg-orange-600 text-white font-medium shadow-sm transition-colors text-sm"
          >
            <LogIn className="w-4 h-4" />
            <span>ເຂົ້າສູ່ລະບົບໃໝ່</span>
          </button>
        </div>
      </div>
    </div>
  );
}