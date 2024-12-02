import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RoleSelector } from "./RoleSelector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Trash2, Ban, Edit } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UpdateTeamMember } from "./UpdateTeamMember";
import { useState } from "react";

interface TeamMembersListProps {
  isAdmin: boolean;
  currentUserId?: string;
}

export function TeamMembersList({ isAdmin, currentUserId }: TeamMembersListProps) {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: members, isLoading } = useQuery({
    queryKey: ["team-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("role", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Membre supprimé avec succès");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la suppression du membre");
    },
  });

  const banMutation = useMutation({
    mutationFn: async ({ userId, isBanned }: { userId: string; isBanned: boolean }) => {
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        ban_duration: isBanned ? "none" : null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Statut du membre mis à jour");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erreur lors de la mise à jour du statut");
    },
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const handleDelete = (memberId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
      deleteMutation.mutate(memberId);
    }
  };

  const handleBanToggle = (memberId: string) => {
    banMutation.mutate({ userId: memberId, isBanned: false });
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
          <TableRow key={member.id}>
            <TableCell className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium">
                  {member.first_name} {member.last_name}
                </div>
                {member.id === currentUserId && (
                  <Badge variant="secondary" className="mt-1">
                    Vous
                  </Badge>
                )}
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
                      <UpdateTeamMember member={selectedMember} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleBanToggle(member.id)}
                  >
                    <Ban className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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