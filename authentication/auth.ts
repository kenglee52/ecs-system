import api from "@/config/axios";
import { toast } from "react-toastify";

export const AuthLogin = async (tel: string, password: string) => {
  try {
    const res = await api.post("/user/login", { tel, password });
    console.log(res.data);
    toast.success("ເຂົ້າສູ່ລະບົບສຳເລັດ");
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