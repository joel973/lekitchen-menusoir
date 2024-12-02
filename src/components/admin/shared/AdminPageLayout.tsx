import { AdminMainLayout } from "../layout/AdminMainLayout";
import { AdminPageHeader } from "../layout/AdminPageHeader";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  return (
    <AdminMainLayout>
      <AdminPageHeader 
        title={title}
        description={description}
        actions={actions}
        className="glass-card"
      />
      <div className="container py-6">
        <Card className="relative overflow-hidden glass-card animate-scale-in">
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="p-6">{children}</div>
          </ScrollArea>
        </Card>
      </div>
    </AdminMainLayout>
  );
}