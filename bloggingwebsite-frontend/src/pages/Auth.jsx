import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useMatch, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks";
const Auth = () => {
  const isRegistered = useMatch("/register");
  const [credentials, setCredentials] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();
  //just like usestate
  const [passwordError, setPasswordError] = useState("");

  const initialLoginDetails = { email: "", password: "" };

  async function submit(values, actions) {
    console.log(values);
    const { password } = values;

    try {
      const path = isRegistered ? "register" : "login";
      if (path == "register" && password.length < 8) {
        alert("Password should be at least 8 characters");
        setPasswordError("Password should be at least 8 characters");
        return;
      }
      const responce = await axios.post(
        `http://localhost:3001/api/users/${path}`,
        values
      );
      console.log(responce);
      const { data } = responce;
      login(data);
      setCredentials(true);
      navigate("/");
    } catch (err) {
      const { status, data } = err.responce;
      if (status === 422) {
        actions.setErrors(data.errors);
        setCredentials(false);
      }
    }
  }
  return (
    <div>
      <div className="mx-auto pt-14 w-full mt-14">
        <div className="flex justify-center">
          <div>
            <h1 className="text-2xl font-bold text-center">
              {" "}
              Sign {isRegistered != null ? "Up" : "in"}
            </h1>
            <Link to={isRegistered != null ? "/login" : "/register"}>
              <p className="text-md text-center font-medium text-green-500">
                {isRegistered != null ? "Already have an" : "Not created"}{" "}
                account
              </p>
            </Link>
            <h2 className="font-bold text-center">
              {credentials ? "" : "Incorrect Credentials"}
            </h2>
            <h2 className="font-bold text-center">
              {passwordError == "" ? "" : passwordError}
            </h2>

            <Formik
              initialValues={
                isRegistered
                  ? { ...initialLoginDetails, name: "" }
                  : initialLoginDetails
              }
              onSubmit={submit}
            >
              {() => (
                <>
                  {/* <FormErrors/> */}
                  <Form>
                    <fieldset className="flex flex-col">
                      {isRegistered != null && (
                        <Field
                          type="text"
                          name="name"
                          placeholder="Your name"
                          className="border border-zinc-700 w-96 m-2 p-4 rounded-full"
                        />
                      )}

                      <Field
                        type="email"
                        name="email"
                        placeholder="Your email"
                        className="border border-zinc-700 w-96 m-3 p-4 rounded-full"
                      />
                      <Field
                        type="password"
                        name="password"
                        placeholder="Your password"
                        className="border border-zinc-700 w-96 m-3 p-4 rounded-full"
                      />
                      <button
                        type="submit"
                        className="rounded-lg ml-auto bg-green-500 p-4 mt-3 mr-3"
                      >
                        Sign {isRegistered != null ? "up" : "in"}
                      </button>
                    </fieldset>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
