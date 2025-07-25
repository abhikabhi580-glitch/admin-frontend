# Admin Dashboard Frontend

A beautiful, modern admin dashboard built with React, TypeScript, and Ant Design. This is a frontend-only application with mock data for demonstration purposes.

## 🎨 Features

- **Beautiful Ant Design UI** - Modern, responsive interface
- **Authentication System** - JWT token-based login with protected routes
- **Dashboard** - Statistics cards and data visualization
- **CRUD Operations** - Complete management for Characters, Pets, and Vehicles
- **Image Upload** - File upload with preview functionality
- **Mock Data** - Fully functional with simulated backend data
- **Responsive Design** - Works on all screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Demo Login

- **Email:** `admin@example.com`
- **Password:** `admin123`

## 📁 Project Structure

```
project-root/
├── client/                 # React frontend source
│   ├── components/         # Reusable UI components
│   ├── contexts/          # React context providers
│   ├── pages/             # Route components
│   ├── services/          # API service layer (mock data)
│   └── App.tsx            # Main app component
├── public/                # Static assets
├── package.json           # Dependencies and scripts
└── vite.config.ts         # Vite configuration
```

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Ant Design** - UI component library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS

## 🎯 Key Pages

1. **Login** - Authentication with form validation
2. **Dashboard** - Overview with statistics and charts
3. **Characters** - CRUD operations for game characters
4. **Pets** - Management for companion pets
5. **Vehicles** - Fleet management for game vehicles

## 🔧 Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run typecheck` - TypeScript type checking
- `npm run format.fix` - Format code with Prettier

## 📦 Deployment

This is a static React application that can be deployed to any static hosting service:

- **Netlify** - Drag and drop the `dist` folder
- **Vercel** - Connect your GitHub repository
- **GitHub Pages** - Upload build files
- **AWS S3** - Static website hosting

## 🎨 Customization

- **Colors** - Update theme in `client/App.tsx` ConfigProvider
- **Mock Data** - Modify data in `client/services/api.ts`
- **UI Components** - Customize Ant Design components
- **Routes** - Add new pages in `client/pages/` and update routing

## 📝 License

This project is for demonstration purposes. Feel free to use it as a starting point for your own admin dashboard!
