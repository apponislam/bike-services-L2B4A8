# 🚲 Bike Services Management System

A RESTful API for managing bike service records, customers, and bike information with PostgreSQL and Prisma ORM.

## 🌐 Live Deployment

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue)](https://bike-services-l2-b4-a8.vercel.app)

## 🛠 Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Language**: TypeScript
-   **Hosting**: Vercel (API), Render.com (Database)

## 🚀 Key Features

-   Customer management (CRUD operations)
-   Bike registration and tracking
-   Service record management
-   Overdue service detection
-   Standardized error handling
-   RESTful API design

## 🏗 Database Schema

![Database Schema](https://i.imgur.com/your-schema-image.png)

## ⚙️ Setup Guide

### Prerequisites

-   Node.js v18+
-   PostgreSQL database
-   Git

### Installation

```bash
git clone https://github.com/apponislam/bike-services-L2B4A8.git
cd bike-services
```

```bash
npm install
```

```bash
cp .env.example .env
```

Edit .env with:

```bash
PORT=3000
DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public"
NODE_ENV="development"
```

```bash
npx prisma migrate dev
```

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run prod
```

## 📚 API Documentation

### Customers

| Endpoint           | Method | Description           |
| ------------------ | ------ | --------------------- |
| /api/customers     | POST   | Create new customer   |
| /api/customers     | GET    | Get all customers     |
| /api/customers/:id | GET    | Get specific customer |
| /api/customers/:id | PUT    | Update customer       |
| /api/customers/:id | DELETE | Delete customer       |

### Bikes

| Endpoint       | Method | Description       |
| -------------- | ------ | ----------------- |
| /api/bikes     | POST   | Add new bike      |
| /api/bikes     | GET    | Get all bikes     |
| /api/bikes/:id | GET    | Get specific bike |

### Services

| Endpoint             | Method | Description                 |
| -------------------- | ------ | --------------------------- |
| /api/services        | POST   | Create service record       |
| /api/services        | GET    | Get all service records     |
| /api/services/:id    | GET    | Get specific service record |
| /api/services/status | GET    | Get overdue services        |

## 📦 Example Requests

```bash
curl -X POST https://bike-services-l2-b4-a8.vercel.app/api/customers \
 -H "Content-Type: application/json" \
 -d '{
"name": "John Doe",
"email": "john.doe@example.com",
"phone": "123-456-7890"
}'
```

```bash
curl https://bike-services-l2-b4-a8.vercel.app/api/services/status
```

## 🛠 Troubleshooting

### Database Migration Issues

If you encounter permission errors with Render.com:

```bash
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > migration.sql
```

Execute manually in Render.com's SQL Shell
