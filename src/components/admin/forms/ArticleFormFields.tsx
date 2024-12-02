import { BasicArticleFields } from "./fields/BasicArticleFields";
import { CategorySelect } from "./fields/CategorySelect";
import { StatusSelect } from "./fields/StatusSelect";
import { AllergenesCheckboxes } from "./fields/AllergenesCheckboxes";
import { LabelsCheckboxes } from "./fields/LabelsCheckboxes";
import { SupplementsCheckboxes } from "./fields/SupplementsCheckboxes";
import { ImageUpload } from "./fields/ImageUpload";

export function ArticleFormFields() {
  return (
    <div className="space-y-8">
      <div className="grid gap-8">
        <BasicArticleFields />
        <div className="grid gap-8 sm:grid-cols-2">
          <CategorySelect />
          <StatusSelect />
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <AllergenesCheckboxes />
          <LabelsCheckboxes />
        </div>
        <SupplementsCheckboxes />
        <ImageUpload />
      </div>
    </div>
  );
}