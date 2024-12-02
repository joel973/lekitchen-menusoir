import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function PageHeader({ 
  title, 
  description, 
  children, 
  className,
  ...props 
}: PageHeaderProps) {
  return (
    <div 
      className={cn("flex flex-col gap-4 p-4 md:gap-8 md:p-6", className)} 
      {...props}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}