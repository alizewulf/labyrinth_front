import HomePage from "@/pages/HomePage";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    console.log("No access Token. rendering guest home");
    return <HomePage />;
  }
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
    const user = await response.json();
    console.log('authed:',user);
    return <HomePage />;
  } catch (error){
    console.log('failed to auth:', error)
    return <HomePage/>
}
