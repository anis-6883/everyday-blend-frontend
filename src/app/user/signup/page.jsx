import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import SignUpForm from "../components/SignUpForm";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <section className="grid min-h-screen items-center justify-items-center bg-[#e8f7ff] p-5">
      <div className="card w-10/12 bg-base-100 shadow-xl lg:card-side">
        <figure className="w-1/2">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="h-2/3 w-2/3"
            src="/images/signup.png"
            alt="Album"
            priority={true}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">User Sign Up</h2>
          <p>
            You have to fill up all (<span className="text-red-600">*</span>)
            Required Field!
          </p>
          <SignUpForm />
        </div>
      </div>
    </section>
  );
}
