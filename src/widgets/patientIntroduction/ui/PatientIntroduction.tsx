"use client";
import Button from "@/shared/ui/Button";
import FormIntroduction from "@/shared/ui/FormIntroduction/FormIntroduction";
import { useAppSelector } from "@/store/hooks";

export default function PatientIntroduction() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  if (!isAuthenticated) {
    console.log("ERROR: not authorized");
    return null;
  }

  return (
    <div className="flex justify-between items-center">
      <FormIntroduction
        message={{
          header: `Good Morning, ${user?.name}`,
          subtitle: "Here's your care at a glance. We're glad you're here.",
        }}
      />
      <Button variant="primary">+ Book appointment</Button>
    </div>
  );
}
