import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session.user.role !== "admin") {
    redirect("/");
  }
  return <div>Admin Page</div>;
}
