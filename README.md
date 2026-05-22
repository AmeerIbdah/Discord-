# Discord Clone - Real-Time Chat App

A simple Discord-style chat application built with ReactJS, ExpressJS, Socket.io, MongoDB, Axios, and Pure CSS.

The project allows users to create an account, log in, join different chat channels, and send real-time messages. Messages are saved in MongoDB and displayed again when users return to the same channel.

---

## Project Overview

This project is a simplified version of Discord.  
It focuses on real-time communication, user authentication, channel-based messaging, and a clean user interface.

Users can:
- Register a new account
- Log in using their email and password
- Switch between different chat channels
- Send and receive messages in real time
- View old messages stored in the database
- Log out from the application

---

## Tech Stack

### Frontend
- ReactJS
- Axios
- Socket.io Client
- React Router DOM
- React Icons
- Pure CSS

### Backend
- Node.js
- ExpressJS
- Socket.io
- MongoDB
- Mongoose
- bcryptjs
- dotenv
- cors

---

## Features

- User registration
- User login
- Password hashing using bcryptjs
- Real-time chat using Socket.io
- Multiple chat channels
- Messages saved in MongoDB
- Old messages loaded when opening a channel
- Clean neon-style UI
- Responsive layout
- Logout functionality
- Pure CSS design without Tailwind or Bootstrap