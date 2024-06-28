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
import { useForm } from "react-hook-form";
export default function Form({ data }) {
  console.log(data);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm();
  return (
    <form
      onSubmit={handleSubmit((d) => data.onSubmit(d))}
      className="flex flex-col gap-7"
    >
      {data?.elements?.map((el, i) => {
        return (
          <label className="flex flex-col gap-1" key={i}>
            {el?.title && <span className="text-sm font-bold">{el.title}</span>}
            <input
              {...register(el.title, {
                required: el?.required ? `${el.title} is required` : false,
              })}
              type={el.type}
              className="bg-input-bg rounded-xl border-2 border-text p-1.5 outline-none"
            />
            <p className="text-error font-bold">{errors[el.title]?.message}</p>
          </label>
        );
      })}
      <button className="font-bold bg-button-bg text-button-text text-1xl p-2.5 rounded-xl hover:bg-button-hover mt-10">
        {data.submitButtonText}
      </button>
    </form>
  );
}
