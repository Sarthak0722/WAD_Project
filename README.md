# Online Dairy Store - Frontend

This is the frontend part of the Online Dairy Store application built with React.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

1. Clone the repository
2. Navigate to the client directory:
   ```bash
   cd client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   └── auth/         # Authentication related components
│   ├── pages/
│   │   └── auth/         # Authentication pages (Login, Register)
│   ├── services/         # API services
│   ├── theme/           # Material-UI theme configuration
│   ├── utils/           # Utility functions
│   ├── App.js
│   └── index.js
└── package.json
```

## Features Implemented

- User Authentication
  - Login page with email and password
  - Registration page with form validation
  - Role-based routing (Customer/Admin)
- Material-UI components for a modern look
- Form validation using Formik and Yup
- Responsive design

## Environment Variables

Create a `.env` file in the client directory with the following variables:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.