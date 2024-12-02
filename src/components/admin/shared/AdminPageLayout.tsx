import { AdminMainLayout } from "../layout/AdminMainLayout";
import { AdminPageHeader } from "../layout/AdminPageHeader";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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

  return (
    <AdminMainLayout>
      <div className="flex flex-col gap-4">
        <AdminPageHeader 
          title={title}
          description={description}
          actions={actions}
          className={cn(
            "glass-card rounded-lg",
            isMobile ? "rounded-none" : ""
          )}
        />
        <Card className="relative overflow-hidden glass-card animate-scale-in border-0 shadow-none">
          <div className={cn(
            "p-6",
            isMobile && "p-4"
          )}>
            {children}
          </div>
        </Card>
      </div>
    </AdminMainLayout>
  );
}