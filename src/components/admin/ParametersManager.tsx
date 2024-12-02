import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomizationManager } from "./CustomizationManager";

export function ParametersManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">Paramètres</h1>
          <p className="text-muted-foreground mt-1">
            Gérez les paramètres de votre application
          </p>
        </div>
      </div>
      <CustomizationManager />
    </div>
  );
}