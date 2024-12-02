import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  actions,
  className,
  ...props
}: AdminPageHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <div 
      className={cn(
        "flex flex-col gap-4",
        isMobile ? "p-4 pb-2" : "p-4 md:gap-8 md:p-6",
        className
      )} 
      {...props}
    >
      <div className={cn(
        "flex flex-col gap-4",
        !isMobile && "flex-row items-center justify-between"
      )}>
        <div className="space-y-1">
          <h1 className={cn(
            "font-bold",
            isMobile ? "text-lg" : "text-xl md:text-2xl"
          )}>{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground md:text-base">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className={cn(
            "flex",
            isMobile ? "w-full" : "flex-shrink-0"
          )}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}