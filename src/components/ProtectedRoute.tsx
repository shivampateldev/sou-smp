import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { Navigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const userEmail = user.email!.trim().toLowerCase();
        let role = null;

        // Try direct doc fetch
        const userRef = doc(db, 'users', userEmail);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          role = userSnap.data().role;
        } else {
          // Fallback to query
          const q = query(collection(db, "users"), where("email", "==", userEmail));
          const qSnap = await getDocs(q);
          if (!qSnap.empty) {
            role = qSnap.docs[0].data().role;
          }
        }

        // ADMIN AUTHORIZATION CHECK
        // This strictly relies on the 'role' field in the 'users' Firestore collection.
        // The hardcoded email check has been removed for production-grade security.
        
        if (role === 'admin') {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          // Auto logout invalid role
          await auth.signOut();
        }
      } catch (error) {
        console.error("Error verifying admin session:", error);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
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