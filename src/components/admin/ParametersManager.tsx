import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomizationManager } from "./CustomizationManager";
import { AdminPageLayout } from "./shared/AdminPageLayout";

export function ParametersManager() {
  return (
    <AdminPageLayout 
      title="Paramètres" 
      description="Gérez les paramètres de votre application"
    >
      <CustomizationManager />
    </AdminPageLayout>
  );
}