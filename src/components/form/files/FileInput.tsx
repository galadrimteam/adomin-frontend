import { Box, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
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
}

export const FileInput = observer(({ fileStore }: FileInputProps) => (
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
      {fileStore.file !== null && (
        <span style={{ marginLeft: "12px" }}>({fileStore.file.name})</span>
      )}
    </Box>
  </Box>
));
