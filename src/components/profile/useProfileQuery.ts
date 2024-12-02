import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProfileQuery = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      console.log("Profile data:", data, "Error:", error);
      
      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
      
      return data || { first_name: "", last_name: "" };
    },
  });
};