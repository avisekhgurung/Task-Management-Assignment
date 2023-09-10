# ✍️ PERN Task Management APP with Authentication 🔐	

This is a Task Management App with authentication which is implemented using a PERN technologies (PostgreSQL, Express.js, React.js, Node.js). The application allows users to create, manage, and track their task while providing user authentication to secure the application.

![Alt Text](https://i.postimg.cc/9fqJPP64/Screenshot-617.png)

## Features

- **User signup**: Users can create an account by providing a unique username and password.
- **User login**: Registered users can log in to the application using their credentials.
- **TASK creation**: Users can create new TASKs by providing a title and description.
- **TASK listing**: Users can view a list of all their TASKs along with their status.
- **TASK updating**: Users can update the title, description, and status of existing TASKs.
- **TASK deletion**: Users can delete unwanted TASKs.
- **User logout**: Logged-in users can log out from the application.
  
## Installation

To run the PERN Todo App with Authentication locally, follow these steps:

1. Clone the repository:
  ```
   https://github.com/avisekhgurung/Task-Management-Assignment.git
  ```
3. Navigate to the project directory:
  ```
4. Install the server-side dependencies:
 ```
cd server
npm install
 ```
5. Install the client-side dependencies:
  ```
cd client
npm install
  ```
Before running server, sql query is provide in database.sql , 
please use those query to create db and tables otherwise it will give 500 error in all request

```
![Alt Text](https://i.postimg.cc/x8KdLZRs/Screenshot-624.png)


7. Start the server:
 ```
npm run server
 ```
Server is starting on port 5000

Connected to PostgreSQL successfully!

8. Start the client:
 ```
npm run client
 ```
9. Access the application by visiting http://localhost:5173 in your web browser.

