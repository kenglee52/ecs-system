"use client";

import { useState } from "react";
import { AuthLogin } from "@/authentication/auth";
export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    await AuthLogin(phone, password);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-sky-800 to-sky-950 w-full relative py-12 px-4 flex items-center justify-center">

      {/* ໄຟພື້ນຫຼັງ (Glow effect) ໃຫ້ເຂົ້າກັບໜ້າ Home */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">

        {/* ຝັ່ງຊ້າຍ: ຂໍ້ຄວາມຕ້ອນຮັບ ແລະ ຮູບໂປສເຕີ */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left px-3">
          <h1 className="text-2xl md:text-3xl text-white font-bold mb-3">
            ຍິນດີຕ້ອນຮັບກັບຄືນສູ່ <span className="text-yellow-500">ALL IN ONE</span>
          </h1>
          <p className="text-sm md:text-base text-sky-200 mb-6 leading-relaxed font-light">
            ເຂົ້າສູ່ລະບົບເພື່ອຈັດການຮ້ານຄ້າ, ຕິດຕາມສິນຄ້າ ແລະ ເພີດເພີນກັບສິດທິພິເສດຕ່າງໆໃນຕະຫຼາດດີຈີຕອນຂອງພວກເຮົາໄດ້ເລີຍ.
          </p>

          <div className="relative p-2 bg-white/10 backdrop-blur-md rounded-3xl shadow-xl border border-yellow-500/30 hidden md:block">
            <img
              src="https://res.cloudinary.com/usn6hg0h/image/upload/v1791689695/Gemini_Generated_Image_mphtfdmphtfdmpht.jpg"
              className="object-cover max-w-[200px] rounded-2xl w-full h-auto block opacity-90"
              alt="Univers Shopping Poster"
            />
          </div>
        </div>

        {/* ຝັ່ງຂວາ: ຟອມເຂົ້າສູ່ລະບົບ */}
        <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-4 border-yellow-500/30">
          <div className="flex gap-4">
            <img
              src="https://res.cloudinary.com/usn6hg0h/image/upload/v1791689695/Gemini_Generated_Image_mphtfdmphtfdmpht.jpg"
              className="object-fill w-[65px]  rounded-2xl h-[65px] block opacity-90"
              alt="Univers Shopping Poster"
            />
            <div className="text-start mb-8">
              <h2 className="text-2xl font-bold text-sky-950">ເຂົ້າສູ່ລະບົບ</h2>
              <p className="text-sm text-gray-500 mt-1">ກະລຸນາໃສ່ເບີໂທລະສັບ ແລະ ລະຫັດຜ່ານຂອງທ່ານ</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* ເບີໂທລະສັບ */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                ເບີໂທລະສັບ
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="020XXXXXXXX"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* ລະຫັດຜ່ານ */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ລະຫັດຜ່ານ
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-500 hover:text-gray-700 font-medium"
                >
                  {showPassword ? "ຊ່ອນ" : "ສະແດງ"}
                </button>
              </div>
            </div>

            {/* ປຸ່ມກົດເຂົ້າສູ່ລະບົບ */}
            <button
              type="submit"
              className="w-full mb-5 mt-4 py-3.5 px-4 bg-yellow-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg shadow-yellow-600/30 hover:shadow-none hover:scale-[0.98] transform transition duration-200 cursor-pointer"
            >
              ເຂົ້າສູ່ລະບົບ
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}