# Grievana: Complaint Registration and Management System - Project Documentation

## 📋 Table of Contents
1. [SDG Alignment](#sdg-alignment)
2. [Risk Factors and Mitigation Strategies](#risk-factors-and-mitigation-strategies)
3. [System Architecture](#system-architecture)
4. [Software Engineering Model](#software-engineering-model)

---

## 🎯 SDG Alignment

### Primary SDG Alignment: **SDG 16 - Peace and Justice Strong Institutions**

**Target 16.6**: Develop effective, accountable and transparent institutions at all levels

**Alignment Points:**
- **Transparent Complaint Resolution**: The system provides a transparent platform for students to voice concerns and track resolution progress
- **Accountable Administration**: Administrators can be held accountable through the system's audit trail and reporting features
- **Accessible Justice Mechanism**: Students have direct access to institutional complaint resolution without bureaucratic hurdles
- **Institutional Strengthening**: The system strengthens educational institutions by providing data-driven insights for continuous improvement

### Secondary SDG Alignment: **SDG 4 - Quality Education**

**Target 4.7**: By 2030, ensure that all learners acquire the knowledge and skills needed to promote sustainable development

**Alignment Points:**
- **Safe Learning Environment**: Addresses harassment, discrimination, and infrastructure issues that affect learning quality
- **Student Voice**: Empowers students to participate in institutional governance and improvement
- **Data-Driven Improvements**: Analytics help institutions identify and address systemic issues affecting education quality

### Tertiary SDG Alignment: **SDG 5 - Gender Equality**

**Target 5.1**: End all forms of discrimination against all women and girls

**Alignment Points:**
- **Harassment Prevention**: Provides a safe channel for reporting gender-based harassment and discrimination
- **Confidential Reporting**: Ensures victims can report incidents without fear of retaliation
- **Institutional Response**: Enables systematic tracking and resolution of gender-related complaints

---

## ⚠️ Risk Factors and Mitigation Strategies

### 1. **Data Privacy and Security Risks**

**Risk Level:** High
**Description:** Handling sensitive student and complaint data creates privacy concerns

**Mitigation Strategies:**
- **JWT Authentication**: Secure token-based authentication system
- **Data Encryption**: All sensitive data encrypted in transit and at rest
- **Role-Based Access Control**: Strict access controls based on user roles (Student/Admin)
- **Regular Security Audits**: Periodic security assessments and penetration testing
- **GDPR Compliance**: Implementation of data protection best practices
- **Data Retention Policies**: Automatic deletion of old resolved complaints

### 2. **AI Bias and Inaccurate Categorization**

**Risk Level:** Medium
**Description:** Gemini AI may have biases in complaint categorization or spam detection

**Mitigation Strategies:**
- **Human Oversight**: All AI decisions reviewed by administrators before final action
- **Bias Monitoring**: Regular analysis of AI decisions for patterns of bias
- **Fallback Mechanisms**: Manual categorization option when AI confidence is low
- **Training Data Diversity**: Continuous improvement of AI training data
- **Transparent AI Decisions**: Clear explanation of AI reasoning to users

### 3. **System Availability and Performance**

**Risk Level:** Medium
**Description:** System downtime could prevent complaint submission during critical times

**Mitigation Strategies:**
- **Redundant Architecture**: Multiple server instances with load balancing
- **Database Backup**: Regular automated backups with disaster recovery plan
- **Monitoring Systems**: Real-time performance monitoring and alerting
- **Scalable Infrastructure**: Cloud-based deployment with auto-scaling capabilities
- **Offline Capability**: Progressive Web App features for basic functionality offline

### 4. **User Adoption and Training**

**Risk Level:** Low-Medium
**Description:** Students and staff may resist using the new system

**Mitigation Strategies:**
- **User-Friendly Interface**: Intuitive design with minimal learning curve
- **Comprehensive Training**: Online tutorials, documentation, and help sections
- **Phased Rollout**: Gradual implementation with pilot testing
- **Feedback Mechanisms**: Regular user surveys and feedback collection
- **Support System**: Dedicated help desk and responsive support team

### 5. **Legal and Compliance Risks**

**Risk Level:** High
**Description:** Non-compliance with educational regulations and data protection laws

**Mitigation Strategies:**
- **Legal Review**: Regular consultation with legal experts
- **Compliance Monitoring**: Automated compliance checks and reporting
- **Audit Trails**: Complete logging of all system activities
- **Policy Integration**: System aligned with institutional policies and regulations
- **Regular Updates**: Keeping abreast of changing legal requirements

---

## 🏗️ System Architecture

### **Technology Stack**

#### **Frontend Architecture**
```
React 19.1.0 + Vite
├── State Management: React Context API
├── Routing: React Router DOM v7.6.3
├── Styling: Tailwind CSS v4.1.11
├── HTTP Client: Axios v1.10.0
├── UI Animations: Framer Motion v12.23.12
├── Icons: React Icons v5.5.0 + Lucide React v0.536.0
├── Notifications: React Toastify v11.0.5
├── PDF Generation: jsPDF v3.0.2 + jsPDF-AutoTable v5.0.2
└── Development: ESLint, Vite Dev Server
```

#### **Backend Architecture**
```
Node.js + Express v5.1.0
├── Database: MongoDB with Mongoose v8.17.0
├── Authentication: JWT v9.0.2 + bcryptjs v3.0.2
├── AI Integration: Google Generative AI v0.24.1
├── File Upload: Multer v2.0.2 + Sharp v0.34.3
├── Validation: Express Validator v7.2.1
├── Security: CORS v2.8.5, Rate Limiting v8.0.1
├── Error Handling: Express Async Handler v1.2.0
└── Testing: Jest v30.0.5 + Supertest v7.1.4
```

### **System Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  React Frontend (SPA)                                  │ │
│  │  ├── Landing Page                                      │ │
│  │  ├── Authentication (Login/Register)                   │ │
│  │  ├── Student Dashboard                                 │ │
│  │  ├── Admin Dashboard                                   │ │
│  │  └── Complaint Management                              │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                 │
                    HTTP/HTTPS (REST API)
                                 │
┌─────────────────────────────────────────────────────────────┐
│                   API GATEWAY LAYER                         │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Express.js Server                                     │ │
│  │  ├── Authentication Middleware                         │ │
│  │  ├── Role-Based Access Control                         │ │
│  │  ├── Rate Limiting                                     │ │
│  │  ├── Input Validation                                  │ │
│  │  └── Error Handling                                    │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                 │
                    Database Operations
                                 │
┌─────────────────────────────────────────────────────────────┐
│                   DATA LAYER                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  MongoDB Database                                      │ │
│  │  ├── Users Collection                                  │ │
│  │  ├── Complaints Collection                             │ │
│  │  ├── Categories Collection                             │ │
│  │  └── Contact Messages Collection                       │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  AI Service Layer                                      │ │
│  │  ├── Google Gemini AI                                   │ │
│  │  ├── Spam Detection                                    │ │
│  │  ├── Auto-Categorization                               │ │
│  │  └── Content Analysis                                  │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### **Key Architectural Patterns**

#### **1. MVC Pattern (Backend)**
- **Models**: Mongoose schemas for data validation and structure
- **Views**: JSON responses and error handling
- **Controllers**: Business logic and API endpoint handlers

#### **2. Component-Based Architecture (Frontend)**
- **Reusable Components**: Modular React components
- **Context API**: Global state management for theme and authentication
- **Route-Based Code Splitting**: Lazy loading of dashboard sections

#### **3. Microservices-Ready Design**
- **Modular Backend**: Separate controllers for different domains
- **Service Layer**: AI service abstraction for easy replacement
- **Middleware Pattern**: Reusable authentication and validation middleware

#### **4. Security Architecture**
- **Defense in Depth**: Multiple security layers (authentication, validation, rate limiting)
- **Zero Trust Model**: Every request validated regardless of source
- **Secure by Default**: Conservative security settings with explicit permissions

---

## 🔄 Software Engineering Model

### **Selected Model: Agile with Scrum Framework**

### **Why Agile Scrum?**

#### **1. Project Characteristics Fit**
- **Dynamic Requirements**: Educational institutions have evolving needs
- **User-Centric Development**: Direct feedback from students and administrators crucial
- **Iterative Improvement**: Regular releases allow for continuous enhancement
- **Cross-Functional Team**: Small team requires flexible collaboration

#### **2. Risk Mitigation Alignment**
- **Frequent Deliveries**: Reduces risk of complete project failure
- **Continuous Feedback**: Early identification of issues and user needs
- **Adaptability**: Can respond to changing institutional requirements
- **Transparency**: Stakeholders can see progress and provide input regularly

#### **3. Technology Stack Compatibility**
- **Modern Web Technologies**: React and Node.js ecosystems thrive in iterative development
- **CI/CD Ready**: Easy integration with automated testing and deployment
- **Modular Architecture**: Supports incremental feature development and testing

### **Scrum Implementation Details**

#### **Sprint Structure**
- **Sprint Duration**: 2 weeks
- **Sprint Planning**: Define user stories and acceptance criteria
- **Daily Standups**: 15-minute progress updates
- **Sprint Review**: Demonstrate working features to stakeholders
- **Sprint Retrospective**: Identify improvements for next sprint

#### **Product Backlog Items**
- **User Stories**: Written from student and admin perspectives
- **Acceptance Criteria**: Clear, testable requirements
- **Story Points**: Relative complexity estimation using Fibonacci sequence
- **Priority Levels**: High, Medium, Low based on business value

#### **Roles and Responsibilities**
- **Product Owner**: Educational institution representative
- **Scrum Master**: Facilitates Scrum process and removes impediments
- **Development Team**: Cross-functional team handling frontend, backend, and DevOps

#### **Artifacts**
- **Product Backlog**: Living document of all potential work
- **Sprint Backlog**: Committed work for current sprint
- **Increment**: Potentially releasable product at sprint end

### **Quality Assurance Integration**
- **Test-Driven Development (TDD)**: Unit tests written before implementation
- **Continuous Integration**: Automated testing on every commit
- **Code Reviews**: Peer review of all code changes
- **User Acceptance Testing**: Stakeholder validation of features

### **Metrics and Monitoring**
- **Velocity Tracking**: Measure team productivity and predictability
- **Burndown Charts**: Visual progress tracking within sprints
- **Quality Metrics**: Test coverage, defect rates, and user satisfaction
- **Performance Monitoring**: System uptime, response times, and error rates

### **Why Not Other Models?**

#### **Waterfall - Not Suitable Because:**
- Requirements in educational systems are often unclear initially
- No opportunity for feedback until the end
- Difficult to accommodate changing institutional needs
- High risk of delivering unusable product

#### **Kanban - Could Work But Scrum Better Because:**
- Scrum provides more structure for a small team
- Time-boxed iterations create urgency and focus
- Sprint retrospectives drive continuous improvement
- Better suited for feature development with fixed deadlines

#### **Extreme Programming (XP) - Not Chosen Because:**
- While pair programming and TDD are valuable, full XP might be too intense for this project scope
- Scrum provides sufficient agility without XP's additional overhead
- Team size and project complexity don't require XP's full methodology

### **Success Metrics**
- **Delivery Predictability**: Consistent sprint goal achievement
- **Quality Metrics**: Low defect rates and high test coverage
- **User Satisfaction**: Positive feedback from students and administrators
- **Business Value**: Measurable improvements in complaint resolution times
- **Technical Health**: Maintainable codebase with good documentation

---

## 📞 Contact and Support

For questions about this documentation or the Grievana system, please contact:
- **Project Repository**: [GitHub](https://github.com/anup2702/Grievana-Complaint-Reg-Mang)
- **Documentation Author**: Development Team
- **Last Updated**: December 2024

---

*This documentation serves as a comprehensive guide for understanding, maintaining, and extending the Grievana Complaint Management System. Regular updates will be made to reflect system evolution and lessons learned.*

---

## ✨ Unique Light Features of Grievana

To make Grievana stand out and provide a delightful user experience, the following light features have been incorporated:

### 1. **AI-Powered Complaint Analysis**
- Uses Google Gemini AI to automatically detect spam, offensive content, and categorize complaints.
- Provides priority levels and brief summaries to help admins quickly understand issues.

### 2. **Real-Time Complaint Tracking**
- Students can track the status of their complaints live through the dashboard.
- Notifications alert users when updates occur, enhancing transparency.

### 3. **Theme Toggle with Dark Mode**
- User-friendly theme toggle button available across all pages.
- Supports dark mode for comfortable usage in low-light environments.

### 4. **Animated UI Elements**
- Smooth animations using Framer Motion for buttons, sections, and transitions.
- Enhances engagement without compromising performance.

### 5. **Responsive and Accessible Design**
- Fully responsive layout for mobile, tablet, and desktop.
- Accessibility considerations such as ARIA labels and keyboard navigation support.

### 6. **Integrated Feedback and Support**
- Dedicated contact section for users to reach out to admins.
- Feedback mechanisms to continuously improve the platform.

### 7. **Secure and Transparent User Management**
- Role-based access control with clear separation of student and admin functionalities.
- Audit trails for complaint handling to ensure accountability.

### 8. **Lightweight and Fast**
- Built with Vite and React for fast load times and smooth interactions.
- Minimal dependencies to keep the app lightweight.

These features collectively make Grievana a unique, modern, and user-centric complaint management system tailored for educational institutions.
