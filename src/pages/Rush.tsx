import { RushArticleList } from "@/components/rush/RushArticleList";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { RushFilters } from "@/components/rush/RushFilters";
import { useState } from "react";

export default function Rush() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">Rush - Gestion rapide</h1>
        <RushFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <RushArticleList
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />
      </div>
    </AdminLayout>
  );
}