# StudyNotion - EdTech Platform

🚀 **Live Demo:** https://learnify-edtech-platform-one.vercel.app/

<img width="518" height="782" alt="mainpage" src="https://github.com/user-attachments/assets/5dd2f279-0895-4d68-b6d6-7cfdd2334adc" />



StudyNotion is a full-stack EdTech platform built using the MERN stack that enables users to create, consume, rate, and purchase online courses.

The platform provides separate dashboards for students and instructors, secure authentication, course management, payment integration, and cloud-based media storage.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
- [Run Locally](#run-locally)
- [Screenshots](#screenshots)
- [Key Functionalities](#key-functionalities)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## Features

### Authentication & Authorization
- JWT-based secure authentication
- OTP verification for account signup
- Encrypted password storage using bcrypt
- Role-based access control

### Student Features
- Browse available courses
- Purchase courses securely
- Access enrolled course content
- Rate and review courses
- Track learning progress
- Manage wishlist
- Contact Us page for user support
- Email-based query handling

### Instructor Features
- Create and publish courses
- Upload course content
- Manage course details
- View enrolled students
- Monitor course performance
- Edit and delete courses

### Payment Integration
- Secure payment processing using Razorpay

### Media Management
- Cloud-based media upload and storage using Cloudinary

### Additional Functionalities
- Forgot password flow
- Email notifications
- Course analytics dashboard

---

## Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security
- JWT
- OTP Verification
- bcrypt

### Third-Party Services
- Razorpay
- Cloudinary
- Nodemailer

---

## System Architecture

The StudyNotion platform follows a client-server architecture.

### Frontend
Built using React.js and Tailwind CSS for a responsive and dynamic user experience.

### Backend
Built using Node.js and Express.js to provide REST APIs for all platform operations.

### Database
MongoDB is used for storing users, courses, reviews, payments, and other application data.

### Architecture Flow
- Client sends requests through frontend
- Backend processes requests
- MongoDB stores and retrieves data
- Cloudinary handles media storage
- Razorpay handles payment processing

---

## Project Structure

```bash
StudyNotion/
│
├── src/                    # Frontend source code
├── public/
├── .env
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── .env
│
└── package.json
```

---

## Environment Variables

### Frontend (.env)

```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_RAZORPAY_KEY=your_razorpay_key
```

### Backend (server/.env)

```env
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email
MAIL_PASS=your_email_password

JWT_SECRET=your_jwt_secret
FOLDER_NAME=StudyNotion

RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

MONGODB_URL=your_mongodb_connection_string
PORT=4000
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/yashdeepdeshmukh18/Learnify-EdTech-Platform
cd StudyNotion
```

### Install Frontend Dependencies

```bash
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### Configure Environment Variables

Create:

- `.env` in root directory
- `.env` inside `server/`

Add all required environment variables.

---

## Run Locally

Start both frontend and backend using:

```bash
npm run dev
```

Application runs on:

- Frontend → `http://localhost:3000`
- Backend → `http://localhost:4000`

---

## Few main pages Screenshots

### Student Dashboard
<img width="1920" height="1034" alt="Screenshot (30)" src="https://github.com/user-attachments/assets/18ab9743-854d-4b6a-a5af-d300a6321ef9" />


### Instructor Dashboard
<img width="1920" height="1034" alt="Screenshot (31)" src="https://github.com/user-attachments/assets/dc52c63c-a42b-4159-acd3-b17e64bd7239" />


### Course Page
<img width="1920" height="1039" alt="Screenshot (32)" src="https://github.com/user-attachments/assets/397de510-78f4-40bc-ad0e-bef9cc0cec8b" />


### Course Creation Page
<img width="1920" height="1038" alt="Screenshot (33)" src="https://github.com/user-attachments/assets/d9bc3801-a7b3-475b-8a18-be73bb299774" />


### Payment Checkout
<img width="1920" height="1038" alt="Screenshot (34)" src="https://github.com/user-attachments/assets/1a90bbd2-b611-4a04-b8d9-bd459f18f00f" />


### Database Schema
<img width="736" height="384" alt="schema" src="https://github.com/user-attachments/assets/09092003-83e7-4311-b14c-f95265ea73bd" />

---

## Key Functionalities

### Secure Authentication
JWT-based authentication with OTP verification and encrypted password storage.

### Role-Based Access Control
Separate access permissions for students and instructors.

### Course Management
Full CRUD operations for instructor-created courses.

### Payment Workflow
Secure course purchasing using Razorpay integration.

### Cloud Media Upload
Efficient storage and retrieval using Cloudinary.

### Course Ratings & Reviews
Students can provide feedback on purchased courses.

---

## Future Enhancements

- Live classes
- Course certificates
- AI-based course recommendations
- Discussion forums
- Real-time chat
- Advanced analytics dashboard

---

## Author

**Yashdeep Deshmukh**  
AI & Data Science Engineering Student

---

## License

This project is developed for educational and learning purposes.
