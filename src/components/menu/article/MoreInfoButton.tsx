import { ChevronRight } from "lucide-react";

export const MoreInfoButton = () => {
  return (
    <button className="text-[10px] text-content-tertiary uppercase tracking-wider flex items-center gap-0.5 group-hover:text-content transition-colors">
      Plus d'infos
      <ChevronRight className="w-3 h-3" />
    </button>
  );
};