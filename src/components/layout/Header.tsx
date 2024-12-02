import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
          <a href="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold tracking-tight">
              Le Kitchen
            </span>
          </a>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#menu" className="text-muted-foreground hover:text-foreground transition-colors">
            Menu
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};