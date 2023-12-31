"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsEye, BsEyeSlash, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner6 } from "react-icons/im";
import * as Yup from "yup";

export default function SignInForm() {
  const { replace } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [signInFormSubmitted, setSignInFormSubmitted] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email!").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = (values) => {
    values.signup = false;
    setSignInFormSubmitted(true);

    signIn("credentials", {
      ...values,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        setSignInFormSubmitted(false);
        toast.error(callback?.error);
      }
      if (callback?.ok && !callback?.error) {
        toast.success("Sign In Successfully!");
        replace("/");
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Email<span className="mr-2 text-red-600">*</span>
                  <ErrorMessage
                    name="email"
                    component={({ children }) => (
                      <span className="text-sm text-red-600">({children})</span>
                    )}
                  />
                </span>
              </label>
              <Field name="email">
                {({ field, meta }) => {
                  return (
                    <>
                      <input
                        type="email"
                        className={`${
                          meta.touched && meta.error
                            ? "input-error"
                            : "input-neutral"
                        } input-neutral input input-bordered w-full`}
                        {...field}
                      />
                    </>
                  );
                }}
              </Field>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Password<span className="mr-2 text-red-600">*</span>
                  <ErrorMessage
                    name="password"
                    component={({ children }) => (
                      <span className="text-sm text-red-600">({children})</span>
                    )}
                  />
                </span>
              </label>
              <Field name="password">
                {({ field, meta }) => {
                  return (
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`${
                          meta.touched && meta.error
                            ? "input-error"
                            : "input-neutral"
                        } input-neutral input input-bordered w-full`}
                        {...field}
                      />
                      {showPassword ? (
                        <BsEye
                          onClick={() => setShowPassword(false)}
                          className="absolute right-3 top-3 cursor-pointer text-2xl"
                        />
                      ) : (
                        <BsEyeSlash
                          onClick={() => setShowPassword(true)}
                          className="absolute right-3 top-3 cursor-pointer text-2xl"
                        />
                      )}
                    </div>
                  );
                }}
              </Field>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="btn btn-primary w-full disabled:bg-[#025CE3] disabled:text-[#d8eeff]"
                disabled={signInFormSubmitted}
              >
                Sign In
                {signInFormSubmitted && (
                  <ImSpinner6 className="animate-spin text-xl" />
                )}
              </button>
              <p className="mt-3 font-medium">
                Don{"'"}t have an account?{" "}
                <Link
                  replace={true}
                  href="/user/signup"
                  className="text-primary"
                >
                  Sign Up Here
                </Link>
              </p>
              <div className="divider">OR</div>
              <button
                type="button"
                disabled={signInFormSubmitted}
                className="btn-light btn w-full"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <FcGoogle className="text-xl" /> Sign In With Google
              </button>
              <button
                type="button"
                className="btn-light disabled:text-dark btn mt-2 w-full disabled:bg-[#DBDBDB] disabled:text-slate-700"
                disabled={signInFormSubmitted}
                onClick={() => signIn("github", { callbackUrl: "/" })}
              >
                <BsGithub className="text-xl" /> Sign Up With Github
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
