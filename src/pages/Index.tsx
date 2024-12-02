import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { ArticleGrid } from "@/components/menu/ArticleGrid";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <CategoryNav />
        <div className="py-8">
          <ArticleGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;