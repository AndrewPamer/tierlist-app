"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Typography, Card, Input, Button } from "@material-tailwind/react";

import Link from "next/link";
import { login } from "./actions";
import { BsExclamationTriangle } from "react-icons/bs";
import { createClient } from "@/utils/supabase/client";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const supabase = createClient();
  const [disabled, setDisabled] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [passwordReset, setPasswordReset] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    reset(undefined, { keepDirtyValues: true });
  }, [isSubmitSuccessful]);

  async function handleLogin(data) {
    setDisabled(true);
    try {
      const res = await login(data);
      const { error } = res || {};
      if (error) {
        throw error;
      }
    } catch (e) {
      setResponseMessage(e);
      setDisabled(false);
    }
  }

  async function handleReset({ email }) {
    setDisabled(true);
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/passwordreset`,
      });
      if (error) {
        throw error;
      }
      toast.success(
        "An email was sent. Check your inbox for instructions to reset your password."
      );
    } catch (e) {
      setResponseMessage(e.message);
    } finally {
      setDisabled(false);
    }
  }

  return (
    <main>
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
      <Card color="transparent" shadow={false} className="text-text">
        <Typography variant="small" className="font-bold">
          <Link href="/" className="p-2 inline-block" replace>
            Cancel
          </Link>
        </Typography>
        <Typography variant="h1" className="text-3xl text-center">
          Login
        </Typography>
        {responseMessage && (
          <div className="flex justify-center items-center gap-2 text-error font-bold border-2 rounded-lg	p-2 mb-5 border-error">
            <BsExclamationTriangle size={30} />
            <h3 className="text-xl">{responseMessage}</h3>
          </div>
        )}
        <form
          onSubmit={handleSubmit((data) =>
            !passwordReset ? handleLogin(data) : handleReset(data)
          )}
          className="mt-5 flex flex-col gap-6"
        >
          <div>
            <Typography className="font-bold">Email</Typography>
            <Input
              {...register("email", {
                required: "Email is required",
              })}
              className="!border-text focus:!border-text"
              type="email"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {passwordReset && (
              <Button
                type="button"
                variant="text"
                className="p-1"
                onClick={() => setPasswordReset(!passwordReset)}
              >
                Return To Login
              </Button>
            )}

            <Typography className="text-error font-bold">
              {errors.email?.message}
            </Typography>
          </div>
          {!passwordReset && (
            <div>
              <Typography className="font-bold">Password</Typography>
              <Input
                {...register("password", {
                  required: "Password is required",
                })}
                className="!border-text focus:!border-text"
                type="password"
                autoComplete="current-password"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Button
                type="button"
                variant="text"
                className="p-1"
                onClick={() => setPasswordReset(!passwordReset)}
              >
                Forgot Your Password?
              </Button>

              <Typography className="text-error font-bold">
                {errors.password?.message}
              </Typography>
            </div>
          )}
          <Button
            type="submit"
            disabled={disabled || isSubmitSuccessful}
            fullWidth
            className="mt-5"
            loading={
              passwordReset
                ? disabled
                  ? true
                  : false
                : disabled
                ? true
                : false
            }
          >
            {passwordReset
              ? disabled
                ? "Sending..."
                : "Send Reset Email"
              : disabled
              ? "Logging in..."
              : "Log In"}
          </Button>
        </form>
      </Card>
    </main>
  );
}

/*
      <div className="flex flex-col items-stretch">
        <p className="text-sm">
          <Link href="/" className="p-2 inline-block" replace>
            Cancel
          </Link>
        </p>
        <h1 className="text-3xl font-bold self-center  mb-12">Login</h1>
        {responseMessage && (
          <div className="flex justify-center items-center gap-2 text-error font-bold border-2 rounded-lg	p-2 mb-5 border-error">
            <BsExclamationTriangle size={30} />
            <h3 className="text-xl">{responseMessage}</h3>
          </div>
        )}
        <form
          onSubmit={handleSubmit((data) =>
            !passwordReset ? handleLogin(data) : handleReset(data)
          )}
          className="flex flex-col gap-7"
        >
          <label className="flex flex-col gap-1">
            <span className="text-sm font-bold">Email</span>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"
            />
            <p className="text-error font-bold">{errors.email?.message}</p>
            {passwordReset && (
              <small className="text-sm hover:underline">
                <button
                  onClick={() => setPasswordReset(!passwordReset)}
                  type="button"
                  className=" justify-self-start"
                >
                  Return to Login
                </button>
              </small>
            )}
          </label>
          {!passwordReset && (
            <label className="flex flex-col gap-1">
              <span className="text-sm font-bold">Password</span>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                autoComplete="current-password"
                className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"
              />
              <p className="text-error font-bold">{errors.password?.message}</p>
              <small className="text-sm hover:underline">
                <button
                  onClick={() => setPasswordReset(!passwordReset)}
                  type="button"
                  className=" justify-self-start"
                >
                  Forgot your password?
                </button>
              </small>
            </label>
          )}
          <button
            className="font-bold bg-button-bg text-button-text text-1xl p-2.5 rounded-xl hover:bg-button-hover mt-10"
            disabled={disabled}
          >
            { {passwordReset
              ? disabled
                ? "Sending..."
                : "Send Reset Email"
              : disabled
              ? "Logging in..."
              : "Log In"} }
              </button>
              </form>
            </div> */
