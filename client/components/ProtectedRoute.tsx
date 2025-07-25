import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Login from "@/pages/Login";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  try {
    const { user, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!user) {
      return <Login />;
    }

    return <>{children}</>;
  } catch (error) {
    // If useAuth fails, show login page
    return <Login />;
  }
};

export default ProtectedRoute;
