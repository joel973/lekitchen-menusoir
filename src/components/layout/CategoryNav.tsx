import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  active?: boolean;
}

const demoCategories: Category[] = [
  { id: "1", name: "LES PLUS POPULAIRES", active: true },
  { id: "2", name: "PRODUITS SEULS" },
  { id: "3", name: "MENUS" },
  { id: "4", name: "À PARTAGER" },
  { id: "5", name: "BOISSONS" },
];

export const CategoryNav = () => {
  return (
    <ScrollArea className="w-full whitespace-nowrap bg-background sticky top-16 z-40 border-b fade-in">
      <div className="flex w-max space-x-2 p-4">
        {demoCategories.map((category) => (
          <button
            key={category.id}
            className={cn(
              "menu-transition inline-flex items-center rounded-full px-6 py-2.5 text-sm font-bold",
              category.active
                ? "bg-[#00B14F] text-white"
                : "bg-gray-100 hover:bg-gray-200"
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