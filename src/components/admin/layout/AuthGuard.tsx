import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const { data: session, isError } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log("Session check result:", { session, error });
      
      if (error || !session) {
        throw new Error("No valid session");
      }
      
      return session;
    },
    retry: false,
  });

  useEffect(() => {
    if (isError || !session) {
      console.log("No valid session, redirecting to login");
      navigate("/login");
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", { event: _event, session });
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, session, isError]);

  if (!session) {
    console.log("No session, rendering null");
    return null;
  }

  return <>{children}</>;
}