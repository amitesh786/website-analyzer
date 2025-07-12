# Website Analyzer

A full-stack web application that analyzes webpages for structure, broken links, and login forms, providing insights like HTML version, heading structure, and link classifications.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Demo](#demo)
- [Authentication](#authentication)
- [Linting and Formatting](#linting-and-formatting)
- [Testing Instructions](#testing-instructions)
- [API Endpoints](#api-endpoints)
- [Example Requests](#example-requests)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [Author](#author)

## Features

- Add website URLs and control crawl (start/stop)
- Detect HTML version and title
- Count headings (H1–H6)
- Detect internal/external/broken links with status codes
- Identify login forms on pages
- View detailed reports with charts
- Real-time crawl progress (queued, running, done/error)
- Bulk actions (re-analyze, delete)

## Technologies Used

### Frontend
- **Framework**: React 18 (with React Router DOM 6)
- **Language**: TypeScript 4.9
- **UI Library**: Ant Design 5
- **Charting**: Highcharts with `highcharts-react-official` support
- **HTTP Client**: Axios
- **Search/Filtering**: Fuse.js (for fuzzy searching)
- **Testing**: Jest, React Testing Library, `ts-jest`

### Backend
- **Language**: Go 1.24.4
- **HTTP Server**: `net/http`
- **Parsing**: HTML tokenizer
- **Authentication**: JWT-based authorization

### Middleware & Communication
- **Auth**: JWT Bearer Token
- **Middleware**: CORS support
- **API Protocol**: REST with JSON

### Database
- **Database**: MySQL

### Dev & Deployment
- **Containerization**: Docker, Docker Compose
- **CI/Testing Tools**: Babel, Jest, ts-node
- **Linting**: ESLint + Prettier

## Prerequisites

- Go 1.24.4
- Node.js 20.18.1
- npm 10.8.2

## Setup Instructions

1. **Clone the repository**

    ```sh
    git clone https://github.com/amitesh786/website-url-analyzer.git
    cd website-url-analyzer
    ```
2. **Backend Setup (Golang)**

    ```sh
    cd backend
    go mod download (Downloads dependencies)
    go mod tidy (Cleans up and syncs dependencies)
    go run main.go (Runs Go app)
    ```

    Server runs at `http://localhost:8080`.

3. **Frontend Setup (React + TypeScript)**

    ```sh
    cd ../frontend
    npm install (if receive some error on dependency, try using "npm install --legacy-peer-deps")
    npm start
    ```

    Frontend run at `http://localhost:3000`.

4. **Environment Variables**
Create `.env` files if needed:

```markdown
#### `backend/.env`
    ```env
    DB_USER=db_user
    DB_PASSWORD=db_password
    DB_HOST=localhost
    DB_PORT=db_port
    DB_NAME=db_name
    AUTH_TOKEN=token
    ```

#### `frontend/.env`
    ```env
    REACT_APP_API_URL=http://localhost:8080
    REACT_AUTH_TOKEN=token
    ```
```

5. **Database (locally)**

    ### SQL Command
    - mysql -u root -p
    - CREATE DATABASE sykell_db;
    - CREATE USER 'sykell_user'@'localhost' IDENTIFIED BY '786@Kamal';
    - GRANT ALL PRIVILEGES ON sykell_db.* TO 'sykell_user'@'localhost';
    - FLUSH PRIVILEGES;

### Running the Application

* You can run the application using two different approaches based on your development or deployment preference:

    - Option 1: Dockerized Setup (Recommended for Production or Quick Start)
    
        - Run both frontend and backend using a single Docker command:
            ```sh
            docker-compose up --build
            ```
            This will:
                Spin up both services (frontend and backend)
                Handle environment variables and dependencies
                Run everything in isolated containers
        - Access:
            Frontend: `http://localhost:3000`
            Backend: `http://localhost:8080`
        **Note: Ideal for quick testing, deployment, or avoiding local setup issues.**

* Option 2: Run Frontend and Backend Separately (Recommended for Development)

    - You can also run the frontend and backend manually, giving you more flexibility during development.

        - Start Backend (Golang)
            ```sh
            cd backend
            go mod download
            go run main.go
            ```
        Backend will be available at: `http://localhost:8080`

        - Start Frontend (React + TypeScript)

            ```sh
            cd frontend
            npm install --legacy-peer-deps
            npm start
            ```
        Frontend will run at: `http://localhost:3000`
        **Note: Ideal for development with hot reloading, debugging, and component testing.**

    - Open your browser
        Navigate to `http://localhost:3000` in your web browser to use the application.

## Project Structure
-    website-url-analyzer/
-    ├── backend/
-    │   ├── main.go
-    │   ├── database/
-    │   ├── handlers/
-    │   ├── models/
-    │   ├── middlewares/
-    │   └── utils/
-    ├── frontend/
-    │   ├── src/
-    │   │   ├── components/
-    │   │   ├── context/
-    │   │   ├── hooks/
-    │   │   ├── pages/
-    │   │   ├── layout/
-    │   │   └── services/
-    │   ├── App.tsx
-    │   ├── index.tsx
-    └── README.md

## Demo
![Demo-1](./screenshots/demo/demo_1.gif)
![Demo-2](./screenshots/demo/demo_2.gif)
![Demo-3](./screenshots/demo/demo_3.gif)
![Demo-4](./screenshots/demo/demo_4.gif)
![Format Lint](./screenshots/test/Format_Lint.png)

## Authentication

* All API routes require a bearer token: 
    - Authorization: Bearer secure-token

Note: Update your frontend `fetch`/`axios` headers accordingly.

## Linting and Formatting

- To ensure consistent code style and catch issues early, added ESLint and Prettier.

### Lint the code

- Run ESLint to analyze TypeScript files for potential errors and style issues:

    ```sh
    npm run lint
    ```
 
### Format the code

    ```sh
    npm run format
    ```

## Testing Instructions

### Testing

- Run frontend unit tests:

    ```sh
    npm test
    ```

- Use Postman or cURL for API endpoint testing.

    List major endpoints:

    ```markdown
    ## API Endpoints

    | Endpoint           | Method | Description                        |
    |--------------------|--------|------------------------------------|
    | /start             | POST   | Start analyzing a URL              |
    | /stop              | POST   | Stop analyzing a URL               |
    | /results           | GET    | List all processed URLs            | 
    | /detail/{url}      | GET    | Detailed report of a URL           |
    | /delete            | DELETE | Delete all URLs or individual URL  |
    | /crawl-stats       | GET    | Crawl statistics for all processing|
    ```

## API Endpoints

### Start Processing URL

- **URL**: `/start`
- **Method**: `POST`
- **Headers**: 
  - `Authorization`: Bearer secure-token
  - `Content-Type`: application/json
- **Body**: 

    ```json
    {
      "url": "https://google.com"
    }
    ```

### Stop Processing URL

- **URL**: `/stop`
- **Method**: `POST`
- **Headers**: 
  - `Authorization`: Bearer secure-token
  - `Content-Type`: application/json
- **Body**: 

    ```json
    {
      "url": "https://google.com"
    }
    ```

### Get Results

- **URL**: `/results`
- **Method**: `GET`
- **Headers**: 
  - `Authorization`: Bearer secure-token
  - `Content-Type`: application/json

### Get Detail by URL

- **URL**: `/detail/{url}`
- **Method**: `GET`
- **Headers**: 
  - `Authorization`: Bearer secure-token
  - `Content-Type`: application/json

### Delete all URLs or individual URL

- **URL**: `/delete`
- **Method**: `DELETE`
- **Headers**: 
  - `Authorization`: Bearer secure-token
  - `Content-Type`: application/json
- **Body**: 

    ```json
    [{
        "url": "https://google.com"
    }, {
        "url": "https://example.com"
    }]
    ```

### Get Crawl Status

- **URL**: `/crawl-stats`
- **Method**: `GET`
- **Headers**: 
  - `Authorization`: Bearer secure-token
  - `Content-Type`: application/json

## Example Requests

    ```sh
    curl -X POST http://localhost:8080/start \
        -H "Authorization: Bearer secure-token" \
        -H "Content-Type: application/json" \
        -d '{"url": "https://google.com"}'

    curl -X POST http://localhost:8080/stop \
        -H "Authorization: Bearer secure-token" \
        -H "Content-Type: application/json" \
        -d '{"url": "https://google.com"}'

    curl -X GET http://localhost:8080/results \
        -H "Authorization: Bearer secure-token" \
        -H "Content-Type: application/json"

    curl -X GET http://localhost:8080/detail/https://google.com \
        -H "Authorization: Bearer secure-token" \
        -H "Content-Type: application/json"
    
    curl -X DELETE http://localhost:8080/delete \
        -H "Authorization: Bearer secure-token" \
        -H "Content-Type: application/json" \
        -d '[{"url": "https://google.com"}, {"url": "https://example.com"}]'

    curl -X GET http://localhost:8080/crawl-stats \
        -H "Authorization: Bearer secure-token" \
        -H "Content-Type: application/json"
    ```

## Future Improvements
- Add unit tests for backend (handlers, services)

## Contributing
- Pull requests welcome. For major changes, open an issue first to discuss what you'd like to change.

## Author
- Developed by Amitesh Singh | © 2025
- Feel free to contribute or suggest improvements!
