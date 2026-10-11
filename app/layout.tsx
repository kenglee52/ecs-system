import type { Metadata } from "next";
import { Noto_Sans_Lao } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

// ຕັ້ງຄ່າ Noto Sans Lao
const noto_sans_lao = Noto_Sans_Lao({
  subsets: ["lao"],
  weight: ["300", "400", "500", "600", "700"], // ເລືອກຂະໜາດນ້ຳໜັກທີ່ຕ້ອງການໃຊ້
  variable: "--font-noto-sans-lao",
});

export const metadata: Metadata = {
  title: "E-Commerce Service All In One",
  description: "ຕະຫຼາດແຫ່ງດີຈີຕອນ ລວມທຸກຕະຫຼາດທົ່ວປະເທດເຂົ້າດ້ວຍກັນໃນທີ່ດຽວ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ປ່ຽນ lang ເປັນ "lo" ແລະ ປະກາດໃຊ້ variable font
    <html
      lang="lo"
      className={`${noto_sans_lao.variable} h-full antialiased`}
    >
      {/* ບັງຄັບໃຫ້ body ໃຊ້ font Noto Sans Lao ເປັນຕົ້ນຕໍ */}
      <body className="min-h-full flex flex-col font-sans">
        {children}
         <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        /> 
      </body>
    </html>
  );
}