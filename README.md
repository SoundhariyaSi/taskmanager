# Task Manager Website

## Overview
The Task Manager Website is a powerful and intuitive web application designed to help users manage their tasks efficiently. Built with ReactJS and Firebase for user authentication, this application allows users to add, edit, update, and delete tasks, specify priority and category for each task, and mark tasks as completed. The application also features interactive login and logout pages for secure user access.

## Features
- **Add New Task**: Easily add new tasks by clicking the "Add" button.
- **Edit and Update Tasks**: Edit task details and update them as needed.
- **Delete Tasks**: Remove tasks that are no longer needed.
- **Mark as Completed**: Cross out tasks that have been completed.
- **Specify Priority and Category**: Assign priority levels and categories to each task for better organization.
- **User Authentication**: Secure login and logout functionality using Firebase.

## Technologies Used
- **ReactJS**: A JavaScript library for building user interfaces.
- **Firebase**: Used for user authentication and real-time database.
  ## Usage
**Login/Logout**: Use the login page to sign in and access your tasks. Use the logout button to sign out securely.
**Add Tasks**: Click the "Add" button to create a new task. Specify the task name, priority, and category.
**Edit Tasks**: Click on a task to edit its details and update it.
**Delete Tasks**: Click the delete icon next to a task to remove it.
**Mark as Completed**: Click on the checkbox next to a task to mark it as completed and cross it out.

## Installation
To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SoundhariyaSi/taskmanager.git

2. **Navigate to the project directory**:

bash
Copy code
cd task-manager-website

3.**Install the dependencies**:

bash
Copy code
npm install

4.**Set up Firebase**:

Create a Firebase project on the Firebase Console.
Enable Firebase Authentication and set up your authentication method.
Create a .env file in the root directory and add your Firebase configuration details:
makefile
Copy code
    apiKey: "AIzaSyD7AeHG23ytHG9qgazKDrF2qnzsWbIIHrY",
    authDomain: "task-management-app-44e32.firebaseapp.com",
    projectId: "task-management-app-44e32",
    storageBucket: "task-management-app-44e32.appspot.com",
    messagingSenderId: "477166431327",
    appId: "1:477166431327:web:435846f828df02ef093fea"

5.**Start the development server**:

bash
Copy code
npm start
The application will run on http://localhost:3000.


