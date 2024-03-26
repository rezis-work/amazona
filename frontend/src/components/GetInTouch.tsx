import { useRef } from "react";
import emailjs from "@emailjs/browser";

export const GetInTouch = () => {
  const form = useRef<HTMLFormElement>(null); // Specify the correct type for the ref

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_x47y16a",
        "template_5gt0o5t",
        form.current!,
        "A9QsqOQkTxhS0hfiF"
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className=" pb-10 shadow-lg p-4 mt-5 flex flex-col rounded-lg"
    >
      <label className=" mr-2">Name</label>
      <input
        type="text"
        name="from_name"
        className=" border outline-none"
      />{" "}
      <br />
      <label className=" mr-2">Email</label>
      <input
        type="email"
        name="from_name"
        className=" border outline-none"
      />{" "}
      <br />
      <label>Message</label> <br />
      <textarea name="message" className=" border outline-none" />
      <button
        type="submit"
        className=" ml-1 mt-2 bg-black text-white p-2 rounded-md"
      >
        Send
      </button>
    </form>
  );
};
