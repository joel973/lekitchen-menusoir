import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

export function UserProfileDisplay() {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: profile } = useQuery({
    queryKey: ["profile", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (!profile) return null;

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-muted/50">
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
        <User className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="font-medium truncate">
          {profile.first_name} {profile.last_name}
        </div>
        <Badge variant={profile.role === "admin" ? "default" : "secondary"} className="mt-1">
          {profile.role === "admin" ? "Admin" : "Membre"}
        </Badge>
      </div>
    </div>
  );
}