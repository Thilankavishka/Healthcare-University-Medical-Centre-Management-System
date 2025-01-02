import { useState } from "react";
import axios from "axios";

export default function Message() {
  const [regnum, setRegnum] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobnum, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    setErrMessage("");

    try {
      // Sending the request
      const response = await axios.post(
        "http://localhost:8080/message/sendmsg",
        {
          regnum,
          name,
          email,
          mobnum,
          message,
          faculty,
          course,
        }
      );

      if (response) {
        console.log("Success Send Message");
      }
      // On success
      setResponseMessage("Message sent successfully.");
      setRegnum("");
      setName("");
      setEmail("");
      setMobile("");
      setMessage("");
      setFaculty("");
      setCourse("");
    } catch (err) {
      // Handling errors
      setErrMessage("Error sending the message. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <div className="w-full px-4 sm:px-8 lg:px-32 xl:px-48">
        <div className="msg-form w-full h-fit rounded-3xl bg-white my-6 py-8 px-6 sm:py-10 sm:px-10 lg:py-12 lg:px-24">
          <form onSubmit={handlesubmit}>
            <div className="flex flex-wrap justify-between mb-4 gap-4">
              <input
                className="flex-grow sm:flex-grow-0 sm:w-[calc(50%-1rem)] h-10 bg-zinc-100 rounded-lg px-4 focus:ring-2 focus:ring-blue-500"
                type="text"
                value={regnum}
                placeholder="Reg_Num"
                onChange={(e) => setRegnum(e.target.value)}
              />
              <input
                className="flex-grow sm:flex-grow-0 sm:w-[calc(50%-1rem)] h-10 bg-zinc-100 rounded-lg px-4 focus:ring-2 focus:ring-blue-500"
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap justify-between mb-4 gap-4">
              <input
                className="flex-grow sm:flex-grow-0 sm:w-[calc(50%-1rem)] h-10 bg-zinc-100 rounded-lg px-4 focus:ring-2 focus:ring-blue-500"
                type="text"
                value={faculty}
                placeholder="Faculty"
                onChange={(e) => setFaculty(e.target.value)}
              />
              <input
                className="flex-grow sm:flex-grow-0 sm:w-[calc(50%-1rem)] h-10 bg-zinc-100 rounded-lg px-4 focus:ring-2 focus:ring-blue-500"
                type="text"
                value={course}
                placeholder="Course"
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap justify-between mb-4 gap-4">
              <input
                className="flex-grow sm:flex-grow-0 sm:w-[calc(50%-1rem)] h-10 bg-zinc-100 rounded-lg px-4 focus:ring-2 focus:ring-blue-500"
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="flex-grow sm:flex-grow-0 sm:w-[calc(50%-1rem)] h-10 bg-zinc-100 rounded-lg px-4 focus:ring-2 focus:ring-blue-500"
                type="text"
                value={mobnum}
                placeholder="Mobile Number"
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="w-full">
              <textarea
                className="w-full h-40 bg-zinc-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 mb-6"
                rows={8}
                value={message}
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white font-semibold py-2 px-8 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500"
              >
                Send
              </button>
            </div>
          </form>

          {responseMessage && (
            <p className="mt-4 text-center text-green-600">{responseMessage}</p>
          )}
          {errMessage && (
            <p className="mt-4 text-center text-red-600">{errMessage}</p>
          )}
        </div>
      </div>
    </>
  );
}
