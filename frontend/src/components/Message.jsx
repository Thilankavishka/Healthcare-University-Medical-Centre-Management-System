import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

export default function Message() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [faculty, setFaculty] = useState("");
  const [course, setCourse] = useState();
  return (
    <>
      <div className="w-full px-48">
        <div className="msg-form w-full h-fit rounded-3xl bg-white my-9 py-12 px-36">
          <form>
            <div className="flex justify-between mb-3">
              <input
                className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
                type="text"
                value={firstname}
                placeholder="First Name"
                onChange={(e) => setFirstname(e.target.value)}
              ></input>
              <input
                className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
                type="text"
                value={lastname}
                placeholder="Last Name"
                onChange={(e) => setLastname(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-between mb-3">
              <input
                className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
                type="text"
                value={faculty}
                placeholder="Faculty"
                onChange={(e) => setFaculty(e.target.value)}
              ></input>
              <input
                className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
                type="text"
                value={course}
                placeholder="Course"
                onChange={(e) => setCourse(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-between mb-3">
              <input
                className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <input
                className="w-96 h-10 bg-zinc-200 rounded-2xl px-4"
                type="number"
                value={mobile}
                placeholder="Mobile Number"
                onChange={(e) => setMobile(e.target.value)}
              ></input>
            </div>
            <div className="w-full">
              <textarea
                className="w-full h-40 bg-zinc-200 rounded-2xl px-4 py-3 mb-7"
                rows={8}
                value={message}
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="w-full flex justify-center">
              <Button type="submit" variant="success">
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
