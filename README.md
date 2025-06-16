# 📝 Task Track – Full-Stack Kanban Board App

**Task Track** is a full-featured Kanban board web application built using the MERN stack and styled with Tailwind CSS. It features secure user authentication, intuitive task management, and a drag-and-drop interface for workflow visualization.

---

## 🚀 Tech Stack

| Layer       | Technology                    |
| ----------- | ----------------------------- |
| Frontend    | Next.js (React 19)            |
| Styling     | Tailwind CSS                  |
| Backend     | Node.js + Next.js API Routes  |
| Database    | MongoDB + Mongoose ORM        |
| Auth        | JWT + bcryptjs + cookies-next |
| Drag & Drop | @hello-pangea/dnd             |

---

## ⚙️ Project Setup Instructions

### 📦 1. Clone the repository

```bash
git clone https://github.com/yourusername/task-track.git
cd task-track
```

### 📚 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 🛠️ 3. Set up environment variables

Create a `.env` file at the root of the project with the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Make sure MongoDB is running locally or replace with your cloud MongoDB URI.

### ▶️ 4. Start the development server

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser.

---

## 📘 REST API Documentation

All API endpoints are available under `/api`.

### 🔐 Authentication

#### POST `/api/auth/signup`

**Description**: Register a new user

**Request Body**:

```json
{
  "name": "username",
  "email": "user@example.com",
  "password": "Password"
}
```

**Response**:

```json
{
  "token": "jwt-token"
}
```

#### POST `/api/auth/signin`

**Description**: Login with credentials

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "Password"
}
```

**Response**:

```json
{
  "token": "jwt-token"
}
```

### 📋 Tasks

All endpoints require a valid JWT token stored in cookies.

#### GET `/api/tasks`

**Description**: Get all tasks for the authenticated user

**Response**:

```json
[
  {
    "_id": "taskId",
    "title": "Task 1",
    "description": "Details",
    "status": "To Do",
    "dueDate": "2024-07-01T00:00:00Z"
  }
]
```

#### POST `/api/tasks`

**Description**: Create a new task

**Request Body**:

```json
{
  "title": "New Task",
  "description": "Task details",
  "dueDate": "2024-07-10"
}
```

#### PUT `/api/tasks/:id`

**Description**: Update a task (title, description, status, due date)

**Request Body**:

```json
{
  "status": "In Progress"
}
```

#### DELETE `/api/tasks/:id`

**Description**: Delete a task

#### PUT /api/tasks/:id

**Description**: update a task

**Request Body**:

```json
{
  "title": "Task name",
  "description": "Task details",
  "dueDate": "2024-07-10",
  "status": "status"
}
```
