"use client";
import { useOwnerStore } from "@/stores/OwnerStore";
import { useEffect, useState, useMemo } from "react";

export const useOwner = () => {
   const store = useOwnerStore();
   const [searchQuery, setSearchQuery] = useState("");
   const [startDate, setStartDate] = useState(""); // ວັນທີເລີ່ມຕົ້ນ
   const [endDate, setEndDate] = useState("");     // ວັນທີສິ້ນສຸດ

   useEffect(() => {
        store.getAllOwnerWaitingApprove();
        store.getAllOwnerThatApproved();
        store.getAllRejectedOwner();
   }, []);

   const filteredOwners = useMemo(() => {
        return store.owners.filter((owner) => {
            const fullNameLao = `${owner.laoName} ${owner.laoLastname}`.toLowerCase();
            const fullNameEng = `${owner.engName} ${owner.engLastname}`.toLowerCase();
            const query = searchQuery.toLowerCase();
            
            const matchesSearch = 
                fullNameLao.includes(query) ||
                fullNameEng.includes(query) ||
                owner.tel.includes(query) ||
                owner.email.toLowerCase().includes(query);

            let matchesDate = true;
            if (startDate || endDate) {
                const ownerDate = new Date(owner.createdAt).setHours(0, 0, 0, 0);
                
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
        });
   }, [store.owners, searchQuery, startDate, endDate]);
   const filteredApprovedOwners = useMemo(() => {
        return store.approvedOwners.filter((owner) => {
            const fullNameLao = `${owner.laoName} ${owner.laoLastname}`.toLowerCase();
            const fullNameEng = `${owner.engName} ${owner.engLastname}`.toLowerCase();
            const query = searchQuery.toLowerCase();
            
            const matchesSearch = 
                fullNameLao.includes(query) ||
                fullNameEng.includes(query) ||
                owner.tel.includes(query) ||
                owner.email.toLowerCase().includes(query);

            let matchesDate = true;
            if (startDate || endDate) {
                const ownerDate = new Date(owner.createdAt).setHours(0, 0, 0, 0);
                
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
        });
   }, [store.owners, searchQuery, startDate, endDate]);

   return {
        error: store.error,
        loading: store.loading,
        owners: filteredOwners, 
        allOwners: store.owners,
        approvedOwners: filteredApprovedOwners,
        searchQuery,
        setSearchQuery,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        ApproveOwner: store.ApproveOwner,
        RejectOwner: store.RejectOwner,
        getAllRejectedOwner: store.getAllRejectedOwner,
        rejectedOwners: store.rejectedOwners
   }
}