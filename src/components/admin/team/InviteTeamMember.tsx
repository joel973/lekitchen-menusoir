import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function InviteTeamMember() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/equipe`,
        },
      });

      if (error) throw error;

      toast.success("Invitation envoyée avec succès");
      setEmail("");
    } catch (error) {
      console.error("Error inviting member:", error);
      toast.error("Erreur lors de l'envoi de l'invitation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleInvite} className="flex gap-4">
      <Input
        type="email"
        placeholder="Email du nouveau membre"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Envoi..." : "Inviter"}
      </Button>
    </form>
  );
}