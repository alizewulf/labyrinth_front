"use client";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { clearUser, setLoading, setUser } from "@/store/slices/authSlice";
import { getCurrentUser } from "@/shared/api/auth";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getCurrentUser();
        dispatch(setUser(user));
      } catch {
        dispatch(clearUser());
      } finally {
        dispatch(setLoading(false));
      }
    }
    checkAuth();
  }, [dispatch]);
  return children;
}

export default AuthProvider;
