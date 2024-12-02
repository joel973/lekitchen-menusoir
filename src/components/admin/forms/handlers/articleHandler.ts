import { supabase } from "@/integrations/supabase/client";
import { type Toast } from "@/components/ui/use-toast";

export const createOrUpdateArticle = async (
  articleId: string | undefined, 
  articleData: any,
  toast: Toast
): Promise<string | null> => {
  if (articleId) {
    console.log("Updating existing article with ID:", articleId);
    const { data: updateData, error: updateError } = await supabase
      .from("articles")
      .update(articleData)
      .eq("id", articleId)
      .select();

    if (updateError) {
      console.error("Error updating article:", updateError);
      throw updateError;
    }
    console.log("Article updated successfully:", updateData);
    return articleId;
  } else {
    console.log("Creating new article");
    const { data: insertData, error: insertError } = await supabase
      .from("articles")
      .insert([articleData])
      .select()
      .single();

    if (insertError) {
      console.error("Error creating article:", insertError);
      throw insertError;
    }
    console.log("New article created with ID:", insertData.id);
    return insertData.id;
  }
};