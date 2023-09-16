import { quizCraftBackend } from "@/utils/api/getAxios";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

const MAX_AGE = 60 * 2; // 2 Minutes;

export async function POST(request) {
  const values = await request.json();

  const { data } = await quizCraftBackend.post("/api/v1/user/register", values);

  if (data?.status) {
    const serialized = serialize("_temp", data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });
    return NextResponse.json(
      { status: true },
      {
        status: 200,
        headers: { "Set-Cookie": serialized },
      },
    );
  } else {
    return NextResponse.json(
      { status: false },
      {
        status: 200,
      },
    );
  }
}
