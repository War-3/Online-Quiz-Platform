# Online Quiz Platform

## Overview
The Online Quiz Platform is a web application designed to allow users to create, participate in, and analyze quizzes effectively. The platform provides an engaging way for users to test their knowledge across various topics while offering quiz creators a seamless experience for setting up and managing quizzes.

## Features
- **User Authentication**: Secure registration and login system using JWT authentication.
<!-- - **Quiz Creation**: Users can create quizzes by adding questions, multiple-choice options, and correct answers. -->
- **Quiz Participation**: Users can attempt quizzes and receive immediate feedback upon completion.
- **Automatic Scoring**: The platform calculates and displays scores instantly after quiz completion.
- **Quiz Categorization**: Quizzes are organized into categories for easy accessibility.
- **Data Storage**: MongoDB schemas store user details, quizzes, questions, and scores.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Frontend**: React.js (if applicable)
- **Deployment**: (Specify if hosted on a cloud provider or platform like Heroku, Vercel, or AWS)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (latest stable version)
- MongoDB (local or cloud-based instance)
- NPM or Yarn

### Steps to Run the Application
1. Clone the repository:
   ```sh
   git clone https://github.com/War-3/Online-Quiz-Platform.git
   cd online-quiz-platform
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
4. Start the server:
   ```sh
   npm run dev
   npm start
   ```

## Usage
1. **Sign up/Login** to access the platform.
2. **Take a Quiz** and receive instant results.
3. **View Scores** and analyze quiz performance.

## Contributing
Contributions are welcome! To contribute:
- Fork the repository
- Create a feature branch (`git checkout -b feature-name`)
- Commit your changes (`git commit -m 'Add feature'`)
- Push to your branch (`git push origin feature-name`)
- Open a pull request

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For inquiries, reach out via [onyekweluwalter@gmail.com].


