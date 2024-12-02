import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Header = () => {
  const { data: parametres } = useQuery({
    queryKey: ["parametres"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parametres")
        .select("*")
        .single();

      if (error) throw error;
      return data;
    },
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <a href="/" className="flex items-center gap-3">
          {parametres?.use_logo && parametres?.logo_url ? (
            <img
              src={parametres.logo_url}
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          ) : (
            <span 
              className="font-display text-2xl font-bold tracking-tight"
              style={{ color: parametres?.header_text_color }}
            >
              {parametres?.header_text}
            </span>
          )}
        </a>
      </div>
    </header>
  );
}