import  React from 'react';

const ServicesSection = () => {
    return (
        <div className="bg-blue-200 py-12">
            {/* Title Section */}
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
                <div className="h-1 w-24 bg-gray-800 mx-auto mt-4"></div>
            </div>

            {/* Services Section */}
            <div className="flex flex-wrap justify-center mt-12 gap-6">
                {/* Card 1 */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-80 hover:bg-blue-100 transition duration-300">
                    <div className="text-center text-4xl text-blue-600 mb-4">
                        <i className="fas fa-calendar"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-red-500 mb-4">Database Management</h2>
                    <p className="text-gray-600 mb-6">
                        A digital version of patient charts, including diagnoses, medications, lab results, and treatment plans. Real-time updates by doctors and healthcare providers.
                    </p>
                    <a href="#" className="text-white bg-blue-600 py-2 px-4 rounded hover:bg-red-500 transition duration-300">
                        Read More
                    </a>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-80 hover:bg-blue-100 transition duration-300">
                    <div className="text-center text-4xl text-blue-600 mb-4">
                        <i className="fas fa-wrench"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-red-500 mb-4">Appointment Scheduling</h2>
                    <p className="text-gray-600 mb-6">
                        Allows patients to book, reschedule, or cancel appointments online. Automatically assigns appointments based on available doctor slots.
                    </p>
                    <a href="#" className="text-white bg-blue-600 py-2 px-4 rounded hover:bg-red-500 transition duration-300">
                        Read More
                    </a>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-lg shadow-lg p-6 w-80 hover:bg-blue-100 transition duration-300">
                    <div className="text-center text-4xl text-blue-600 mb-4">
                        <i className="fas fa-handshake"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-red-500 mb-4">Inventory & Supply Management</h2>
                    <p className="text-gray-600 mb-6">
                        Tracks medical supplies and medications in real-time. Alerts for low stock, expiry dates, and replenishment needs.
                    </p>
                    <a href="#" className="text-white bg-blue-600 py-2 px-4 rounded hover:bg-red-500 transition duration-300">
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
