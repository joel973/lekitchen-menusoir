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
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Articles liés</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supplements.map((supplement) => (
            <TableRow key={supplement.id}>
              <TableCell className="font-medium">{supplement.nom}</TableCell>
              <TableCell>{supplement.description}</TableCell>
              <TableCell>{supplement.prix.toFixed(2)} €</TableCell>
              <TableCell>
                {supplement.articles_supplements?.map((as: any) => (
                  <span key={as.articles.id} className="mr-2">
                    {as.articles.nom}
                  </span>
                ))}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(supplement)}
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