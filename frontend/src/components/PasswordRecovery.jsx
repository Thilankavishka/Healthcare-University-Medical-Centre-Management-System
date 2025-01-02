const PasswordRecovery = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/password-recovery", { fullName, email });
      setSuccess("Recovery email sent! Check your inbox.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
      setSuccess("");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-10 bg-white shadow-md rounded-lg text-left">
        <h1 className="text-2xl font-bold mb-6">
          HealthCare | Patient Password Recovery
        </h1>
        <h2 className="text-xl font-semibold text-blue-500 mb-4">
          Patient Password Recovery
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Please enter your Email and Full Name to recover your password.
        </p>
        <form className="space-y-4">
          {/* Full Name Input */}
          <div className="relative">
            <input
              type="text"
              id="fullName"
              placeholder="Registered Full Name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder="Registered Email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Reset Button */}
          <button
            type="submit"
            className="py-1 px-4 text-sm bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reset
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log-in
          </a>
        </p>
      </div>
    </div>
  );
};

export default PasswordRecovery;
