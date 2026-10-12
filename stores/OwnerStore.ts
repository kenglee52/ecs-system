import { create } from "zustand";
import { getAllOwnerThatApproved, getAllOwnerWaitingApprove , ApproveOwner, RejectOwner, getAllRejectedOwner} from "@/services/OwnerService";
import { Owner } from "@/types/owner";

interface OwnerState {
         getAllOwnerWaitingApprove: () => Promise<void>;
         getAllOwnerThatApproved: () => Promise<void>;
         ApproveOwner: (id: string) => Promise<void>;
         RejectOwner: (id: string) => Promise<void>;
         getAllRejectedOwner: () => Promise<void>;
         owners: Owner[];
         approvedOwners: Owner[];
         rejectedOwners: Owner[];
         loading: boolean;
         error: string | null;
}

export const useOwnerStore = create<OwnerState>((set) => ({
         owners: [],
         loading: false,
         error: null,
         approvedOwners: [],
         rejectedOwners: [],
         getAllOwnerWaitingApprove: async () => {
                  try {
                           set({ loading: true });
                           const result: Owner[] = await getAllOwnerWaitingApprove();
                           set({ loading: false, owners: result });
                  } catch (e: any) {
                           set({ error: e, loading: false })
                  }
         },
         getAllOwnerThatApproved: async () => {
                  try {
                           set({ loading: true });
                           const result: Owner[] = await getAllOwnerThatApproved();
                           set({ loading: false, approvedOwners: result });
                  } catch (e: any) {
                           set({loading: false, error: e});
                  }
         },
         ApproveOwner: async(id: string) => {
                  try {
                       const result: Owner = await ApproveOwner(id);
                       set((state)=>({
                           owners: state.owners.filter((item)=> item._id?.toString() !== id),
                           approvedOwners: [...state.approvedOwners, result]
                       }))    
                  } catch (e: any) {
                       set({error: e})    
                  }
         },
         RejectOwner: async(id: string) => {
                  try {
                      const result: Owner = await RejectOwner(id);     
                      set((state) => ({
                           owners: state.owners.filter((item) => item._id?.toString() !== id),
                           rejectedOwners: [...state.rejectedOwners, result]
                      }));
                  } catch (e: any) {
                     set({error: e}) 
                  }
         },
         getAllRejectedOwner: async() => {
                  try {
                      set({loading: true});
                      const result: Owner[] = await getAllRejectedOwner();
                      set({
                           loading: false,
                           rejectedOwners: result
                      })
                  } catch (e:any) {
                         set({loading: false, error: e});  
                  }
         }
}))