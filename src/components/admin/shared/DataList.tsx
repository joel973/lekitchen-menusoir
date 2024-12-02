import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";

interface Column {
  key: string;
  title: string;
  render?: (value: any) => React.ReactNode;
  hideOnMobile?: boolean;
}

interface DataListProps {
  columns: Column[];
  data: any[];
  actions?: (item: any) => React.ReactNode;
}

export function DataList({ columns, data, actions }: DataListProps) {
  const isMobile = useIsMobile();
  const visibleColumns = isMobile 
    ? columns.filter(col => !col.hideOnMobile)
    : columns;

  return (
    <Card className="border-0 shadow-none">
      <ScrollArea className="h-[calc(100vh-220px)]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableHead 
                    key={column.key}
                    className={cn(
                      isMobile && "px-2 py-3 text-xs"
                    )}
                  >
                    {column.title}
                  </TableHead>
                ))}
                {actions && (
                  <TableHead className={cn(
                    "w-[100px]",
                    isMobile && "px-2 py-3"
                  )}>
                    Actions
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow 
                  key={index}
                  className={cn(
                    "hover:bg-secondary/50 transition-colors",
                    isMobile && "text-sm"
                  )}
                >
                  {visibleColumns.map((column) => (
                    <TableCell 
                      key={column.key}
                      className={cn(
                        isMobile && "px-2 py-3"
                      )}
                    >
                      {column.render
                        ? column.render(item[column.key])
                        : item[column.key]}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className={cn(
                      isMobile && "px-2 py-3"
                    )}>
                      {actions(item)}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </Card>
  );
}