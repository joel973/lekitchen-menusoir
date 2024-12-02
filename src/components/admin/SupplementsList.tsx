import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface SupplementsListProps {
  supplements: any[];
  onEdit: (supplement: any) => void;
}

export function SupplementsList({ supplements, onEdit }: SupplementsListProps) {
  return (
    <div className="border rounded-lg overflow-hidden glass-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-secondary/50">
            <TableHead>Nom</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Articles liés</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supplements.map((supplement) => (
            <TableRow key={supplement.id} className="hover:bg-secondary/50 transition-colors">
              <TableCell className="font-medium">{supplement.nom}</TableCell>
              <TableCell>{supplement.description}</TableCell>
              <TableCell>{supplement.prix.toFixed(2)} €</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {supplement.articles_supplements?.map((as: any) => (
                    <span 
                      key={as.articles.id} 
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                    >
                      {as.articles.nom}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(supplement)}
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}