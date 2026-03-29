import { useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Lock, Mail, ShieldAlert, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. Query users collection in Firestore
      const userRef = doc(db, 'users', email.toLowerCase());
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists() || userSnap.data().password !== password) {
        setError("Invalid email or password.");
        toast({
          title: "Access Denied",
          description: "Incorrect credentials. Make sure you are registered.",
          variant: "destructive",
        });
        return;
      }

      // 2. Reject Writers from Admin Panel
      const role = userSnap.data().role;
      if (role !== 'admin') {
        setError("Unauthorized access. Admin privileges required.");
        toast({
          title: "Access Denied",
          description: "Writers cannot access the Admin panel. Use 'Write a Blog' button on the frontend instead.",
          variant: "destructive",
        });
        return;
      }

      // 3. Authorized: Allow access
      console.log("Authentication successful, saving session...");
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userSnap.data().name || 'Admin'}!`,
      });
      
      localStorage.setItem("adminSession", email.toLowerCase());
      navigate("/ieee-admin-portal-sou-2025");
      
    } catch (error: any) {
      console.error("Authentication failed:", error);
      setError("Authentication failed. Please try again or check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0a0a0a]">
      {/* Background gradients and blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#00629B]/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#00629B]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-4 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-[#00629B]/20 rounded-full flex items-center justify-center mb-4 border border-[#00629B]/30 shadow-[0_0_15px_rgba(0,98,155,0.3)]">
            <Lock className="w-8 h-8 text-[#00629B]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Login</h2>
          <p className="text-slate-400 text-sm text-center">
            Sign in to your IEEE SOU SB account
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-950/50 border-red-900/50 text-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent transition-all duration-200"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShieldAlert className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00629B] focus:border-transparent transition-all duration-200"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#00629B] hover:bg-[#004f7c] text-white font-medium rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-[0_5px_15px_rgba(0,98,155,0.4)] active:translate-y-[0px] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} IEEE SOU Student Branch
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
