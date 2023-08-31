"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const { replace } = useRouter();
  console.log(session?.user);

  const logout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/user/signin",
    });
    replace("/user/signin");
  };

  return (
    <div className="p-4 pt-2">
      Home Page <button onClick={logout}>Logout</button>
    </div>
  );
}
