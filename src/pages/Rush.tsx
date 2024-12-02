import { RushArticleList } from "@/components/rush/RushArticleList";
import { RushFilters } from "@/components/rush/RushFilters";
import { useState } from "react";

export default function Rush() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedLabel, setSelectedLabel] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold">Rush - Gestion rapide</h1>
          <p className="text-muted-foreground mt-1">
            Gérez rapidement la disponibilité et les labels de vos articles
          </p>
        </div>
      </div>

      <div className="p-6">
        <RushFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedLabel={selectedLabel}
          onLabelChange={setSelectedLabel}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      <div className="p-6 pt-0">
        <RushArticleList
          selectedCategory={selectedCategory}
          selectedLabel={selectedLabel}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}