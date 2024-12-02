import { AdminMainLayout } from "../layout/AdminMainLayout";
import { AdminPageHeader } from "../layout/AdminPageHeader";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      <AdminPageHeader 
        title={title}
        description={description}
        actions={actions}
        className="glass-card rounded-lg mb-4"
      />
      <div className={cn("container", isMobile ? "p-0" : "py-6")}>
        <Card className="relative overflow-hidden glass-card animate-scale-in">
          <ScrollArea className={cn(
            "h-[calc(100vh-16rem)]",
            isMobile && "h-[calc(100vh-12rem)]"
          )}>
            <div className={cn(
              "p-6",
              isMobile && "p-4"
            )}>
              {children}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </AdminMainLayout>
  );
}