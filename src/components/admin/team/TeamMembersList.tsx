import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RoleSelector } from "./RoleSelector";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface TeamMembersListProps {
  isAdmin: boolean;
  currentUserId?: string;
}

export function TeamMembersList({ isAdmin, currentUserId }: TeamMembersListProps) {
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

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Membre</TableHead>
          <TableHead>Rôle</TableHead>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}