import { BasicArticleFields } from "./fields/BasicArticleFields";
import { CategorySelect } from "./fields/CategorySelect";
import { StatusSelect } from "./fields/StatusSelect";
import { AllergenesCheckboxes } from "./fields/AllergenesCheckboxes";
import { LabelsCheckboxes } from "./fields/LabelsCheckboxes";
import { ImageUpload } from "./fields/ImageUpload";
import { Card } from "@/components/ui/card";

export function ArticleFormFields() {
  return (
    <div className="grid gap-6">
      <Card className="p-4 md:p-6">
        <div className="space-y-6">
          <BasicArticleFields />
          <CategorySelect />
          <StatusSelect />
          <AllergenesCheckboxes />
          <LabelsCheckboxes />
          <ImageUpload />
        </div>
      </Card>
    </div>
  );
}