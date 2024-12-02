import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { ArticleFormValues } from "./types";

export const useLoadExistingRelations = (
  articleId: string | undefined,
  setValue: UseFormSetValue<ArticleFormValues>
) => {
  useEffect(() => {
    const loadExistingRelations = async () => {
      if (articleId) {
        const [allergenesResult, labelsResult] = await Promise.all([
          supabase
            .from("articles_allergenes")
            .select("allergene_id")
            .eq("article_id", articleId),
          supabase
            .from("articles_labels")
            .select("label_id")
            .eq("article_id", articleId),
        ]);

        if (!allergenesResult.error && allergenesResult.data) {
          setValue(
            "allergenes",
            allergenesResult.data.map((item) => item.allergene_id)
          );
        }

        if (!labelsResult.error && labelsResult.data) {
          setValue(
            "labels",
            labelsResult.data.map((item) => item.label_id)
          );
        }
      }
    };

    loadExistingRelations();
  }, [articleId, setValue]);
};