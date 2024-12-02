import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { ArticleGrid } from "@/components/menu/ArticleGrid";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <ArticleGrid selectedCategory={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;