# Online Dairy Store

A full-stack web application for an online dairy store, built with React.js for the frontend and Node.js/Express for the backend.

## Features

- User Authentication (Login/Register)
- Product Catalog
- Shopping Cart
- Order Management
- Admin Dashboard
- Subscription Management
- Contact Information
- Responsive Design

## Tech Stack

### Frontend
- React.js
- Material-UI
- Context API for State Management
- React Router for Navigation

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Project Structure

```
├── client/                 # Frontend React application
│   ├── public/            # Public assets
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Context providers
│   │   ├── services/     # API services
│   │   └── theme/        # Material-UI theme
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── config/           # Configuration files
    ├── controllers/      # Route controllers
    ├── middleware/       # Custom middleware
    ├── models/          # Database models
    ├── routes/          # API routes
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Sarthak0722/WAD_Project.git
cd WAD_Project
```

2. Install Frontend Dependencies
```bash
cd client
npm install
```

3. Install Backend Dependencies
```bash
cd ../server
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Start the Backend Server
```bash
cd server
npm start
```

6. Start the Frontend Development Server
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Sarthak Kalyankar
- GitHub: [@Sarthak0722](https://github.com/Sarthak0722)
- Email: sarthakkalyankar0722@gmail.com 