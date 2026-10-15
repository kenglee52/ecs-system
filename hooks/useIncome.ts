"use client";
import { useState, useMemo, useEffect } from "react";
import { useIncomeStore } from "@/stores/IncomeStore";
export const useIncome = () => {
         const store = useIncomeStore();
         const [searchItem, setSearchItem] = useState("");
         const [startDate, setStartDate] = useState("");
         const [endDate, setEndDate] = useState("");
         useEffect(() => {
                  store.getAllIncome();
         }, []);
         const filterIncome = useMemo(() => {
                  return store.incomes.filter((item) => {
                           const query = searchItem.toLowerCase();
                           const matchesSearch = item.payBy.laoName.toLowerCase().includes(query) ||
                                    item.payBy.laoLastname?.toLowerCase().includes(query) ||
                                    item.payBy.tel.toLowerCase().includes(query) ||
                                    item.payBy.email.toLowerCase().includes(query)
                           let matchesDate = true;
                           if (startDate || endDate) {
                                    const ownerDate = new Date(item.createdAt).setHours(0, 0, 0, 0);

                                    if (startDate) {
                                             const start = new Date(startDate).setHours(0, 0, 0, 0);
                                             if (ownerDate < start) matchesDate = false;
                                    }
                                    if (endDate) {
                                             const end = new Date(endDate).setHours(23, 59, 59, 999);
                                             if (ownerDate > end) matchesDate = false;
                                    }
                           }

                           return matchesSearch && matchesDate;
                  })

         }, [store.incomes, searchItem, startDate, endDate]);

         return {
                  incomes: filterIncome,
                  error: store.error,
                  loading: store.loading,
                  searchItem,
                  setSearchItem,
                  startDate,
                  setStartDate,
                  endDate,
                  setEndDate,
         }
}