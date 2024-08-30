"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  Card,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";

import Link from "next/link";

import { signup } from "./actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
  const [disabled, setDisabled] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    getValues,
    watch,
  } = useForm();

  async function handleSignup(data) {
    setDisabled(true);
    try {
      const res = await signup(data);
      const { error } = res || {};
      if (error) {
        throw error;
      }
      setEmailSent(true);
    } catch (e) {
      setResponseMessage(e);
      setDisabled(false);
    }
  }

  return (
    <main>
      <Card color="transparent" shadow={false} className="text-text">
        <Typography variant="small" className="font-bold">
          <Link href="/" className="p-2 inline-block" replace>
            Cancel
          </Link>
        </Typography>
        <Typography variant="h1" className="text-3xl text-center">
          Create an Account
        </Typography>
        {emailSent && (
          <Alert
            className="bg-alt-bg-darker border mt-5"
            icon={<FontAwesomeIcon size="lg" icon={faCircleExclamation} />}
          >
            <span>
              An email to confirm your account has been sent to{" "}
              {getValues("email")}
            </span>
          </Alert>
        )}
        {responseMessage && (
          <Alert
            className="bg-transparent border border-red-500 text-red-500 mt-5"
            icon={<FontAwesomeIcon size="lg" icon={faCircleExclamation} />}
          >
            <Typography className="font-bold">{responseMessage}</Typography>
          </Alert>
        )}
        <form
          onSubmit={handleSubmit((data) => handleSignup(data))}
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
              disabled={emailSent}
            />

            <Typography className="text-error font-bold">
              {errors.email?.message}
            </Typography>
          </div>
          <div>
            <Typography className="font-bold">Password</Typography>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum length is 8" },
                validate: (val) => {
                  if (!/(?=.*\d)/.test(val)) {
                    return "At least one digit is required";
                  }
                  if (!/(?=.*[a-z])/.test(val)) {
                    return "At least one lowercase character is required";
                  }
                  if (!/(?=.*[A-Z])/.test(val)) {
                    return "At least one uppercase character is required";
                  }
                  if (
                    !/(?=.*[!@#$%^&*()_\-+=[\]{};:'"\\|,.<>/?`~])/.test(val)
                  ) {
                    return "At least one special character is required";
                  }
                },
              })}
              className="!border-text focus:!border-text"
              autoComplete="new-password"
              type="password"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              disabled={emailSent}
            />
            <Typography className="text-error font-bold">
              {errors.password?.message}
            </Typography>
            <Alert
              className="bg-input-bg mt-2"
              icon={<FontAwesomeIcon icon={faCircleInfo} size="lg" />}
            >
              <Typography className="font-medium">
                Password Requirements:
              </Typography>
              <ul className=" mt-1 ml-1 list-disc list-inside font-light ">
                <li>At least 8 characters long.</li>
                <li>At least one digit (0-9).</li>
                <li>At least one lowercase character.</li>
                <li>At least one uppercase character.</li>
                <li>At least one special character.</li>
              </ul>
            </Alert>
          </div>
          <div>
            <Typography className="font-bold">Confirm Password</Typography>
            <Input
              {...register("passwordconf", {
                required: "Password Confirmation is required",
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Passwords do not match";
                  }
                },
              })}
              className="!border-text focus:!border-text"
              autoComplete="new-password"
              type="password"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              disabled={emailSent}
            />
            <Typography className="text-error font-bold">
              {errors.passwordconf?.message}
            </Typography>
          </div>
          <div>
            <Typography className="font-bold">Username</Typography>
            <Input
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "Minimum length is 3" },
                maxLength: { value: 15, message: "Maximum length is 15" },
              })}
              className="!border-text focus:!border-text"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              disabled={emailSent}
            />
            <Typography className="text-error font-bold">
              {errors.username?.message}
            </Typography>
            <Alert
              className="bg-input-bg mt-2"
              icon={<FontAwesomeIcon icon={faCircleInfo} size="lg" />}
            >
              <Typography className="font-medium">
                Username Requirements:
              </Typography>
              <ul className=" mt-1 ml-1 list-disc list-inside font-light ">
                <li>At least 3 characters long.</li>
                <li>At most 15 characters long.</li>
              </ul>
            </Alert>
          </div>
          <Button
            type="submit"
            disabled={disabled || emailSent}
            loading={isSubmitting}
            fullWidth
            className="mt-5"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
