Getting Started
Follow these steps to run the project locally.

1. Backend Setup

- Clone the backend repository: git clone https://github.com/MatLan8/PackagesBack
- Open the backend project in your preferred IDE and run it.
- Make sure the backend server is running before starting the frontend.

2. Frontend Setup

- Clone this frontend repository: git clone https://github.com/MatLan8/PackagesFront
- Navigate to the frontend folder: cd packagesfront
- Install dependencies: npm install

- Configure environment variables:

1. Copy the example environment file: cp .env.local_example .env.local
2. Open .env.local and update the VITE_BASE_URL variable to point to your running backend API. For example: VITE_BASE_URL=https://localhost:7293/api
   (Replace 7293 with the port your backend is using.)

- Start the frontend development server: npm run dev
- Open your browser and navigate to the URL shown in the terminal.
