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
  console.log("AdminPageLayout rendering");

  return (
    <AdminMainLayout>
      <div className="flex flex-col flex-1">
        <AdminPageHeader 
          title={title}
          description={description}
          actions={actions}
          className={cn(
            "glass-card",
            isMobile ? "rounded-none" : "rounded-lg"
          )}
        />
        <Card className="m-4 glass-card border-0 shadow-none">
          {children}
        </Card>
      </div>
    </AdminMainLayout>
  );
}