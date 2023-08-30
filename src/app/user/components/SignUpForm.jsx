"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";

export default function SignUpForm() {
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

  const onSubmit = (values) => console.log(values);

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
                  Name<span className="mr-2 text-red-600">*</span>
                  <ErrorMessage
                    name="name"
                    component={({ children }) => (
                      <span className="text-sm text-red-600">({children})</span>
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
                    <>
                      <input
                        type="password"
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
            <div className="mt-8">
              <button type="submit" className="btn btn-secondary w-full">
                Sign Up
              </button>
              <div className="divider">OR</div>
              <button type="button" className="btn-light btn w-full">
                <FcGoogle className="text-xl" /> Sign Up With Google
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
