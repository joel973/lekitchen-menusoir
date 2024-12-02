import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto px-4">
      <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="search"
        placeholder="Rechercher un plat..."
        className="pl-12"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};