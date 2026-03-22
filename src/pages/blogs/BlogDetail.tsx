import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { ArrowLeft, User, Calendar, Clock, Share2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";

interface Blog {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_email: string;
  created_at: any;
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() } as Blog);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="flex-grow flex items-center justify-center min-h-[60vh]">
          <div className="animate-pulse text-[#00629B] font-medium">Loading article...</div>
        </div>
      </PageLayout>
    );
  }

  if (!blog) {
    return (
      <PageLayout>
        <div className="flex-grow flex flex-col items-center justify-center p-4 min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          <Button asChild>
            <Link to="/blogs">Back to Blogs</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter>
      <main className="pb-16 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#00629B] mb-8 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </Link>

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-border/40">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#00629B] to-[#00a3ff] flex items-center justify-center text-white font-bold">
                  {blog.author_name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold">{blog.author_name}</p>
                  <p className="text-xs text-muted-foreground">Author</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground border-l border-border/40 pl-6 h-8">
                <Calendar className="h-4 w-4" />
                {formatDate(blog.created_at)}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground border-l border-border/40 pl-6 h-8">
                <Clock className="h-4 w-4" />
                {Math.ceil(blog.content.split(' ').length / 200)} min read
              </div>
            </div>
          </header>

          <div className="prose dark:prose-invert prose-blue max-w-none text-lg leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
            {blog.content}
          </div>

          <footer className="mt-16 pt-8 border-t border-border/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-sm font-medium text-muted-foreground">Share this article:</p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button variant="outline" asChild>
                 <Link to="/blogs">Read More Articles</Link>
              </Button>
            </div>
          </footer>
        </article>
      </main>
    </PageLayout>
  );
}
