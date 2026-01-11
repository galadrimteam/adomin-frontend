import { Edit } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import {
  numberToString,
  stringToNumber,
} from "../../../components/form/TextFieldRhfUtils";
import { CheckboxWrapper } from "../../../components/form/CheckboxRhf";
import { TextFieldWrapper } from "../../../components/form/TextFieldRhf";
import { BasicSelect } from "../../../components/form/selects/BasicSelect";
import { CmsPageStore } from "./CmsPageStore";

interface Props {
  store: CmsPageStore;
  open: boolean;
  onClose: () => void;
}

export const PageMetadataDrawer = observer<Props>(({ store, open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 360,
          p: 3,
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Paramètres de la page
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextFieldWrapper
            label="Titre (HTML title)"
            type="text"
            value={store.page.title}
            onChange={(v) => store.setStringField("title", v)}
          />

          <TextFieldWrapper
            label="URL"
            type="text"
            value={store.page.url}
            onChange={(v) => store.setStringField("url", v)}
          />

          <TextFieldWrapper
            label="Label interne"
            type="text"
            value={store.page.internal_label}
            onChange={(v) => store.setStringField("internal_label", v)}
          />

          <CheckboxWrapper
            label="Publié"
            value={store.page.is_published}
            onChange={(v) => store.setBooleanField("is_published", v)}
          />

          <Divider />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Layout
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
              <BasicSelect
                options={store.layoutOptions}
                label="Choisir un layout"
                value={store.page.config.layout?.name ?? ""}
                onChange={(v) => store.setLayout(v)}
              />
              {store.page.config.layout && (
                <IconButton
                  size="small"
                  onClick={() => store.setEditLayoutProps(true)}
                  sx={{ mt: 0.5 }}
                >
                  <Edit fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>

          <Divider />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Grille
            </Typography>
            <TextFieldWrapper
              type="number"
              label="Nombre de colonnes"
              value={store.gridStore.activeColumns}
              onChange={(v) => store.gridStore.setColumns(v)}
              stringToValue={stringToNumber}
              valueToString={numberToString}
            />
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
});

