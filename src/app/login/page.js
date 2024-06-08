"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Link from "next/link";

import { login } from "./actions";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    //If we get an error back we need to check
    //Otherwise we will just go to home page.
    const error = await login(data);
    console.log(error);
  }

  return (
    <div className="flex flex-col items-stretch">
      <p className="text-sm">
        <Link href="/" className="p-2 inline-block" replace>
          Cancel
        </Link>
      </p>
      <h1 className="text-3xl font-bold self-center  mb-12">Login</h1>
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
        <button className="font-bold bg-button-bg text-button-text text-1xl p-2.5 rounded-xl hover:bg-button-hover mt-10">
          Login
        </button>
      </form>
    </div>
  );
}
