"use client";

import { API } from "@/shared/api/axios";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { clearUser } from "@/store/slices/authSlice";

export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");

      dispatch(clearUser());

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { handleLogout };
}
