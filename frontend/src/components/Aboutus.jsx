import React from 'react';

const AboutUs = () => {
    return (
        <section className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-4xl text-center text-cyan-600 font-bold uppercase tracking-wider mb-8">
                    About Us
                </h1>
                <div className="h-1 w-48 bg-cyan-600 mx-auto rounded mb-12"></div>
                <div className="flex flex-wrap items-start">
                    {/* Content */}
                    <div className="w-full md:w-3/5 px-4">
                        <h3 className="text-xl text-gray-900 font-semibold tracking-wide">
                            University of Vavuniya
                        </h3>
                        <p className="text-gray-700 text-lg mt-4 leading-relaxed">
                            Dr.P.Sathiyalingam University Medical Officer E-mail: 
                            <a href="mailto:umo@vau.ac.lk" className="text-cyan-600 underline ml-1">
                                umo@vau.ac.lk
                            </a>
                            <br />
                            Tel: 024 2224674
                            <br />
                            The Health Centre of Northern Provincial Affiliated University College (NPAUC) was established in 1992
                            and was functioning at Kurumankadu.
                        </p>
                        <div className="mt-6">
                            <a
                                href="#"
                                className="bg-cyan-600 text-white text-lg uppercase px-6 py-3 rounded shadow hover:bg-cyan-700 transition"
                            >
                                Read More
                            </a>
                        </div>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-gray-700 text-2xl hover:text-cyan-600">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-gray-700 text-2xl hover:text-cyan-600">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-gray-700 text-2xl hover:text-cyan-600">
                                <i className="fab fa-facebook"></i>
                            </a>
                        </div>
                    </div>
                    {/* Image Section */}
                    <div className="w-full md:w-2/5 px-4 mt-8 md:mt-0">
                        <img
                            src="image/img.jpg"
                            alt="University of Vavuniya Campus"
                            className="rounded shadow-md max-w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
