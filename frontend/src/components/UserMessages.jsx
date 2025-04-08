import { useEffect, useState } from "react";
import axios from "axios";

export default function UserMessage() {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [numofmessages, setNumofmessages] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch messages from backend when component mounts
  useEffect(() => {
    fetchMessages();
    fetchMessageCount();
  }, []);

  const fetchMessages = () => {
    axios
      .get("http://localhost:8080/message/getusermessages")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.log("Error fetching messages:", error);
      });
  };

  const fetchMessageCount = () => {
    axios
      .get("http://localhost:8080/message/countmessages")
      .then((response) => {
        setNumofmessages(response.data.count);
      })
      .catch((error) => {
        console.log("Error fetching message count:", error);
      });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      setIsDeleting(true);
      try {
        await axios.delete(`http://localhost:8080/message/deletemessage/${id}`);
        // Refresh the messages after deletion
        fetchMessages();
        fetchMessageCount();
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("Failed to delete message");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Filter messages based on regnum
  const filteredMessages = messages.filter((message) =>
    message.regnum.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        User Messages
      </h1>

      {/* Search Bar and Total Messages Section */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-md">
        <div className="w-full sm:w-2/3 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search by Registration Number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex justify-center items-center">
          <h2 className="text-blue-600 text-2xl sm:text-3xl font-semibold">
            Total Messages:{" "}
            <span className="text-gray-800">{numofmessages}</span>
          </h2>
        </div>
      </div>

      {/* Messages Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
            <tr>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Reg. Number
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Name
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Faculty
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Course
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Email
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Message
              </th>
              <th className="px-4 py-2 text-white font-semibold text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <tr
                  key={message._id}
                  className="hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {message.regnum}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {message.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {message.faculty}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {message.course}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {message.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {message.message}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(message._id)}
                      disabled={isDeleting}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors disabled:bg-red-300"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-500 py-4 font-medium"
                >
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}