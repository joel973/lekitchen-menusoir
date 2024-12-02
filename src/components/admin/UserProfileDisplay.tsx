import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
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

  const handleProfileClick = () => {
    navigate("/profile");
  };

  if (!session?.user) return null;

  return (
    <div className="flex flex-col gap-3 p-3">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="text-sm">
            {session.user.email?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium leading-none">
            {session.user.email}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-full"
          onClick={handleProfileClick}
        >
          <User className="mr-2 h-3.5 w-3.5" />
          Profil
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-3.5 w-3.5" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}