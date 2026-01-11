import { Close } from "@mui/icons-material";
import { Box, Drawer, IconButton, Tooltip, Typography } from "@mui/material";
import { JsonEditor } from "json-edit-react";
import { observer } from "mobx-react-lite";
import { CmsPageStore } from "./CmsPageStore";

interface Props {
  store: CmsPageStore;
}

export const BlockPropertiesPanel = observer<Props>(({ store }) => {
  const open = store.blockIdToEdit !== null && store.blockPropsToEdit !== null;

  const handleClose = () => {
    store.setBlockIdToEdit(null);
  };

  if (!store.blockIdToEdit || !store.blockPropsToEdit) {
    return null;
  }

  const block = store.page.config.blocks.find(
    ({ id }) => id === store.blockIdToEdit
  );

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 360,
          p: 3,
          height: "100%",
          overflowY: "auto",
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
    </Box>
    </Drawer>
  );
});

