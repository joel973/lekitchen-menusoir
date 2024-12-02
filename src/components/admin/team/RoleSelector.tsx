import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface RoleSelectorProps {
  memberId: string;
  currentRole: string;
}

export function RoleSelector({ memberId, currentRole }: RoleSelectorProps) {
  const queryClient = useQueryClient();

  const updateRole = useMutation({
    mutationFn: async (newRole: string) => {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", memberId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Rôle mis à jour avec succès");
    },
    onError: (error) => {
      console.error("Error updating role:", error);
      toast.error("Erreur lors de la mise à jour du rôle");
    },
  });

  return (
    <Select
      defaultValue={currentRole}
      onValueChange={(value) => updateRole.mutate(value)}
    >
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="member">Membre</SelectItem>
      </SelectContent>
    </Select>
  );
}