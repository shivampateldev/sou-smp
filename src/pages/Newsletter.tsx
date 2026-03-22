import PageLayout from "@/components/PageLayout";
import { TypingAnimation } from "@/components/TypingAnimation";

export default function Newsletter() {
  return (
    <PageLayout showFooter>
      <main className="pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Newsletter</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <TypingAnimation text={"Stay updated with our latest news, events, and achievements."} />
            </p>
          </div>

          <div className="glass rounded-lg p-8 max-w-4xl mx-auto">
            <p className="text-center text-muted-foreground">
              Newsletter content coming soon...
            </p>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
