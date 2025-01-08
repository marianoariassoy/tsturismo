import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

const Form = () => {
  type Inputs = {
    name: string;
    email: string;
    phone: string;
    message: string;
  };

  const [sended, setSended] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: Inputs) => {
    setSending(true);
    const sender = {
      to: " ",
      from: " ",
      from_name: "Ts Turismo",
      subject: "Contact",
    };

    axios.post("", { ...data, ...sender }).then((data) => {
      if (data.data === "success") {
        setSended(true);
        setSending(false);
      } else {
        setError(true);
        setSending(false);
      }
    });
  };

  const Error = () => {
    return (
      <div className="text-sm font-medium mt-1 text-primary">
        This field is required
      </div>
    );
  };

  return (
    <>
      {error ? (
        <span className="text-2xl font-bold">Error</span>
      ) : sended ? (
        <span className="text-3xl font-bold">Your message has been sent</span>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              className="w-full border h-11 px-4"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name && <Error />}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                className="w-full border h-11  px-4"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email && <Error />}
            </div>
            <div>
              <input
                className="w-full border h-11  px-4"
                placeholder="Phone"
                {...register("phone", { required: true })}
              />
              {errors.phone && <Error />}
            </div>
          </div>
          <textarea
            className="w-full border h-32 p-4 mt-4 mb-2"
            placeholder="Message"
            {...register("message")}
          />

          {sending ? (
            <BeatLoader className="mt-6" />
          ) : (
            <button
              type="submit"
              className="font-bold bg-primary text-white h-11 hover:bg-black transition px-8"
            >
              Send
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default Form;
