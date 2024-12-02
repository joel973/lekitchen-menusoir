import { BasicArticleFields } from "./fields/BasicArticleFields";
import { CategorySelect } from "./fields/CategorySelect";
import { StatusSelect } from "./fields/StatusSelect";
import { AllergenesCheckboxes } from "./fields/AllergenesCheckboxes";
import { LabelsCheckboxes } from "./fields/LabelsCheckboxes";
import { ImageUpload } from "./fields/ImageUpload";

export function ArticleFormFields() {
  return (
    <div className="grid gap-4">
      <BasicArticleFields />
      <CategorySelect />
      <StatusSelect />
      <AllergenesCheckboxes />
      <LabelsCheckboxes />
      <ImageUpload />
    </div>
  );
}