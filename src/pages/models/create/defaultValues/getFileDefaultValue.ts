import { ApiAttachment } from "../../../../components/form/files/FileInput";
import { FileStore } from "../../../../components/form/files/FileStore";
import { getFileUrl } from "../../../../utils/getFileUrl";
import { AdominFileFieldConfig } from "../../fields.types";

export const getFileDefaultValue = (
  fieldConfig: AdominFileFieldConfig,
  value?: ApiAttachment | null
) => {
  const store = new FileStore({
    maxWidth: fieldConfig.maxWidth,
    maxHeight: fieldConfig.maxHeight,
    quality: fieldConfig.quality,
    url: getFileUrl(value) ?? undefined,
    shouldResize: fieldConfig.isImage && fieldConfig.noResize !== true,
    inputOptions: {
      inputText: fieldConfig.label ?? "Upload file",
      isImage: fieldConfig.isImage,
    },
  });

  return store;
};
