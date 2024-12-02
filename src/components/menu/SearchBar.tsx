import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto px-4 fade-in">
      <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 menu-transition" />
      <Input
        type="search"
        placeholder="Rechercher un plat..."
        className="pl-12 bg-secondary/50 border-secondary hover:bg-secondary/70 focus:bg-background menu-transition"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};