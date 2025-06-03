# Project Name

This is a boilerplate for an Express.js application with EJS templating, MongoDB database, and JSON Web Token (JWT) authentication, following the Model-View-Controller (MVC) architectural pattern.

## Features

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **EJS**: Embedded JavaScript templates for server-side rendering.
- **MongoDB**: NoSQL database for flexible data storage (with Mongoose ODM).
- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **MVC Pattern**: Organized project structure for better maintainability.
- **Bcrypt.js**: For secure password hashing.
- **Dotenv**: For managing environment variables.
- **Connect-Flash**: For displaying temporary messages (e.g., success/error).
- **Cookie-Parser**: To parse request cookies.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)
- MongoDB installed and running

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd project-name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Configuration

1.  **Create a `.env` file** in the root of your project:
    ```
    MONGO_URI=mongodb://localhost:27017/your_database_name
    JWT_SECRET=super_secret_jwt_key_that_is_very_long_and_complex
    PORT=3000
    SESSION_SECRET=a_very_secret_session_key
    ```
    -   Replace `your_database_name` with the desired name for your MongoDB database.
    -   Replace `super_secret_jwt_key_that_is_very_long_and_complex` with a strong, unique secret for JWT.
    -   Replace `a_very_secret_session_key` with a strong, unique secret for Express session.
    -   You can change the `PORT` if needed.

### Running the Application

1.  **Start the MongoDB server** (if not already running).
2.  **Run the application:**
    ```bash
    npm start
    ```
    For development with automatic restarts:
    ```bash
    npm run dev
    ```

The application will be accessible at `http://localhost:3000` (or your specified PORT).

## Project Structure

project-name/
├── app/
│   ├── controllers/   # Handles application logic and interacts with models/views
│   ├── models/        # Defines data structures and interacts with MongoDB
│   ├── routes/        # Defines API endpoints and connects to controllers
│   ├── views/         # EJS templates for rendering HTML
│   └── middlewares/   # Custom middleware functions (e.g., authentication)
├── config/            # Database connection and other configurations
├── public/            # Static assets (CSS, JS, images)
├── .env               # Environment variables
├── .gitignore         # Files/folders to ignore in Git
├── app.js             # Main application entry point
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation

## Usage

-   **Home Page**: `/`
-   **Register**: `/auth/register`
-   **Login**: `/auth/login`
-   **Logout**: `/auth/logout`
-   **Dashboard (Authenticated)**: `/dashboard`

---

## Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.