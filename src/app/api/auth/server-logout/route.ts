import { NextResponse } from "next/server";
import { serverEnv } from "@/constants";
import { cookies } from "next/headers";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  try {
    const cookieStore = cookies().getAll();

    const res = await fetch(`${serverEnv.apiUrl}/api/auth/sign-out`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: cookieStore.map((cookie) => `${cookie.name}=${cookie.value}`).join(";"),
      },
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    cookies().delete("access_token");
    cookies().delete("refresh_token");
    cookies().delete("logged_in");
  } catch (err) {
    console.error("logout error...", err);
  } finally {
    return NextResponse.json({ message: "logged out" });
  }
}