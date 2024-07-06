/*
{
    elements: [
        {
            title: 'name'
            type: 'email'
            placeholder: null
            requied: true | false
            },
            {
                ...
            }, 
    ],
    submitButtonText: 'Login'
    onSubmit: () => ...
}
                
        */
import { Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

import { useId } from "react";

export default function Form({ data, children }) {
  const id = useId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm();
  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit((d) => data.onSubmit(d))}
        className="flex flex-col gap-7"
        id={id}
      >
        {data?.elements?.map((el, i) => {
          return (
            <label className={"flex flex-col gap-1"} key={i}>
              {el?.title && (
                <span className="text-sm font-bold">{el.title}</span>
              )}
              {el.type === "radio" ? (
                <div className="ml-5">
                  <input
                    {...register(
                      el?.registerTitle ? el.registerTitle : el.title,
                      {
                        required: el?.required
                          ? `${el.title} is required`
                          : false,
                      }
                    )}
                    type={el.type}
                    value={el?.value}
                  />
                  <span>{el.value}</span>
                </div>
              ) : (
                <Input
                  {...register(
                    el?.registerTitle ? el.registerTitle : el.title,
                    {
                      required: el?.required
                        ? `${el.title} is required`
                        : false,
                    }
                  )}
                  type={el.type}
                  value={el?.value}
                  className=" !border-text focus:!border-text"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              )}
              <p className="text-error font-bold">
                {errors[el.title]?.message}
              </p>
            </label>
          );
        })}
        {children}
      </form>
      <button
        form={id}
        type="submit"
        className="font-bold bg-button-bg text-button-text text-1xl p-2.5 rounded-xl hover:bg-button-hover mt-10"
      >
        {data.submitButtonText}
      </button>
    </div>
  );
}
