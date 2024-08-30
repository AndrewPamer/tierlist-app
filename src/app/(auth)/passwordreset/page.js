"use client";
import { useState } from "react";
import {
  Typography,
  Card,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { resetpassword } from "./actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
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
          <Alert
            className="bg-transparent border border-red-500 text-red-500 mt-5"
            icon={<FontAwesomeIcon size="lg" icon={faCircleExclamation} />}
          >
            <Typography className="font-bold">{responseMessage}</Typography>
          </Alert>
        )}
        <form
          onSubmit={handleSubmit((data) => handleReset(data))}
          className="mt-5 flex flex-col gap-6"
        >
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
              type="password"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
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
              type="password"
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
