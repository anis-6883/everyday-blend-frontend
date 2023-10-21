"use client";

import { quizCraftBackend } from "@/utils/api/getAxios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const { replace } = useRouter();
  console.log(session?.user);

  const logout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/user/signin",
    });
    replace("/user/signin");
  };

  useEffect(() => {
    async function getProfile() {
      const { data } = await quizCraftBackend.post(
        "/api/user/profile",
        { email: session.user?.email },
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        },
      );
      setUsername(data?.user?.name);
    }

    if (session) {
      getProfile();
    }
  });

  return (
    <div className="p-4 pt-2">
      Home Page <button onClick={logout}>Logout</button>
      {session && <p>{session.user.name}</p>}
      {username && <p>{username}</p>}
    </div>
  );
}
