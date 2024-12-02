import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { ArticleGrid } from "@/components/menu/ArticleGrid";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CategoryNav />
        <ArticleGrid />
      </main>
    </div>
  );
};

export default Index;