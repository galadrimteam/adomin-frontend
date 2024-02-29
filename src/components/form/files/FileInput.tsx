import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { AdominFileFieldConfig } from "../../../pages/models/fields.types";
import { FileStore } from "./FileStore";

export interface ApiAttachment {
  url: string;
  name: string;
  extname: string;
  size: number;
  mimeType: string;
}

export interface FileInputProps {
  fileStore: FileStore;
  config?: AdominFileFieldConfig;
}

export const FileInput = observer(({ fileStore, config }: FileInputProps) => (
  <Box>
    {fileStore.inputOptions.isImage && fileStore.fileSrc !== null && (
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <img
          alt={"image to upload"}
          src={fileStore.fileSrc}
          style={{ maxWidth: "80%", marginBottom: 4 }}
        />
      </Box>
    )}
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Button variant="contained" component="label" sx={{ my: 2 }}>
        {fileStore.inputOptions.inputText}
        <input
          id="file-updloaded"
          type="file"
          hidden
          accept={fileStore.inputOptions.isImage ? "image/*" : undefined}
          onChange={(e) => fileStore.setUploadedFile(e.target)}
        />
      </Button>
      {(config?.nullable === true || config?.optional === true) && (
        <IconButton onClick={() => fileStore.setFileToBeDestroyed()}>
          <Delete />
        </IconButton>
      )}
      {fileStore.file !== null && (
        <span style={{ marginLeft: "12px" }}>({fileStore.file.name})</span>
      )}
    </Box>
  </Box>
));
