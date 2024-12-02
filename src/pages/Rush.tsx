import { RushArticleList } from "@/components/rush/RushArticleList";
import { RushFilters } from "@/components/rush/RushFilters";
import { useState } from "react";
import { AdminPageLayout } from "@/components/admin/shared/AdminPageLayout";

export default function Rush() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedLabel, setSelectedLabel] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AdminPageLayout
      title="Rush - Gestion rapide"
      description="Gérez rapidement vos articles et leur visibilité"
    >
      <div className="space-y-6">
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
    </AdminPageLayout>
  );
}