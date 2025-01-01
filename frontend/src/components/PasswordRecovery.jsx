const PasswordRecovery = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;

    try {
      const response = await axios.post("/password-recovery", { fullName, email });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
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
