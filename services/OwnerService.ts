import api from "@/config/axios";
import {toast} from "react-toastify";
export const getAllOwnerWaitingApprove = async() => {
  try {
     const res = await api.get("/user/owner");
     console.log(res.data);
     return res.data;
  } catch (error: any) {
     console.error(error);
     toast.error(error || "ການໂຫລດຂໍ້ມູນລົ້ມເຫຼວ")
  }
}

export const getAllOwnerThatApproved = async () =>{ 
  try {
    const res = await api.get("/user/approved");
    console.log(res.data);
    return res.data;
  } catch (error: any) {
     console.error(error);
     toast.error(error || "ການໂຫລດຂໍ້ມູນລົ້ມເຫຼວ")  
  }
}

export const ApproveOwner = async(id: string) => {
   try {
        const res = await api.put(`/user/approve/${id}`);
        console.log(res.data);
        toast.success("ສຳເລັດການອະນຸມັດ")
        return res.data;
   } catch (error: any) {
         console.error(error);
         toast.error(error || "ການອະນຸມັດລົ້ມເຫຼວ");
   }
}
export const RejectOwner = async(id: string) => {
   try {
        const res = await api.put(`/user/reject/${id}`);
        console.log(res.data);
        toast.success("ສຳເລັດການປະຕິເສດ")
        return res.data;
   } catch (error: any) {
         console.error(error);
         toast.error(error || "ການປະຕິເສດລົ້ມເຫຼວ");
   }
}

export const getAllRejectedOwner = async() => {
  try {
     const res = await api.get("/user/rejected");
     return res.data;
  } catch (error: any) {
      console.error(error);
     toast.error(error || "ການໂຫລດຂໍ້ມູນລົ້ມເຫຼວ") 
  }
}
