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

interface Column {
  key: string;
  title: string;
  render?: (value: any) => React.ReactNode;
}

interface DataListProps {
  columns: Column[];
  data: any[];
  actions?: (item: any) => React.ReactNode;
}

export function DataList({ columns, data, actions }: DataListProps) {
  return (
    <Card>
      <ScrollArea className="h-[calc(100vh-220px)]">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.title}</TableHead>
              ))}
              {actions && <TableHead className="w-[100px]">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render
                      ? column.render(item[column.key])
                      : item[column.key]}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell>{actions(item)}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
}