import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RoleSelector } from "./RoleSelector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Edit } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UpdateTeamMember } from "./UpdateTeamMember";
import { useState } from "react";
import { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface TeamMembersListProps {
  isAdmin: boolean;
  currentUserId?: string;
}

export function TeamMembersList({ isAdmin, currentUserId }: TeamMembersListProps) {
  const [selectedMember, setSelectedMember] = useState<Profile | null>(null);
  const queryClient = useQueryClient();

  const { data: members, isLoading } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("role", { ascending: false });

      if (error) {
        console.error("Error fetching team members:", error);
        throw error;
      }
      return data;
    },
  });

  const toggleActivationMutation = useMutation({
    mutationFn: async ({ userId, active }: { userId: string; active: boolean }) => {
      console.log("Toggling activation for user:", userId, "to:", active);
      const { error } = await supabase
        .from("profiles")
        .update({ active })
        .eq("id", userId);
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success(
        variables.active 
          ? "Membre réactivé avec succès" 
          : "Membre désactivé avec succès"
      );
    },
    onError: (error: any) => {
      console.error("Error toggling member activation:", error);
      toast.error("Erreur lors de la modification du statut du membre");
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const handleToggleActivation = (member: Profile) => {
    const newStatus = !member.active;
    const message = newStatus 
      ? "Êtes-vous sûr de vouloir réactiver ce membre ?" 
      : "Êtes-vous sûr de vouloir désactiver ce membre ?";

    if (window.confirm(message)) {
      toggleActivationMutation.mutate({ 
        userId: member.id, 
        active: newStatus 
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Membre</TableHead>
          <TableHead>Rôle</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members?.map((member) => (
          <TableRow 
            key={member.id}
            className={!member.active ? "opacity-50" : undefined}
          >
            <TableCell className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium">
                  {member.first_name} {member.last_name}
                </div>
                <div className="flex gap-2">
                  {member.id === currentUserId && (
                    <Badge variant="secondary">
                      Vous
                    </Badge>
                  )}
                  {!member.active && (
                    <Badge variant="destructive">
                      Désactivé
                    </Badge>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell>
              {isAdmin && member.id !== currentUserId ? (
                <RoleSelector memberId={member.id} currentRole={member.role} />
              ) : (
                <Badge variant={member.role === "admin" ? "default" : "secondary"}>
                  {member.role === "admin" ? "Admin" : "Membre"}
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {isAdmin && member.id !== currentUserId && (
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedMember(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Modifier le membre</DialogTitle>
                      </DialogHeader>
                      {selectedMember && <UpdateTeamMember member={selectedMember} />}
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleActivation(member)}
                  >
                    {member.active ? "Désactiver" : "Réactiver"}
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}