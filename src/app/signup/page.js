"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { signup } from "./actions";

export default function SignUp() {
  const [disabled, setDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  return (
    <div className="flex flex-col items-stretch">
      <p className="text-sm">
        <Link href="/" className="p-2 inline-block" replace>
          Cancel
        </Link>
      </p>
      <h1 className="text-3xl font-bold self-center  mb-12">
        Create an Account
      </h1>
      <form
        onSubmit={handleSubmit((data) => signup(data))}
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
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum length is 8" },
              pattern: {
                value: /.*[A-Z].*/,
                message: "A capital letter is required",
              },
              pattern: {
                value: /.*[0-9].*/,
                message: "A number is required",
              },
            })}
            type="password"
            className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"
          />
          <p className="text-error font-bold">{errors.password?.message}</p>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-bold">Confim Password</span>
          <input
            {...register("passwordConf", {
              required: "Password confirmation is required",
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Passwords do not match";
                }
              },
            })}
            type="password"
            className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"
          />
          <p className="text-error font-bold">{errors.passwordConf?.message}</p>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-bold">Username</span>
          <input
            {...register("username", {
              required: "Username is required",
            })}
            type="text"
            className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"
          />
          <p className="text-error font-bold">{errors.username?.message}</p>
        </label>
        <button
          className="font-bold bg-button-bg text-button-text text-1xl p-2.5 rounded-xl hover:bg-button-hover mt-10"
          disabled={disabled}
        >
          {disabled ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
