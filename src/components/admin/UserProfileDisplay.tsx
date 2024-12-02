import { useNavigate } from "react-router-dom";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

export function UserProfileDisplay() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Erreur lors de la déconnexion");
    } else {
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-4 p-4 border-t">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>
            {user.email?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-none truncate">
            {user.email}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleProfileClick}
        >
          <User className="w-4 h-4 mr-2" />
          Profil
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}