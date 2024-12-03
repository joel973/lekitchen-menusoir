import { AdminMainLayout } from "../layout/AdminMainLayout";
import { AdminPageHeader } from "../layout/AdminPageHeader";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface AdminPageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function AdminPageLayout({
  title,
  description,
  children,
  actions,
}: AdminPageLayoutProps) {
  const isMobile = useIsMobile();

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
    <AdminMainLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 md:p-6 space-y-4">
          <AdminPageHeader 
            title={title}
            description={description}
            actions={actions}
            className={cn(
              "glass-card rounded-lg",
              isMobile ? "rounded-none" : ""
            )}
          />
          <Card 
            className="relative overflow-hidden glass-card animate-scale-in border-0 shadow-none"
            style={{
              "--primary": parametres?.couleur_primaire || "#00B14F",
              "--secondary": parametres?.couleur_secondaire || "#1a1a1a",
            } as React.CSSProperties}
          >
            <div className="space-y-6 p-4 md:p-6 [&_input]:h-10 [&_select]:h-10 [&_textarea]:min-h-[100px]">
              {children}
            </div>
          </Card>
        </div>
      </div>
    </AdminMainLayout>
  );
}