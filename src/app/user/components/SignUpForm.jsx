"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import * as Yup from "yup";

export default function SignUpForm() {
  const { replace } = useRouter();
  const [showEmail, setShowEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSubmitted, setOtpSubmitted] = useState(false);

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

  const onSubmit = async (values) => {
    setShowEmail(values.email);
    values.signup = true;
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

    console.log(data);

    if (data.status === false) {
      toast.error("This email already exist!");
    } else {
      toast.success("Otp send successfully!");
      window.otpModal.showModal();
    }

    // signIn("credentials", {
    //   ...values,
    //   redirect: false,
    // }).then((callback) => {
    //   if (callback?.error) {
    //     toast.error(callback?.error);
    //   }
    //   if (callback?.ok && !callback?.error) {
    //     toast.success("Sign Up Successfully!");
    //     replace("/");
    //   }
    // });
  };

  const otpSubmitHandler = async () => {
    setOtpSubmitted(true);
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
                      <>
                        <input
                          type="password"
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
              <div className="mt-8">
                <button type="submit" className="btn btn-secondary w-full">
                  Sign Up
                </button>
                <p className="mt-3 font-medium">
                  Don{"'"}t have an account?
                  <Link href="/user/signin" className="ml-2 text-secondary">
                    Sign In Here
                  </Link>
                </p>
                <div className="divider">OR</div>
                <button type="button" className="btn-light btn w-full">
                  <FcGoogle className="text-xl" /> Sign Up With Google
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
            Enter the OTP you received at <b>{showEmail}</b>
          </p>
          <div className="flex flex-col">
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered input-error w-full"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <span className="ml-2 mt-1 text-sm text-red-600">
              Otp doesn{"'"}t match or expired!
            </span>
          </div>
          <div className="flex justify-end">
            <button className="btn btn-secondary" onClick={otpSubmitHandler}>
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
