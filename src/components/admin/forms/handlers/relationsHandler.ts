import { supabase } from "@/integrations/supabase/client";
import { Toast } from "@/components/ui/use-toast";
import { ArticleFormValues } from "../types";

export const updateArticleRelations = async (
  articleId: string,
  values: ArticleFormValues,
  toast: Toast
) => {
  console.log("=== Updating relations ===");
  await updateAllergenes(articleId, values.allergenes);
  await updateLabels(articleId, values.labels);
};

const updateAllergenes = async (articleId: string, allergenes: string[]) => {
  console.log("Updating allergenes for article:", articleId);
  console.log("Selected allergenes:", allergenes);
  
  const { error: deleteAllergensError } = await supabase
    .from("articles_allergenes")
    .delete()
    .eq("article_id", articleId);

  if (deleteAllergensError) {
    console.error("Error deleting existing allergens:", deleteAllergensError);
    throw deleteAllergensError;
  }

  if (allergenes.length > 0) {
    const allergeneRelations = allergenes.map((allergeneId) => ({
      article_id: articleId,
      allergene_id: allergeneId,
    }));

    console.log("Inserting allergen relations:", allergeneRelations);
    const { error: allergenesError } = await supabase
      .from("articles_allergenes")
      .insert(allergeneRelations);

    if (allergenesError) {
      console.error("Error updating allergenes:", allergenesError);
      throw allergenesError;
    }
    console.log("Allergenes relations updated successfully");
  }
};

const updateLabels = async (articleId: string, labels: string[]) => {
  console.log("Updating labels for article:", articleId);
  console.log("Selected labels:", labels);
  
  const { error: deleteLabelsError } = await supabase
    .from("articles_labels")
    .delete()
    .eq("article_id", articleId);

  if (deleteLabelsError) {
    console.error("Error deleting existing labels:", deleteLabelsError);
    throw deleteLabelsError;
  }

  if (labels.length > 0) {
    const labelRelations = labels.map((labelId) => ({
      article_id: articleId,
      label_id: labelId,
    }));

    console.log("Inserting label relations:", labelRelations);
    const { error: labelsError } = await supabase
      .from("articles_labels")
      .insert(labelRelations);

    if (labelsError) {
      console.error("Error updating labels:", labelsError);
      throw labelsError;
    }
    console.log("Labels relations updated successfully");
  }
};