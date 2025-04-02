import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Help = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 md:left-12 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-gray-700 hover:text-blue-600"
      >
        <FaArrowLeft className="text-lg" />
        <span className="font-medium">Back</span>
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-800 mb-4">
            Help & Support
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mx-auto mb-12"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Content */}
          <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Contact Details
            </h3>

            <div className="space-y-4 text-gray-600">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-lg leading-relaxed">
                  <span className="font-semibold text-blue-700">Help Desk:</span> 
                  John Doe
                </p>
                <p className="text-lg leading-relaxed">
                  <span className="font-semibold text-blue-700">E-mail:</span>
                  <a
                    href="mailto:helpdesk@vau.ac.lk"
                    className="text-cyan-600 hover:text-cyan-800 font-medium ml-1 transition-colors"
                  >
                    helpdesk@vau.ac.lk
                  </a>
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-blue-700">Tel:</span> 024
                  2224680
                </p>
              </div>

              <p className="text-lg leading-relaxed">
                If you have any questions or need assistance, feel free to
                contact our help desk team. We are here to provide support and
                resolve any issues you may encounter.
              </p>

              {expanded && (
                <div className="space-y-4 animate-fadeIn">
                  <p className="text-lg leading-relaxed">
                    We offer assistance with the following:
                  </p>
                  <ul className="list-disc pl-6 text-lg leading-relaxed">
                    <li>Account setup and management</li>
                    <li>Technical support for university systems</li>
                    <li>Guidance on accessing university resources</li>
                    <li>Campus-related queries</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => setExpanded(!expanded)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 flex items-center gap-2"
              >
                {expanded ? (
                  <>
                    <span>Show Less</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Read More</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                )}
              </button>

              <div className="flex space-x-2">
                <a
                  href="#"
                  className="text-gray-500 hover:text-cyan-600 transition-colors p-3 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-400 transition-colors p-3 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-xl" />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-red-600 transition-colors p-3 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  aria-label="YouTube"
                >
                  <FaYoutube className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
              <img
                src="/src/assets/logo.png"
                alt="Help & Support Logo"
                className="w-full h-auto object-contain"
                style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  We're Here to Help
                </h3>
                <p className="text-gray-600">
                  Our team is ready to assist with any inquiries you may have.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To provide accessible, quality support to all members of our community
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Values</h3>
            <p className="text-gray-600">
              Compassion, Excellence, Integrity, and Innovation in providing support
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Our Team</h3>
            <p className="text-gray-600">
              Dedicated professionals committed to ensuring smooth operations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;
