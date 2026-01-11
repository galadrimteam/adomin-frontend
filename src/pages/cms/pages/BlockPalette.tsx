import { Add } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { CmsConfig } from "../utils/cms.types";
import { CmsPageStore } from "./CmsPageStore";

interface Props {
  store: CmsPageStore;
  cmsConfig: CmsConfig;
}

export const BlockPalette = observer<Props>(({ store, cmsConfig }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        width: 280,
        height: "100vh",
        overflowY: "auto",
        p: 2,
        borderRadius: 0,
        borderLeft: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Blocs disponibles
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {cmsConfig.blocks.map((block) => (
          <Tooltip key={block.name} title={`Ajouter ${block.name}`} arrow>
            <Card
              variant="outlined"
              sx={{
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 3,
                  borderColor: "primary.main",
                },
              }}
            >
              <CardActionArea
                onClick={() => store.addBlock(block.name)}
                sx={{ p: 2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: "primary.light",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "primary.contrastText",
                    }}
                  >
                    <Add />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {block.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 0.5 }}
                    >
                      Cliquez pour ajouter
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Tooltip>
        ))}

        {cmsConfig.blocks.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            Aucun bloc disponible
          </Typography>
        )}
      </Box>
    </Paper>
  );
});

