// components/ProtectedRoute.tsx
import { ReactNode, useEffect, useState } from "react";
import { db } from "../firebase"; // adjust if your path differs
import { Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      const activeSessionEmail = localStorage.getItem("adminSession");
      
      if (!activeSessionEmail) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, 'users', activeSessionEmail);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists() && userSnap.data().role === 'admin') {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          // Auto logout invalid session
          localStorage.removeItem("adminSession");
        }
      } catch (error) {
        console.error("Error verifying admin session:", error);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-white">Authorizing Access...</div>
      </div>
    );
  }

  // Redirect to login if not authorized
  return isAuthorized ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;