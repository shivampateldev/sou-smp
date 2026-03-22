import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/lib/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import InitialLoader from "@/components/InitialLoader";
import AIAssistant from "@/components/AIAssistant";
import { Button } from "@/components/ui/button";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";

// Main Pages
import Index from "./pages/Index";
import Events from "./pages/Events";
import Achievement from "./pages/Achievement";
import BranchAwards from "./pages/BranchAwards";
import Newsletter from "./pages/Newsletter";
import StudentAchievements from "./pages/StudentAchievements";
import UpcomingEvents from "./pages/UpcomingEvents";
import Contact from "./pages/Contact";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import BlogList from "./pages/blogs/BlogList";
import BlogDetail from "./pages/blogs/BlogDetail";
import WriteBlog from "./pages/blogs/WriteBlog";

// SIGs Pages
import SIGs from "./pages/SIGs";
import SIGDetails from "./pages/SIGDetails";

// About Pages
import IEEE from "./pages/about/IEEE";
import IEEESOUSSB from "./pages/about/IEEESOUSSB";
import IEEEOUSSBWIE from "./pages/about/IEEEOUSSBWIE";
import IEEESOUSPSSBC from "./pages/about/IEEESOUSPSSBC";
import IEEESOUSCSSBC from "./pages/about/IEEESOUSCSSBC";
import IEEESOUSSIGHTSBG from "./pages/about/IEEESOUSSIGHTSBG";
import IEEESOUSSBJRNY from "./pages/about/IEEESOUSSBJRNY";
import IEEESOUSSBJRNYLoop from "./pages/about/IEEESOUSSBJRNYLoop";
import JourneyDetails from "./pages/about/JourneyDetails";

// Team Pages
import TeamFaculty from "./pages/team/TeamFaculty";
import TeamAdvisory from "./pages/team/TeamAdvisory";
import TeamExecutive from "./pages/team/TeamExecutive";
import TeamCore from "./pages/team/TeamCore";
import TeamMembers from "./pages/team/TeamMembers";

// Admin + Auth
import Admin from "./pages/Admin";
import Authentication from "./components/Authentication";
import ProtectedRoute from "./components/ProtectedRoute";

// Details Pages
import EventDetails from "./pages/EventDetails";
import AwardDetails from "./pages/AwardDetails";
import MemberDetails from "./pages/MemberDetails";
import Bylaws from "./pages/Bylaws";
import FAQ from "./pages/FAQ";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";

const queryClient = new QueryClient();

// Suppress React Router warnings
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
    return;
  }
  originalConsoleWarn.apply(console, args);
};

// Simple Error Boundary
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4 text-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
            <p className="mb-4">Please try refreshing the page.</p>
            <Button onClick={() => window.location.reload()}>Refresh Page</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <InitialLoader />
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <ScrollToTop />
              <ScrollRevealProvider />
              <ScrollProgressBar />
              <AIAssistant />
              <Routes>
                {/* Main Pages */}
                <Route path="/" element={<Index />} />
                <Route path="/events" element={<Events />} />
                <Route path="/achievement" element={<Achievement />} />
                <Route path="/achievement/branch-awards" element={<BranchAwards />} />
                <Route path="/achievement/newsletter" element={<Newsletter />} />
                <Route path="/achievement/student" element={<StudentAchievements />} />
                <Route path="/achievement/upcoming-events" element={<UpcomingEvents />} />
                <Route path="/achievements" element={<Navigate to="/achievement" replace />} />
                <Route path="/awards" element={<Navigate to="/achievement" replace />} />
                <Route path="/bylaws" element={<Bylaws />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/join" element={<Join />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blogs" element={<BlogList />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
                <Route path="/write-blog" element={<WriteBlog />} />

                {/* SIGs Pages */}
                <Route path="/sigs" element={<SIGs />} />
                <Route path="/sigs/:id" element={<SIGDetails />} />

                {/* About Pages */}
                <Route path="/about/ieee" element={<IEEE />} />
                <Route path="/about/ieee-sou-sb" element={<IEEESOUSSB />} />
                <Route path="/about/ieee-sou-wie-sb-ag" element={<IEEEOUSSBWIE />} />
                <Route path="/about/ieee-sou-sb-journey" element={<IEEESOUSSBJRNY />} />
                <Route path="/about/ieee-sou-sb-journey-loop" element={<IEEESOUSSBJRNYLoop />} />
                <Route path="/about/ieee-sou-sb-journey-loop/:id" element={<JourneyDetails />} />
                <Route path="/about/ieee-sou-sps-sbc" element={<IEEESOUSPSSBC />} />
                <Route path="/about/ieee-sou-cs-sbc" element={<IEEESOUSCSSBC />} />
                <Route path="/about/ieee-sou-sight-sbg" element={<IEEESOUSSIGHTSBG />} />

                {/* Team Pages */}
                <Route path="/team/faculty-advisor" element={<TeamFaculty />} />
                <Route path="/team/advisory-board" element={<TeamAdvisory />} />
                <Route path="/team/executive-members" element={<TeamExecutive />} />
                <Route path="/team/core-members" element={<TeamCore />} />
                <Route path="/team/members" element={<TeamMembers />} />

                {/* Auth & Admin Panel - Hidden Route (Only accessible via direct URL) */}
                <Route path="/authentication" element={<Authentication />} />
                <Route
                  path="/ieee-admin-portal-sou-2025"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />

                {/* Details Pages */}
                <Route path="/eventdetails/:id" element={<EventDetails />} />
                <Route path="/awarddetails/:id" element={<AwardDetails />} />
                <Route path="/memberdetails/:id" element={<MemberDetails />} />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
