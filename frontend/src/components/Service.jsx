import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaTools,
  FaHandshake,
  FaFlask,
  FaUserMd,
  FaPrescriptionBottleAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaCalendarAlt className="w-12 h-12" />,
      title: "Appointment Scheduling",
      description:
        "Allows patients to book, reschedule, or cancel appointments online with automatic assignment based on doctor availability.",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: <FaUserMd className="w-12 h-12" />,
      title: "Electronic Health Records",
      description:
        "Digital version of patient charts including diagnoses, medications, lab results, and treatment plans with real-time updates.",
      color: "from-green-500 to-green-700",
    },
    {
      icon: <FaHandshake className="w-12 h-12" />,
      title: "Patient Portal",
      description:
        "Secure access for patients to view medical records, test results, and communicate with providers.",
      color: "from-teal-500 to-teal-700",
    },
    {
      icon: <FaTools className="w-12 h-12" />,
      title: "Equipment Maintenance",
      description:
        "Tracks medical equipment status, maintenance schedules, and service history for optimal operation.",
      color: "from-red-500 to-red-700",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8 relative min-h-screen">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-4 md:left-8 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-gray-700 hover:text-blue-600 z-10"
      >
        <FaArrowLeft className="text-lg" />
        <span className="font-medium">Back</span>
      </motion.button>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 pt-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
          Our Healthcare Services
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive medical services designed to provide exceptional patient
          care with cutting-edge technology
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${
              hoveredCard === index ? "ring-4 ring-opacity-30" : ""
            }`}
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10`}
            ></div>

            {/* Service Card Content */}
            <div className="relative bg-white/90 backdrop-blur-sm p-8 h-full flex flex-col">
              {/* Icon with gradient background */}
              <div
                className={`mb-6 w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.color} text-white shadow-md`}
              >
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>

              <div className="mt-auto">
                <button
                  className={`px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r ${service.color} hover:opacity-90 transition-all transform hover:scale-105 shadow-md flex items-center`}
                >
                  Learn More
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>

              {/* Hover effect element */}
              <div
                className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${service.color} opacity-0 ${
                  hoveredCard === index ? "opacity-10 animate-pulse" : ""
                } transition-opacity duration-300`}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-20"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Need a service not listed here?
        </h3>
        <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
          Contact Our Support Team
        </button>
      </motion.div>
    </div>
  );
};

export default ServicesSection;
