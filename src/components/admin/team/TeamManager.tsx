import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TeamMembersList } from "./TeamMembersList";
import { InviteTeamMember } from "./InviteTeamMember";
import { AdminPageLayout } from "../shared/AdminPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TeamManager() {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: currentUserProfile } = useQuery({
    queryKey: ["profile", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user?.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const isAdmin = currentUserProfile?.role === "admin";

  return (
    <AdminPageLayout 
      title="Gestion de l'équipe"
      description="Gérez les membres de votre équipe et leurs permissions"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Membres de l'équipe</CardTitle>
          </CardHeader>
          <CardContent>
            <TeamMembersList isAdmin={isAdmin} currentUserId={session?.user?.id} />
          </CardContent>
        </Card>

        {isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle>Inviter un nouveau membre</CardTitle>
            </CardHeader>
            <CardContent>
              <InviteTeamMember />
            </CardContent>
          </Card>
        )}
      </div>
    </AdminPageLayout>
  );
}