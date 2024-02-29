import AdminLoginForm from "../components/AdminLoginForm";

export default function SignInForm() {
  return (
    <section className='flex min-h-screen items-center justify-center bg-[#061626] text-white p-5 md:p-0'>
      <div className='p-5 md:p-10 rounded-md w-[600px] bg-[#1C2632] shadow-xl'>
        <div className='p-2'>
          <img src='/images/logo.png' className='m-auto w-56' alt='logo' />
          <h2 className='mb-5 text-center text-lg font-semibold'>Admin Login</h2>
          <AdminLoginForm />
        </div>
      </div>
    </section>
  );
}
