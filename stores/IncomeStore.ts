import { Income } from "@/types/income";
import {create} from "zustand";
import { getAllIncomes } from "@/services/IncomService";

interface IncomeState {
   getAllIncome:()=> Promise<void>;
   incomes: Income[];
   error: string | null;
   loading: boolean;
}

export const useIncomeStore = create<IncomeState>((set)=>({
         incomes: [],
         error: null,
         loading: false,
         getAllIncome: async() => {
           try {
               set({loading: true});
               const result: Income[] =  await getAllIncomes();
               set({loading: false, incomes: result});
           } catch (e: any) {
                set({loading: false, error: e});  
           }
         } 
}));