import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function UserProfileDisplay() {
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erreur lors de la déconnexion");
    } else {
      navigate("/login");
    }
  };

  if (!profile) return null;

  return (
    <div className="space-y-2">
      <div 
        className="flex items-center gap-3 px-3 py-2 rounded-md bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
        onClick={() => navigate("/profile")}
      >
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
      <Button 
        variant="outline" 
        className="w-full justify-start" 
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Se déconnecter
      </Button>
    </div>
  );
}