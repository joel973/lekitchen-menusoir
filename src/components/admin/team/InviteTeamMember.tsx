import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function InviteTeamMember() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create the user in auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (signUpError) throw signUpError;

      // The profile will be created automatically by the trigger we set up
      toast.success("Membre ajouté avec succès");
      
      // Reset form
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      
      // Refresh the team members list
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    } catch (error: any) {
      console.error("Error adding member:", error);
      toast.error(error.message || "Erreur lors de l'ajout du membre");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAddMember} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Input
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Ajout en cours..." : "Ajouter le membre"}
      </Button>
    </form>
  );
}