"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rawRole = localStorage.getItem("role");

    if (!token) {
      router.replace("/");
      return;
    }
    let userRole = rawRole;
    if (rawRole) {
      try {
        userRole = JSON.parse(rawRole);
      } catch (e) {
        userRole = rawRole;
      }
    }

    if (allowedRoles && allowedRoles.length > 0) {
      if (!userRole || !allowedRoles.includes(userRole)) {
        router.replace("/unauthorized");
        return;
      }
    }

    setIsAuthorized(true);
  }, [router, allowedRoles]);

  if (!isAuthorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-[#FF5E1E] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 font-medium">ກຳລັງກວດສອບສິດທິ...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}