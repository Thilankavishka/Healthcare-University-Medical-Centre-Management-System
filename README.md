# Healthcare: Medical Center Management System

## Overview

The **University of Vavuniya Medical Center Website** is a web application developed using the **MERN stack** (MongoDB, Express, React, Node.js). This website is designed to serve as a centralized online platform for the medical center of our university, offering students, faculty, and staff a variety of services and information.

---

## Features

- **Appointment Scheduling**: Users can view available doctors and schedule appointments directly through the platform.
  
- **Doctor and Department Listings**: A comprehensive list of doctors, their specialties, and the respective medical departments.
  
- **Patient Information Portal**: Patients can manage their medical history, track upcoming appointments, and view test results.
  
- **News and Updates**: Latest health news, university medical center updates, and announcements.
  
- **Admin Dashboard**: Admins can manage users, appointments, doctors, general website content, drugs, and more.

---

## Technologies Used

- **MongoDB**: A NoSQL database used to store patient data, appointments, doctor details, and other dynamic content.
  
- **Express**: A web application framework for Node.js, used to handle HTTP requests, routing, and backend logic.
  
- **React**: A front-end JavaScript library for building dynamic user interfaces, enabling a responsive and interactive experience.
  
- **Node.js**: A JavaScript runtime environment for the backend to handle server-side logic and database interactions.
  
- **JWT (JSON Web Tokens)**: Used for secure user authentication and authorization.
  
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB, making it easier to work with MongoDB from Node.js.
  
- **Tailwind CSS**: A utility-first CSS framework for designing custom interfaces quickly.

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version 14 or above)
- **MongoDB** (local setup or MongoDB Atlas)
- **npm** (Node Package Manager)

---

### Setting Up the Project

Follow these steps to run the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Thilankavishka/Healthcare-University-Medical-Centre-Management-System.git
   
   cd Healthcare-University-Medical-Centre-Management-System
   
<h1>Backend Setup</h1>

  
     Navigate to the backend directory:cd backend
     Install node_modules:npm install
     
     Create a .env file in the backend folder with the following content:
     .env
     
     URL="http://localhost:5000"  # Your backend URL
     SUPERADMIN_KEY="superadmin-key"
     PATIENT_KEY="student-key"
     ADMIN_KEY="admin-key"

     Start the backend server:npm start

<h1>Frontend Setup</h1>


         Navigate to the frontend directory:cd frontend
         Install frontend dependencies:npm install
         Start the frontend development server:npm run dev



university-medical-center-management-system  Structure
````bash
│
├── /backend             # Backend code (Node.js, Express)
│   ├── /models          # Mongoose models
│   ├── /routes          # API routes
│   ├── /controllers     # Backend logic
│   ├── /middleware      # Authentication and authorization
│   └── server.js        # Server entry point
│
├── /frontend            # Frontend code (React)
│   ├── /src
│   │   ├── /components  # React components
│   │   ├── /pages       # React pages
│   │   ├── /services    # API calls and services
│   │   ├── /context     # Global state (e.g., Context API)
│   │   └── App.js       # Main React component
│   └── package.json     # Frontend dependencies
│
└── package.json         # Project dependencies (for both frontend & backend)


