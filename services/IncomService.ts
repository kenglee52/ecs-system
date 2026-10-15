import api from "@/config/axios";
import { toast } from "react-toastify";

export const getAllIncomes = async () => {
     try {
         const res = await api.get("/income");
         console.log(`income: ${res.data}`);
         return res.data;
     } catch (error: any) {
         console.error(error);
         toast.error(error || "ບໍ່ສາມາດໂຫລດຂໍ້ມູນໄດ້");
     }    
}