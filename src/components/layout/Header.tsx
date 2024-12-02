import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-transparent">
            <Menu className="h-6 w-6" />
          </Button>
          <a href="/" className="flex items-center space-x-2">
            <span className="font-display text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Le Kitchen Menu
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};