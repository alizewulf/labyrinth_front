"use client";

import { usePathname } from "next/navigation";
import LoginActions from "./LoginActions";
import ReturnAction from "./ReturnAction";
import { useAppSelector } from "@/store/hooks";
import LogoutButton from "@/features/logout";

export default function AuthActions() {
  const pathName = usePathname();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <>
      {isAuthenticated ? (
        <div className="flex gap-2">
          <p>
            {user?.name} {user?.surname}
          </p>
          <LogoutButton/>
        </div>
      ) : pathName === "/login" || pathName === "/register" ? (
        <ReturnAction />
      ) : (
        <LoginActions />
      )}
    </>
  );
}
