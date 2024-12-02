import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableRowProps {
  item: any;
  onEdit: () => void;
}

export function SortableRow({ item, onEdit }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "move",
  };

  const isLabel = 'couleur' in item;

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell>
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="touch-none p-1 hover:bg-secondary rounded"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </button>
          {item.nom}
        </div>
      </TableCell>
      {isLabel ? (
        <TableCell>
          <div
            className="w-6 h-6 rounded"
            style={{ backgroundColor: item.couleur }}
          />
        </TableCell>
      ) : (
        <TableCell>{item.mode_affichage}</TableCell>
      )}
      <TableCell>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          Modifier
        </Button>
      </TableCell>
    </TableRow>
  );
}