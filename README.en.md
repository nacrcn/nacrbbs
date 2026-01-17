# Nacr Lightweight Forum System

<div align="center">

A modern, lightweight open-source community forum system

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)
![Vue](https://img.shields.io/badge/Vue-3.5%2B-42b883.svg)
![Nuxt](https://img.shields.io/badge/Nuxt-3.17%2B-00dc82.svg)

[Demo](https://bbs.nacr.cn/)

</div>

If this project helps you, please give it a ⭐️ Star to support us!

- Repository: [https://gitee.com/wuaxcn/nacrbbs](https://gitee.com/wuaxcn/nacrbbs)
- Issues: [Issues](https://gitee.com/wuaxcn/nacrbbs/issues)
- QQ: 21089086
- WeChat: rsrx9595

Due to the frontend-backend separation architecture, frontend and backend services need to be deployed separately. If you don't have deployment experience, feel free to contact me for help!

> If you are interested in participating in project development, you are welcome to contact me to join the development! If you have any suggestions or corrections, you are also welcome to raise them! Let's learn and progress together!

---

## 📌 Project Introduction

Nacr is a brand-new lightweight forum system built with a frontend-backend separation architecture, featuring a clean and beautiful interface with excellent performance. Based on the **Fastify + Nuxt3** technology stack, it provides a complete community forum solution suitable for various scenarios such as personal blogs, corporate communities, technical forums, etc.

### Core Features

- 🎨 **Modern UI** - Beautiful interface design, clean and refreshing user experience
- ⚡ **High-Performance Architecture** - Fastify-driven backend + Nuxt3 frontend, ultimate performance
- 🔐 **Comprehensive Security System** - JWT authentication, permission management, data encryption
- 💳 **Payment System** - Integrated with Alipay and other payment methods
- 📊 **Data Statistics** - Rich backend data visualization analysis
- 📧 **Email Service** - Complete email notification and verification functions
- 🔄 **Cache Optimization** - Redis caching improves system response speed
- 📱 **Responsive Design** - Perfect adaptation for PC and mobile devices

---

## 🎬 Interface Showcase

### Frontend Forum

![Frontend Interface](https://imgsbad.semoun.com/uploads/2026/01/17/696af438d4267.png)

### Backend Administration

![Data Statistics](https://imgsbad.semoun.com/uploads/2026/01/17/696af3521b9f3.png)
![User Management](https://imgsbad.semoun.com/uploads/2026/01/17/696af3708277f.png)
![Content Management](https://imgsbad.semoun.com/uploads/2026/01/17/696af383e2221.png)
![System Settings](https://imgsbad.semoun.com/uploads/2026/01/17/696af3af2a792.png)
![Other Features](https://imgsbad.semoun.com/uploads/2026/01/17/696af3d1b4d3a.png)

---

## 🚀 Features

### User Features
- 👤 User registration/login (supports email verification, WeChat Mini Program)
- 📝 Post creation/editing/deletion
- 💬 Comment interaction, like function
- 👥 Follow users, private messaging system
- 📅 Check-in system, points rewards
- 💳 Member recharge, order management
- 💰 Points transfer, balance withdrawal
- 🔔 Personal message notifications
- 🔍 Content search, category browsing

### Admin Features
- 📊 Data statistics and trend analysis
- 👥 User management and user group settings
- 📰 Announcement management, carousel configuration
- 📂 Category management, content moderation
- 💸 Payment method configuration, order management
- 🎨 Site settings, navigation management
- 📧 Email template configuration
- 🎁 Activity management, marketing tools
- ⚙️ System configuration and permission management

---

## 🛠️ Tech Stack

### Backend Technologies
| Technology | Description |
|------------|-------------|
| Node.js | Runtime environment |
| Fastify | High-performance web framework |
| MySQL | Relational database |
| Redis | Cache database |
| Socket.io | Real-time communication |
| Nodemailer | Email service |
| JWT | Authentication |
| Axios | HTTP requests |

### Frontend Technologies
| Technology | Description |
|------------|-------------|
| Nuxt 3 | Vue 3 SSR framework |
| Vue 3 | Frontend framework |
| Arco Design | UI component library |
| Pinia | State management |
| Monaco Editor | Code editor |
| WangEditor | Rich text editor |
| ECharts | Data visualization |

---

## 📦 Quick Start

### Requirements
- Node.js >= 18.0.0
- MySQL >= 5.7
- Redis >= 6.0
- npm >= 9.0.0

### Installation Steps

#### 1. Clone the Project

```bash
git clone https://github.com/your-repo/nacrbbs.git
cd nacrbbs
```

#### 2. Install Dependencies

```bash
# Backend dependencies
npm install

# Frontend dependencies
cd web/client
npm install

cd ../admin
npm install
```

#### 3. Database Configuration

Create a MySQL database and import the `c_deft.sql` file:

Configure database connection (edit `app/config/database.json`):

```json
{
  "host": "localhost",
  "port": 3306,
  "user": "root",
  "password": "your_password",
  "database": "nacr_forum"
}
```

#### 4. Redis Configuration

Configure Redis connection (edit `app/config/redis.json`):

```json
{
  "host": "localhost",
  "port": 6379,
  "password": "",
  "db": 0
}
```

#### 5. Start Backend Service

```bash
node index.js
```

Backend service runs on `http://localhost:3000` by default

#### 6. Start Frontend Services

```bash
# Start frontend
cd web/client
npm run dev

# Start backend admin (new terminal)
cd web/admin
npm run dev
```

Frontend access: `http://localhost:3001`  
Backend admin access: `http://localhost:3002`  
Default admin account: `admin` / Password: `admin123`

---

## 📁 Project Structure

```
nacrbbs/
├── app/                    # Backend core code
│   ├── config/            # Configuration files
│   ├── controller/        # Controller layer
│   │   ├── Admin/        # Admin interfaces
│   │   ├── user/         # User interfaces
│   │   └── tourist/      # Guest interfaces
│   ├── imp/              # Core implementation
│   ├── library/          # Third-party library wrappers
│   ├── router/           # Route definitions
│   ├── safety/           # Security middleware
│   └── scheduledTask/    # Scheduled tasks
├── web/                   # Frontend code
│   ├── client/           # Frontend user interface
│   └── admin/            # Backend admin interface
├── public/               # Static resources
├── c_deft.sql           # Database initialization script
└── index.js             # Backend entry file
```

---

## 🔧 Configuration

### Email Configuration

Configure SMTP email server information in the admin backend for sending verification codes and notification emails.

### Payment Configuration

The system supports multiple payment methods, which need to be configured in the admin backend.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-sourced under the [MIT](LICENSE) license

---
