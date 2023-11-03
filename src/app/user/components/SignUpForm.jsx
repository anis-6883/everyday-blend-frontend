"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner6 } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import * as Yup from "yup";

export default function SignUpForm() {
  const { replace } = useRouter();
  const [showEmail, setShowEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signUpFormSubmitted, setSignUpFormSubmitted] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const [otpValidityMsg, setOtpValidityMsg] = useState("");

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid Email!").required("Required"),
    password: Yup.string()
      .min(6, "Password at least 6 characters long!")
      .required("Required"),
  });

  // Form Handler
  const onSubmit = async (values) => {
    setSignUpFormSubmitted(true);
    setOtpValidityMsg("");
    setShowEmail(values.email);
    values.provider = "email";

    const data = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });

    setSignUpFormSubmitted(false);
    if (data.status === false) {
      toast.error(data?.message);
      setSignUpFormSubmitted(false);
    } else {
      toast.success("Otp send successfully!");
      setSignUpFormSubmitted(false);
      window.otpModal.showModal();
    }
    setSignUpFormSubmitted(false);
  };

  // Otp Handler
  const otpSubmitHandler = async (e) => {
    e.preventDefault();
    setOtpSubmitted(true);

    if (!otp) {
      setOtpValidityMsg("Otp is required!");
      setOtpSubmitted(false);
    } else {
      signIn("credentials", {
        otp,
        signup: true,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          setOtpValidityMsg(callback?.error);
          setOtpSubmitted(false);
          toast.error(callback?.error);
        }
        if (callback?.ok && !callback?.error) {
          setOtpValidityMsg("");
          toast.success("Sign Up Successfully!");
          replace("/");
        }
      });
    }
  };

  return (
    <>
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
                    Name<span className="mr-2 text-red-600">*</span>
                    <ErrorMessage
                      name="name"
                      component={({ children }) => (
                        <span className="text-sm text-red-600">
                          ({children})
                        </span>
                      )}
                    />
                  </span>
                </label>

                <Field name="name">
                  {({ field, meta }) => {
                    return (
                      <>
                        <input
                          type="text"
                          className={`${
                            meta.touched && meta.error
                              ? "input-error"
                              : "input-neutral"
                          } input input-bordered w-full`}
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
                    Email<span className="mr-2 text-red-600">*</span>
                    <ErrorMessage
                      name="email"
                      component={({ children }) => (
                        <span className="text-sm text-red-600">
                          ({children})
                        </span>
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
                          } input input-bordered w-full`}
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
                        <span className="text-sm text-red-600">
                          ({children})
                        </span>
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
                          } input input-bordered w-full`}
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
                  disabled={signUpFormSubmitted}
                >
                  Sign Up
                  {signUpFormSubmitted && (
                    <ImSpinner6 className="animate-spin" />
                  )}
                </button>
                <p className="mt-3 font-medium">
                  Don{"'"}t have an account?
                  <Link
                    replace={true}
                    href="/user/signin"
                    className="ml-2 text-primary"
                  >
                    Sign In Here
                  </Link>
                </p>
                <div className="divider">OR</div>
                <button
                  type="button"
                  className="btn-light disabled:text-dark btn w-full disabled:bg-[#DBDBDB] disabled:text-slate-700"
                  disabled={signUpFormSubmitted}
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  <FcGoogle className="text-xl" /> Sign Up With Google
                </button>
                <button
                  type="button"
                  className="btn-light disabled:text-dark btn mt-2 w-full disabled:bg-[#DBDBDB] disabled:text-slate-700"
                  disabled={signUpFormSubmitted}
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                >
                  <BsGithub className="text-xl" /> Sign Up With Github
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      <dialog id="otpModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              <RxCross2 className="text-xl" />
            </button>
          </form>
          <h3 className="text-lg font-bold">OTP Verification</h3>
          <p className="py-4">
            Enter the OTP within 2 minutes, which you received at{" "}
            <b>{showEmail}</b>
          </p>
          <form onSubmit={otpSubmitHandler}>
            <div className="flex flex-col">
              <input
                type="number"
                placeholder="Enter OTP"
                className={`input input-bordered w-full ${
                  otpValidityMsg && "input-error"
                }`}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {otpValidityMsg && (
                <span className="ml-2 mt-1 text-sm text-red-600">
                  {otpValidityMsg}
                </span>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary mt-4 disabled:bg-[#1149bc] disabled:text-[#d8eeff]"
                disabled={otpSubmitted}
              >
                Submit {otpSubmitted && <ImSpinner6 className="animate-spin" />}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
