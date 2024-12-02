import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ArticleSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function ArticleSearchBar({ searchQuery, setSearchQuery }: ArticleSearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Rechercher un article..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}