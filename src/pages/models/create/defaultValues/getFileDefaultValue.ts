import { ApiAttachment } from "../../../../components/form/files/FileInput";
import { FileStore } from "../../../../components/form/files/FileStore";
import { AdominFileFieldConfig } from "../../fields.types";

export const getFileDefaultValue = (
  fieldConfig: AdominFileFieldConfig,
  value?: ApiAttachment | null
) => {
  const store = new FileStore({
    url: value?.url,
    shouldResize: fieldConfig.isImage ?? false,
    inputOptions: {
      inputText: fieldConfig.label ?? "Upload file",
      imageParams: { imageAlt: fieldConfig.label ?? "Upload file" },
    },
  });

  return store;
};
