import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Déconnexion réussie");
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  if (!session?.user) return null;

  return (
    <div className="flex items-center justify-between p-4 border-t">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={session.user.user_metadata?.avatar_url} />
          <AvatarFallback>
            {session.user.email?.[0]?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {session.user.email}
          </span>
          <span className="text-xs text-muted-foreground">
            Administrateur
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleLogout}
        className="text-red-600 hover:text-red-800 hover:bg-red-100"
      >
        <LogOut className="h-4 w-4" />
        <span className="sr-only">Se déconnecter</span>
      </Button>
    </div>
  );
}