import { ApiAttachment } from "../../../../components/form/files/FileInput";
import { FileStore } from "../../../../components/form/files/FileStore";
import { AdominFileFieldConfig } from "../../fields.types";

export const getFileDefaultValue = (
  fieldConfig: AdominFileFieldConfig,
  value?: ApiAttachment | null
) => {
  const store = new FileStore({
    maxWidth: fieldConfig.maxWidth,
    maxHeight: fieldConfig.maxHeight,
    quality: fieldConfig.quality,
    url: value?.url,
    shouldResize: fieldConfig.isImage && fieldConfig.noResize !== true,
    inputOptions: {
      inputText: fieldConfig.label ?? "Upload file",
      isImage: fieldConfig.isImage,
    },
  });

  return store;
};
