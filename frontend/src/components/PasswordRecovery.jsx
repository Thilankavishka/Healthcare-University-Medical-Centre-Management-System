import React from "react";

const PasswordRecovery = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-10 bg-white shadow-md rounded-lg text-left">
        <h1 className="text-2xl font-bold mb-6">HealthCare | Student Password Recovery</h1>
        <h2 className="text-xl font-semibold text-blue-500 mb-4">Patient Password Recovery</h2>
        <p className="text-gray-600 text-sm mb-6">
          Please enter your Email and Full Name to recover your password.
        </p>
        <form className="space-y-4">
          {/* Full Name Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2h-3.5a2 2 0 01-1.415-.586l-.586-.586A2 2 0 009.5 3H6a2 2 0 00-2 2v4a2 2 0 002 2h4m6 0H6"
                />
              </svg>
            </span>
            <input
              type="text"
              id="fullName"
              placeholder="Registered Full Name"
              className="mt-1 block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Email Input */}
        <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12h3v1a3 3 0 01-3 3h-1m-6 0H7a3 3 0 01-3-3v-1h3m6 0h6m-6 0H3a2 2 0 002 2h6m0-12h4a3 3 0 013 3v4a3 3 0 01-3 3h-4m6-7h1a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2h1"
                />
              </svg>
            </span>
            <input
              type="email"
              id="email"
              placeholder="Registered Email"
              className="mt-1 block w-full pl-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
