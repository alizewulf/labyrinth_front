"use client";

import { usePathname } from "next/navigation";
import LoginActions from "./LoginActions";
import ReturnAction from "./ReturnAction";
import { useAppSelector } from "@/store/hooks";

export default function AuthActions() {
  const pathName = usePathname();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <>
      {isAuthenticated ? (
        <p>
          {user?.name} {user?.surname}
        </p>
      ) : pathName === "/login" || pathName === "/register" ? (
        <ReturnAction />
      ) : (
        <LoginActions />
      )}
    </>
  );
}
