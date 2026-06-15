# AI UI Builder

An AI-powered UI builder that transforms natural language prompts into production-ready user interfaces. Users simply describe their idea, and the platform intelligently generates modern, responsive UI code using AI, helping developers and non-developers accelerate the application development process.

---

## ✨ Features

* 🤖 AI-powered UI generation from natural language prompts
* 🎨 Modern and responsive UI generation
* 🔐 Secure authentication with Email/Password and Social login
* 👤 User profile management with avatar uploads
* 💳 Stripe-powered credit purchase system
* 📜 Payment history management
* 🔄 Session management with JWT authentication
* 🛡️ Protected routes and secure API access
* 🚦 Rate limiting and request validation using Zod
* ☁️ Cloud-based media storage and asset management

---

## 🧱 Tech Stack

### Frontend

* ⚛️ React
* 📘 JavaScript
* 🎨 Tailwind CSS
* 🧠 Zustand (State Management)
* 🔐 Protected Routing
* 🌐 Axios
* 🔥 Firebase Authentication

### Backend

* 🟢 Node.js
* 🚂 Express.js
* 🍃 MongoDB (Mongoose)
* 🔐 JWT Authentication
* 💳 Stripe Payment Processing
* ☁️ ImageKit (Media Storage)
* 📤 Multer (File Upload Handling)
* ✅ Zod Validation

### AI Integration

* 🤖 OpenRouter API
* 🧠 Large Language Models (LLMs)

---

## 🧪 API Highlights

### Authentication

* `/api/auth/register`
* `/api/auth/login`
* `/api/auth/social-login`
* `/api/auth/logout`

### User Management

* `/api/users/profile`
* `/api/users/delete-account`

### Project Management

* `/api/projects/create`
* `/api/projects/update`
* `/api/projects/delete`
* `/api/projects/:id`

### Payments & Credits

* `/api/payments/create-checkout-session`
* `/api/payments/verify`
* `/api/payments/payments-history`
* `/api/payments/payment-delete/:paymentId`

---

## 💳 Credit & Payment System

Users can purchase credits through Stripe Checkout. After successful payment verification:

* Credits are automatically added to the user's account
* Payment records are stored securely
* Users can view their transaction history from their profile
* Credit balance is updated instantly
* AI generations consume credits based on usage

---

## 🛡️ Security Practices

* JWT-based Authentication
* HTTP-Only Secure Cookies
* Protected Backend Routes
* Role-Based Authorization
* Zod Request Validation
* Secure File Upload Handling
* Stripe Payment Verification
* Centralized Error Handling

---

## 🏗️ Architecture Highlights

* Scalable Controller-Service Architecture
* Modular Feature-Based Folder Structure
* Reusable API & Validation Layers
* Centralized State Management with Zustand
* Clean Separation of Frontend & Backend Concerns
* Separate Payment & Credit Management System

---

## 📌 Future Improvements

* 🧩 Multi-page application generation
* 💬 AI-powered project chat assistant
* 👥 Team collaboration workspace
* 🔄 Real-time collaborative editing
* 🧠 AI context persistence
* 🚀 CI/CD integration and deployment automation

---

## 👨‍💻 Author

**Harshit Verma**
Frontend-Focused Full Stack Developer

GitHub: https://github.com/vharshit8171
