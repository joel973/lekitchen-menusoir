import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  active?: boolean;
}

const demoCategories: Category[] = [
  { id: "1", name: "Populaires", active: true },
  { id: "2", name: "Burgers" },
  { id: "3", name: "Menus" },
  { id: "4", name: "Snacks" },
  { id: "5", name: "Boissons" },
];

export const CategoryNav = () => {
  return (
    <ScrollArea className="w-full whitespace-nowrap bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-16 z-40 border-b fade-in">
      <div className="flex w-max space-x-2 p-4">
        {demoCategories.map((category) => (
          <button
            key={category.id}
            className={cn(
              "menu-transition inline-flex items-center rounded-full px-6 py-2 text-sm font-medium tracking-tight transition-colors",
              category.active
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/80 hover:bg-secondary"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="opacity-0" />
    </ScrollArea>
  );
};