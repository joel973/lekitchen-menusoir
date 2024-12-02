import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface UpdateTeamMemberProps {
  member: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

export function UpdateTeamMember({ member }: UpdateTeamMemberProps) {
  const [firstName, setFirstName] = useState(member.first_name || "");
  const [lastName, setLastName] = useState(member.last_name || "");
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
        })
        .eq("id", member.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Membre mis à jour avec succès");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la mise à jour du membre");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Input
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={updateMutation.isPending}>
        {updateMutation.isPending ? "Mise à jour..." : "Mettre à jour"}
      </Button>
    </form>
  );
}