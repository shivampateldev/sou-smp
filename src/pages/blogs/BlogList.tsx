import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";
import { Search, BookOpen, User, Calendar } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Input } from "@/components/ui/input";

interface Blog {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_email: string;
  created_at: any;
}

export default function BlogList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsRef = collection(db, "blogs");
        // Sort by created_at (descending), limit to latest 10
        const q = query(blogsRef, orderBy("created_at", "desc"), limit(10));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Blog[];

        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown Date";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <PageLayout showFooter>
      <main className="pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00629B] to-[#004f7c]">
              IEEE SOU SB Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Insights, updates, and technical articles from our community members.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by title or author..."
                className="pl-10 h-11 rounded-xl border-white/20 bg-white/5 backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-semibold">{filteredBlogs.length}</span> blogs
              </div>
              <Button asChild size="sm" className="bg-[#00629B] hover:bg-[#004f7c]">
                <Link to="/write-blog">Write a Blog</Link>
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 rounded-2xl bg-muted/20 animate-pulse" />
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Link 
                  key={blog.id} 
                  to={`/blogs/${blog.id}`}
                  className="group flex flex-col h-full bg-white dark:bg-[#111] rounded-2xl border border-border/40 overflow-hidden hover:shadow-xl hover:border-[#00629B]/30 transition-all duration-300"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="px-2.5 py-0.5 rounded-full bg-[#00629B]/10 text-[#00629B] text-[10px] font-bold uppercase tracking-wider">
                        Article
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(blog.created_at)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#00629B] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                      {blog.content.substring(0, 180)}...
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-border/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00629B] to-[#00a3ff] flex items-center justify-center text-white text-xs font-bold">
                          {blog.author_name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">{blog.author_name}</span>
                      </div>
                      <div className="text-[#00629B] group-hover:translate-x-1 transition-transform">
                        <BookOpen className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/10 rounded-3xl border-2 border-dashed border-border/40">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground/40" />
              <h3 className="text-xl font-semibold text-muted-foreground">No blogs found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search terms or be the first to write a blog!</p>
              <Button asChild className="mt-6 bg-[#00629B]" variant="outline">
                <Link to="/write-blog">Write a Blog</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
}
