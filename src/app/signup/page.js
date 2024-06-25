"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { signup } from "./actions";

import { BsExclamationTriangle } from "react-icons/bs";

export default function SignUp() {
  const [disabled, setDisabled] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  async function handleSignup(data) {
    setDisabled(true);
    try {
      await signup(data);
    } catch (e) {
      setResponseMessage(e.message);
    } finally {
      setDisabled(false);
    }
  }

  // async function handleSignup(data) {
  //   setDisabled(true);
  //   try {
  //     const res = await fetch("/signup/api", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     if (res.status === 200) {
  //       router.replace("/home");
  //     } else {
  //       //Error
  //       const errorMessage = await res.text();
  //       setResponseMessage(errorMessage);
  //     }
  //   } catch (e) {
  //     setResponseMessage("An unexpected error occurred");
  //   } finally {
  //     setDisabled(false);
  //   }
  // }

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
      {responseMessage && (
        <div className="flex justify-center items-center gap-2 text-error font-bold border-2 rounded-lg	p-2 mb-5 border-error">
          <BsExclamationTriangle size={30} />
          <h3 className="text-xl">{responseMessage}</h3>
        </div>
      )}
      <form
        onSubmit={handleSubmit((data) => handleSignup(data))}
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
