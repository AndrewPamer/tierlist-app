"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "./actions";
import { BsExclamationTriangle } from "react-icons/bs";

export default function Login() {
  const [disabled, setDisabled] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
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
      await login(data);
    } catch (e) {
      setResponseMessage(e.message);
    } finally {
      setDisabled(false);
    }
  }

  return (
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
        onSubmit={handleSubmit((data) => handleLogin(data))}
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
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-bold">Password</span>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"
          />
          <p className="text-error font-bold">{errors.password?.message}</p>
        </label>
        <button
          className="font-bold bg-button-bg text-button-text text-1xl p-2.5 rounded-xl hover:bg-button-hover mt-10"
          // disabled={isSubmitting || isSubmitted}
          disabled={disabled}
        >
          {/* {isSubmitting || isSubmitted ? "Logging in..." : "Log in"} */}
          {disabled ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
