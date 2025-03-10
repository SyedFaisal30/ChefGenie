# 🧞‍♂️ Chef Genie

Chef Genie is a comprehensive recipe platform where users can discover, generate, and share culinary creations. The application offers three primary ways to access recipes:

1. 🤖 AI-generated recipes using Google's Generative AI
2. 🔍 External recipe search via MealFinder API
3. 👨‍🍳 Community-contributed recipes from other users


## ✨ Features

- **🔐 User Authentication**: Secure signup, login, and password recovery
- **🧠 AI Recipe Generation**: Get creative recipe suggestions based on ingredients or cuisine preferences
- **🔎 Recipe Search**: Find recipes from external databases using the MealFinder API
- **📝 Recipe Sharing**: Contribute your own recipes to the community
- **👤 User Profiles**: Manage your contributed recipes and favorites
- **📱 Responsive Design**: Optimized for both desktop and mobile experiences

## 🛠️ Tech Stack

### Backend (MERN Stack)
- **🟢 Node.js** & **⚡ Express.js**: Server and API framework
- **🍃 MongoDB**: Database for storing user data and recipes
- **🔌 Mongoose**: MongoDB object modeling
- **🔑 JWT**: Authentication and authorization
- **🔒 BCrypt**: Password hashing and security
- **📧 Nodemailer**: Email services for account verification and password reset
- **🤖 Google Generative AI**: For AI-powered recipe generation
- **✅ Zod**: Schema validation

### Frontend
- **⚛️ React 19**: UI library
- **🧭 React Router v7**: Navigation and routing
- **📋 React Hook Form**: Form handling with validation
- **🎨 Tailwind CSS v4**: Styling and responsive design
- **✨ Framer Motion**: Animations and transitions
- **🔔 React Toastify**: Notification system
- **📡 Axios**: HTTP client for API requests

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/chef-genie.git
   cd chef-genie
   ```

2. Navigate to the backend directory
   ```bash
   cd backend
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Set up environment variables (see [Environment Variables](#environment-variables) section)

5. Start the server
   ```bash
   # Development mode with hot reload
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory
   ```bash
   cd frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with required variables

4. Start the development server
   ```bash
   npm run dev
   ```

5. For production build
   ```bash
   npm run build
   ```

## 🔐 Environment Variables

### Backend
Create a `.env` file in the backend directory with the following variables:

```
PORT=8000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chefgenie
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
RESET_PASSWORD_TOKEN_SECRET=your-reset-password-secret
NODE_ENV=development
GEMINI_API_KEY=your-gemini-api-key
```

### Frontend
Create a `.env` file in the frontend directory:

```
VITE_SERVER_URL=http://localhost:8000



## 🤝 Contributing

We welcome contributions to Chef Genie! Users can contribute in several ways:

1. **🐛 Submit Bug Reports**: If you find any issues, please open an issue on GitHub.
2. **💡 Feature Requests**: Have ideas for new features? We'd love to hear them!
3. **💻 Code Contributions**: 
   - Fork the repository
   - Create a new branch (`git checkout -b feature/amazing-feature`)
   - Make your changes
   - Commit your changes (`git commit -m 'Add some amazing feature'`)
   - Push to the branch (`git push origin feature/amazing-feature`)
   - Open a Pull Request

4. **🍲 Recipe Contributions**: 
   - Register on the platform
   - Navigate to "Add Recipe" section
   - Fill in the recipe details and submit

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.