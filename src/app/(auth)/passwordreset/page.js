"use client";
import { useState } from "react";
import { Typography, Card, Input, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { resetpassword } from "./actions";
import { BsExclamationTriangle } from "react-icons/bs";
export default function PasswordReset() {
  const [responseMessage, setResponseMessage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm();

  async function handleReset(data) {
    try {
      const res = await resetpassword(data);
      const { error } = res || {};
      if (error) {
        throw error;
      }
    } catch (e) {
      setResponseMessage(e);
    }
  }

  return (
    <main>
      <Card color="transparent" shadow={false} className="text-text">
        <Typography variant="h1" className="text-3xl	text-center">
          Reset Your Password
        </Typography>
        {responseMessage && (
          <div className="flex flex-col  items-center gap-2 text-error font-bold border-2 rounded-lg	p-2  border-error">
            <BsExclamationTriangle size={35} />
            <h3 className="text-xl text-center">{responseMessage}</h3>
          </div>
        )}
        <form
          onSubmit={handleSubmit((data) => handleReset(data))}
          className="mt-5 flex flex-col gap-6"
        >
          <div>
            <Typography>Password</Typography>
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
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography className="text-error font-bold">
              {errors.password?.message}
            </Typography>
          </div>
          <div>
            <Typography>Confirm Password</Typography>
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
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography className="text-error font-bold">
              {errors.passwordconf?.message}
            </Typography>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            fullWidth
            className="mt-5"
          >
            {isSubmitting ? "Resetting Password" : "Reset Password"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
