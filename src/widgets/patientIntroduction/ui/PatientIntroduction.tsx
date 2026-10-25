"use client";
import Link from "next/link";
import FormIntroduction from "@/shared/ui/FormIntroduction/FormIntroduction";
import { useAppSelector } from "@/store/hooks";

export default function PatientIntroduction() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <FormIntroduction
        message={{
          header: `Good Morning, ${user?.name}`,
          subtitle: "Here's your care at a glance. We're glad you're here.",
        }}
      />
      <Link
        href="/book-appointment"
        className="w-full sm:w-auto text-center rounded-lg bg-primary hover:bg-[#1d4ed8] px-5 py-2.5 text-sm font-semibold text-white transition-colors shadow-xs"
      >
        + Book appointment
      </Link>
    </div>
  );
}
