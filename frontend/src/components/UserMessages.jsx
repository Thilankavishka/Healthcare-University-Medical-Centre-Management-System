import { useEffect, useState } from "react";
import axios from "axios";

export default function UserMessage() {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to track search input
  const [numofmessages, setNumofmessages] = useState(null);

  // Fetch messages from backend when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/message/getusermessages")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log("Error fetching messages:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/message/countmessages")
      .then((response) => {
        setNumofmessages(response.data.count);
      })
      .catch((error) => {
        console.log("Error fetching messages:", error);
      });
  }, []);

  // Filter messages based on regnum
  const filteredMessages = messages.filter((message) =>
    message.regnum.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">User Messages</h1>
      {/* Search Input and Total Messages Section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center px-6 sm:px-10 py-4 bg-gray-100 rounded-lg ">
        {/* Left side: Search Input */}
        <div className="w-full sm:w-2/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search by Registration Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-2 border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-green-500 transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Right side: Total Messages */}
        <div className="flex justify-center items-center">
          <h2 className="text-green-800 text-2xl sm:text-3xl font-semibold">
            Total Messages: <span className="text-black">{numofmessages}</span>
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white text-left text-sm text-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">
                Reg. Number
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">
                Faculty
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">
                Course
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-gray-700">
                Message
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((message) => (
              <tr key={message._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {message.regnum}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {message.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {message.faculty}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {message.course}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {message.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {message.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
