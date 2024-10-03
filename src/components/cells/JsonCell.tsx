import { Clear } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { JsonEditor } from "json-edit-react";
import { MRT_ColumnDef } from "material-react-table";
import { useState } from "react";
import type { ModelData } from "../../pages/models/model.types";
import { SimpleModal } from "../SimpleModal";

export const JsonCell: MRT_ColumnDef<ModelData>["Cell"] = ({ cell }) => {
  const jsonValue = cell.getValue();
  const [open, setOpen] = useState(false);

  if (jsonValue === null) return <Clear />;

  return (
    <Box>
      <Button onClick={() => setOpen((o) => !o)}>Ouvrir</Button>
      <SimpleModal open={open} onClose={() => setOpen(false)} width={800}>
        <JsonEditor
          restrictEdit
          restrictAdd
          restrictDelete
          restrictDrag
          restrictTypeSelection
          data={jsonValue ?? {}}
        />
      </SimpleModal>
    </Box>
  );
};
