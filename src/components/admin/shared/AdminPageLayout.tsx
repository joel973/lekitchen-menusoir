import { PageHeader } from "./PageHeader";
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
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-lg text-muted-foreground">{description}</p>
        )}
        {actions && <div className="mt-4 flex gap-2">{actions}</div>}
      </div>
      <Card className="flex-1">
        <ScrollArea className="h-[calc(100vh-220px)]">
          <div className="p-6">{children}</div>
        </ScrollArea>
      </Card>
    </div>
  );
}