import { Close } from "@mui/icons-material";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { JsonEditor } from "json-edit-react";
import { observer } from "mobx-react-lite";
import { CmsPageStore } from "./CmsPageStore";

interface Props {
  store: CmsPageStore;
}

export const BlockPropertiesPanel = observer<Props>(({ store }) => {
  if (!store.blockIdToEdit || !store.blockPropsToEdit) {
    return null;
  }

  const block = store.page.config.blocks.find(
    ({ id }) => id === store.blockIdToEdit
  );

  return (
    <Paper
      elevation={2}
      sx={{
        width: 360,
        height: "100vh",
        overflowY: "auto",
        p: 3,
        borderRadius: 0,
        borderLeft: "1px solid",
        borderColor: "divider",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Propriétés du bloc
        </Typography>
        <Tooltip title="Fermer">
          <IconButton
            size="small"
            onClick={() => store.setBlockIdToEdit(null)}
          >
            <Close />
          </IconButton>
        </Tooltip>
      </Box>

      {block && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Type: {block.name}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          "& .json-editor-react": {
            backgroundColor: "transparent",
          },
        }}
      >
        <JsonEditor
          data={store.blockPropsToEdit}
          onUpdate={({ newData }) => {
            store.updateBlockProps(newData as object);
          }}
          restrictDelete={({ key }) => key === "gridIdentifier"}
        />
      </Box>
    </Paper>
  );
});

