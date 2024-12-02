import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomizationManager } from "./CustomizationManager";

export function ParametersManager() {
  return (
    <div className="space-y-6">
      <CustomizationManager />
    </div>
  );
}