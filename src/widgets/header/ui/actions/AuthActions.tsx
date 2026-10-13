"use client";

import { usePathname } from "next/navigation";
import LoginActions from "./LoginActions";
import ReturnAction from "./ReturnAction";

export default function AuthActions() {
  const pathName = usePathname();
  return (
    <>
      {pathName === "/login" || pathName === "/register" ? (
        <ReturnAction />
      ) : (
        <LoginActions />
      )}
    </>
  );
}
