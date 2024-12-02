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
      <div className="p-4 md:p-6">
        <AdminPageHeader 
          title={title}
          description={description}
          actions={actions}
          className={cn(
            "glass-card rounded-lg",
            isMobile ? "rounded-none" : ""
          )}
        />
        <Card className="mt-4 relative overflow-hidden glass-card animate-scale-in border-0 shadow-none">
          <div className="space-y-6 p-4 md:p-6 [&_input]:h-10 [&_select]:h-10 [&_textarea]:min-h-[100px]">
            {children}
          </div>
        </Card>
      </div>
    </AdminMainLayout>
  );
}