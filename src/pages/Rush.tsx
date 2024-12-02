import { RushArticleList } from "@/components/rush/RushArticleList";
import { RushFilters } from "@/components/rush/RushFilters";
import { useState } from "react";

export default function Rush() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rush - Gestion rapide</h1>
          <p className="text-muted-foreground mt-1">
            Gérez rapidement la disponibilité et les labels de vos articles
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="border-b p-4">
          <RushFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="p-4">
          <RushArticleList
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
}