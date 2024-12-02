import { RushArticleList } from "@/components/rush/RushArticleList";
import { RushFilters } from "@/components/rush/RushFilters";
import { useState } from "react";

export default function Rush() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedLabel, setSelectedLabel] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Rush - Gestion rapide</h1>
      <div className="space-y-6 bg-white rounded-lg border p-6">
        <RushFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedLabel={selectedLabel}
          onLabelChange={setSelectedLabel}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <RushArticleList
          selectedCategory={selectedCategory}
          selectedLabel={selectedLabel}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}