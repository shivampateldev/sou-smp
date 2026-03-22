import { useState } from "react";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookOpen, Send, Loader2, X, ShieldCheck, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function WriteBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Verification states
  const [isVerified, setIsVerified] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [authorData, setAuthorData] = useState<any>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setVerifyError(null);

    try {
      const userRef = doc(db, "users", verifyEmail.toLowerCase());
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.password === verifyPassword) {
          setAuthorData(data);
          setIsVerified(true);
          toast({
            title: "Verification Successful",
            description: `Welcome, ${data.name}! You can now write your blog.`,
          });
        } else {
          setVerifyError("Incorrect password.");
        }
      } else {
        setVerifyError("User not found in authorized database.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerifyError("An error occurred during verification.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast({
        title: "Error",
        description: "Please provide both a title and content for your blog.",
        variant: "destructive",
      });
      return;
    }

    if (!authorData) {
      toast({
        title: "Session Expired",
        description: "Please verify your identity again.",
        variant: "destructive",
      });
      setIsVerified(false);
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        author_name: authorData.name, // Fetched from DB
        author_email: authorData.email,
        created_at: serverTimestamp(),
      });

      toast({
        title: "Success",
        description: "Your blog post has been published successfully!",
      });
      navigate("/blogs");
    } catch (error) {
      console.error("Error saving blog:", error);
      toast({
        title: "Submission Failed",
        description: "An error occurred while publishing your blog.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVerified) {
    return (
      <PageLayout>
        <main className="flex items-center justify-center pt-32 pb-16 px-4">
          <div className="w-full max-w-md bg-white dark:bg-[#111] rounded-2xl border border-border/40 shadow-xl p-8">
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="h-16 w-16 bg-[#00629B]/10 rounded-full flex items-center justify-center mb-4 border border-[#00629B]/20">
                <ShieldCheck className="w-8 h-8 text-[#00629B]" />
              </div>
              <h1 className="text-2xl font-bold">Author Verification</h1>
              <p className="text-muted-foreground text-sm mt-2">
                Enter your authorized credentials to access the blog editor.
              </p>
            </div>

            {verifyError && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{verifyError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="name@ieee.org"
                    className="pl-10"
                    value={verifyEmail}
                    onChange={(e) => setVerifyEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#00629B]" disabled={isVerifying}>
                {isVerifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify & Continue"}
              </Button>
              
              <Button type="button" variant="ghost" className="w-full" onClick={() => navigate("/blogs")}>
                Cancel
              </Button>
            </form>
          </div>
        </main>
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter>
      <main className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Write a New Blog</h1>
            <p className="text-muted-foreground mt-1">Share your knowledge with the IEEE SOU SB community.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => navigate("/blogs")} disabled={isSubmitting}>
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button 
              className="bg-[#00629B] hover:bg-[#004f7c]" 
              onClick={handleSubmit} 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Publish
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111] rounded-2xl border border-border/40 shadow-sm p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold ml-1">Blog Title</label>
            <Input
              placeholder="Give your article a catchy title..."
              className="text-2xl h-14 font-bold border-none bg-muted/20 focus-visible:ring-1 focus-visible:ring-[#00629B] rounded-xl"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-semibold ml-1">Content</label>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                {content.length} characters
              </span>
            </div>
            <Textarea
              placeholder="Start writing your masterpiece here..."
              className="min-h-[400px] text-lg leading-relaxed border-none bg-muted/20 focus-visible:ring-1 focus-visible:ring-[#00629B] rounded-xl resize-none p-6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {authorData && (
          <div className="mt-6 flex items-center justify-end gap-2 text-xs text-muted-foreground">
             <span>Posting as: </span>
             <span className="font-bold text-foreground">{authorData.name}</span>
             <span className="opacity-50">|</span>
             <span className="font-medium text-blue-600">{authorData.role}</span>
          </div>
        )}
      </main>
    </PageLayout>
  );
}
