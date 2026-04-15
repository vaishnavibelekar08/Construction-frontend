# Mahalakshmi Construction - Project Documentation

## 1. Introduction

Mahalakshmi Construction is a Web-Based Construction Management & Service Platform. It aims to provide an online presence for showcasing construction services, completed projects, and functioning as a comprehensive client inquiry and management system. By digitizing their operations, the firm bridges the communication gap between them and prospective clients.

## 2. Literature Survey

### 1) Site Visit

Interactions with the construction agency revealed a lack of centralized digital management. Current strategies rely on physical portfolios and word-of-mouth, which limit reach and slow down the inquiry response time.

### 2) Problem Defination

Currently, customer inquiries and project portfolios are managed manually. This leads to:

- Delayed communication and lost leads.
- Inability to dynamically showcase completed and ongoing projects to a broad audience.
- Administrative overload in tracking various services and quotes.

### 3) Problem Solution

Implementing a centralized web platform built with a modern tech stack:

- **Frontend**: Vite + React.js, Bootstrap for responsive UI.
- **Backend**: Node.js + Express.
- **Database**: MySQL.
  The platform handles service listings, dynamic project galleries, quote requests, and features an administrative panel for easy content management.

## 3. Scope Of Project

The scope includes the development of a user-facing website and an admin dashboard.

- **User Interface**: Allows public users to view services, project portfolios, company history, and submit inquiries/quote requests.
- **Admin Dashboard**: Allows administrators to securely login, manage (add/update/delete) services, upload projects, and track customer inquiries in real-time.

## 4. Methodology

### 1) Software Development Lifecycle: V Model

The V-Model allows for a rigorous approach to validation and verification at each stage, ensuring a robust end product.

- **Requirement Analysis** $\rightarrow$ System Testing Design
- **System Design** $\rightarrow$ Integration Testing Design
- **Architecture Design** $\rightarrow$ Integration Testing
- **Module Design** $\rightarrow$ Unit Testing
- **Coding & Implementation**

## 5. Details of Designs, Working & Process

### 1) Design: Diagrams, Modules, Database Table Designs

#### System Architecture Modules

**Frontend (React + Vite):**

- **User Interface Module**: Home Page, About Us, Services, Projects Portfolio, Contact Page.
- **Admin Control Module**: Admin Dashboard, profile management.

**Backend (Node.js + Express):**

- **Service Management Module**: API routes for CRUD operations on services.
- **Project Management Module**: API routes for managing portfolio projects and images.
- **Customer Inquiry Module**: API endpoints to receive and list user inquiries.
- **Database Management Module**: MySQL connection and queries.

#### Database Table Designs

- **Users / Admin Table**: `admin_id` (PK), `username`, `password`
- **Services Table**: `service_id` (PK), `title`, `description`, `image`
- **Projects Table**: `project_id` (PK), `name`, `location`, `cost`, `status`, `image`
- **Inquiry Table**: `inquiry_id` (PK), `name`, `phone`, `email`, `message`

### 2) Working: Feasibility Studies & System Requirements

- **Technical Feasibility**: High. Node.js and React are standard, well-documented technologies.
- **Operational Feasibility**: High. Admin dashboard is intuitive and reduces operational friction.
- **System Requirements (Software)**: Node.js (v16+), MySQL Server, Modern Web Browser.
- **System Requirements (Hardware)**: Minimum dual-core processor, 4GB RAM, standard web hosting environment.

### 3) Process: Testing

- **Unit Testing**: Verification of isolated backend routes (e.g., verifying inquiry submission returns 200 OK).
- **Integration Testing**: Ensuring the React frontend correctly posts data to the Node.js backend.
- **UI/UX Testing**: Compatibility checks across devices using Bootstrap responsiveness.

## 6. Results And Applications

The system successfully provides a 24/7 web presence for Mahalakshmi Construction.

- Customers can easily view available projects, inspiring confidence and trust.
- Inquiries are centrally located, leading to a much higher conversion rate from initial contact to project initiation.
- Applicable to similar real estate and contracting businesses wanting digital transformation.

## 7. Conclusion And Future Scope

**Conclusion**: The digital portal effectively standardizes and streamlines the business operations of Mahalakshmi Construction, making it accessible to a wider audience while enforcing a robust administrative backbone.
**Future Scope**:

- Integration with payment gateways for initial consultation booking.
- Addition of an Augmented Reality (AR) module to preview architectural plans.
- Automated email notification and CRM integration for inquiries.

## 8. References And Bibliography

1. React Server Documentation: https://reactjs.org/
2. Node.js Documentation: https://nodejs.org/
3. Express Framework Guide: https://expressjs.com/
4. MySQL Reference Manual: https://dev.mysql.com/doc/
5. Project Instructions provided by Mahalakshmi Construction.
