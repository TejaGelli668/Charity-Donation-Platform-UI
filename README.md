# Charity Donation Platform - Frontend (UI)

A user-friendly and accessible React-based platform designed to simplify and enhance the experience of charitable giving. This frontend serves as the main interface where users can explore and contribute to various charitable causes.

## 🌟 Features

### User Features
- **User Registration & Authentication**: Secure user registration and login system
- **Campaign Browsing**: Explore various charitable campaigns with detailed information
- **Campaign Creation**: Create and customize fundraising campaigns for charitable causes
- **Donation Management**: Make secure donations with multiple payment options
- **User Dashboard**: Personal dashboard to track donations and campaigns
- **Campaign Management**: View and manage created campaigns

### Admin Features
- **Admin Dashboard**: Comprehensive overview of platform activities
- **Campaign Approval**: Review and approve user-created campaigns
- **User Management**: Monitor user registrations and activities
- **Donation Monitoring**: Track all donation activities across the platform

## 🛠️ Technologies Used

- **React.js**: Frontend framework
- **React Router**: Client-side routing
- **Material-UI / CSS**: Styling and UI components
- **Axios**: HTTP client for API calls
- **React Context**: State management
- **JavaScript (ES6+)**: Programming language

## 📁 Project Structure

```
src/
├── admin/                  # Admin-specific components
│   ├── AccessDenied.js
│   ├── AdminCampaignsList.js
│   ├── AdminDashBoard.js
│   ├── AdminLogin.js
│   └── UsersList.js
├── api/                    # API integration
│   └── api.js
├── components/             # Reusable components
│   ├── CustomSnackbar.js
│   ├── PrivateRoute.js
│   ├── footer/
│   ├── header/
│   └── layout/
├── contexts/               # React Context providers
│   └── AuthContext.js
├── images/                 # Static images
├── pages/                  # Page components
│   ├── campaigns/          # Campaign-related pages
│   ├── home/              # Home and error pages
│   ├── login/             # Authentication pages
│   └── users/             # User-specific pages
├── App.js                 # Main App component
├── App.css               # Global styles
└── index.js              # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TejaGelli668/Charity-Donation-Platform-UI.git
   cd Charity-Donation-Platform-UI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add:
   ```env
   REACT_APP_API_BASE_URL=your_api_base_url
   REACT_APP_PAYMENT_GATEWAY_KEY=your_payment_gateway_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## 📜 Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App (one-way operation)

## 🌐 Deployment

### AWS Amplify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to AWS Amplify**
   - Navigate to AWS Amplify Console
   - Click "Create web app"
   - Upload the `build` folder
   - Configure domain settings
   - Deploy and access via provided URL

### Manual Deployment

1. Build the project using `npm run build`
2. Upload the `build` folder contents to your web server
3. Configure your web server to serve the React app
4. Ensure proper routing configuration for single-page application

## 🔐 Authentication

The platform implements secure authentication with:
- JWT token-based authentication
- Protected routes for authenticated users
- Role-based access control (User/Admin)
- Secure password handling

## 💳 Payment Integration

- Multiple payment method support
- Secure payment processing
- Donation tracking and receipts
- Refund management system

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- Various screen sizes and orientations

## 🎨 Styling

- Custom CSS for unique design elements
- Responsive grid system
- Consistent color scheme and typography
- Accessible design principles

## 🔧 Configuration

### API Integration
Update the API base URL in `src/api/api.js` to connect with your backend:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
```

### Route Configuration
Main routes are configured in `App.js`:
- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - User dashboard
- `/campaigns` - Campaign listing
- `/admin` - Admin panel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

## 🔮 Future Enhancements

- Real-time notifications
- Advanced campaign analytics
- Social media integration
- Mobile application
- Multi-language support
- Enhanced payment options

---

**Built with ❤️ for making charitable giving accessible to everyone**
