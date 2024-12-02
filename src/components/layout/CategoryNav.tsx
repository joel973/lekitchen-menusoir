import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  active?: boolean;
}

const demoCategories: Category[] = [
  { id: "1", name: "Entrées", active: true },
  { id: "2", name: "Plats" },
  { id: "3", name: "Desserts" },
  { id: "4", name: "Boissons" },
  { id: "5", name: "Vins" },
];

export const CategoryNav = () => {
  return (
    <ScrollArea className="w-full whitespace-nowrap border-b fade-in">
      <div className="flex w-max space-x-4 p-4">
        {demoCategories.map((category) => (
          <button
            key={category.id}
            className={cn(
              "menu-transition inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium",
              category.active
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};