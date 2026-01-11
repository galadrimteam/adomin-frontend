import { Edit } from "@mui/icons-material";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { CheckboxWrapper } from "../../../components/form/CheckboxRhf";
import { TextFieldWrapper } from "../../../components/form/TextFieldRhf";
import { BasicSelect } from "../../../components/form/selects/BasicSelect";
import { CmsPageStore } from "./CmsPageStore";

interface Props {
  store: CmsPageStore;
}

export const PageMetadataSidebar = observer<Props>(({ store }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        width: 320,
        height: "100vh",
        overflowY: "auto",
        p: 3,
        borderRadius: 0,
        borderRight: "1px solid",
        borderColor: "divider",
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
      </Box>
    </Paper>
  );
});

