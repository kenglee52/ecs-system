import api from "@/config/axios";
import { toast } from "react-toastify";

export const AuthLogin = async (tel: string, password: string) => {
  try {
    const res = await api.post("/user/login", { tel, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("userId", res.data.user._id);
    toast.success("ເຂົ້າສູ່ລະບົບສຳເລັດ");
    console.log(res.data);
    return res.data;

  } catch (error: any) {
    console.error(error);
    if (error.response && error.response.status === 401) {
      toast.error("ເບີໂທລະສັບ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ");
    } else {
      toast.error("ເກີດຂໍ້ຜິດພາດໃນເຊີບເວີ");
    }
    
    throw error;
  }
};