import HomePage from "@/pages/guestPage";
import PatientPage from "@/pages/patientPage";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return <HomePage />;
  }

  let isAuthenticated = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        cache: "no-store",
      },
    );

    isAuthenticated = response.ok;
  } catch (error) {
    console.error("Failed to verify session:", error);
  }

  if (isAuthenticated) {
    return <PatientPage />;
  }

  return <HomePage />;
}
