import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import SignInForm from "../components/SignInForm";

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
            src="/images/signin.png"
            width={0}
            height={0}
            alt="Image"
            className="w-[450px]"
            sizes="100vw"
            priority={true}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">User Sign In</h2>
          <p>
            You have to fill up all (<span className="text-red-600">*</span>)
            Required Field!
          </p>
          <SignInForm />
        </div>
      </div>
    </section>
  );
}
