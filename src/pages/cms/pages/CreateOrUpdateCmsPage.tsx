import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import {
  Add,
  Settings,
} from "@mui/icons-material";
import {
  Button,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Fab,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ADOMIN_CMS_PAGES_PATH } from "../../../adominPaths";
import { notifyApiError } from "../../../errors/notifyApiError";
import { CmsConfig, CmsPage } from "../utils/cms.types";
import { CmsPageStore } from "./CmsPageStore";
import { EditLayoutPropsModal } from "./EditLayoutPropsModal";
import { PageMetadataDrawer } from "./PageMetadataSidebar";
import { BlockPaletteDrawer } from "./BlockPalette";
import { BlockPropertiesPanel } from "./BlockPropertiesPanel";
import { BlockToolbar } from "./BlockToolbar";
import { DndGrid } from "./dndUtils/DndGrid";
import { DndItem } from "./dndUtils/DndItem";
import { DndSortableItem } from "./dndUtils/DndSortableItem";
import { BlockResizeHandle } from "./dndUtils/BlockResizeHandle";
import { useSortBlocs } from "./dndUtils/useSortBlocs";
import { useCreateOrUpdatePage } from "./hooks/useCreateOrUpdatePage";

interface Props {
  cmsConfig: CmsConfig;
  page?: CmsPage;
}

export const CreateOrUpdateCmsPage = observer<Props>(({ page, cmsConfig }) => {
  const navigate = useNavigate();
  const updatePageMutation = useCreateOrUpdatePage(
    page ? "update" : "create",
    navigate
  );
  const store = useMemo(
    () => new CmsPageStore(cmsConfig, page),
    [cmsConfig, page]
  );

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [blockPaletteOpen, setBlockPaletteOpen] = useState(false);

  const { sensors, handleDragStart, handleDragMove, handleDragEnd, handleDragCancel } =
    useSortBlocs({ store });

  const handleSubmit = () => {
    if (typeof store.formDto === "string") {
      notifyApiError({ error: store.formDto });
      return;
    }

    updatePageMutation.mutate(store.formDto);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top App Bar */}
      <AppBar position="static" elevation={1} sx={{ bgcolor: "background.paper" }}>
        <Toolbar>
          
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Breakpoint:
              </Typography>
              <ToggleButtonGroup
                value={store.gridStore.activeGridLayoutKey}
                exclusive
                onChange={(_, value) => {
                  if (value !== null) {
                    store.gridStore.setActiveGridLayoutKey(value);
                  }
                }}
                size="small"
              >
                {store.gridStore.gridLayoutsOptions.map((option) => (
                  <ToggleButton key={option.value} value={option.value}>
                    {option.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            <IconButton onClick={() => setSettingsOpen(true)}>
              <Settings />
            </IconButton>
            <Link to={ADOMIN_CMS_PAGES_PATH}>
              <Button variant="outlined" size="small">
                Annuler
              </Button>
            </Link>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={updatePageMutation.isPending}
              size="small"
            >
              {updatePageMutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Canvas Area - Full Screen */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 4,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          position: "relative",
        }}
      >
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={
                store.gridStore.activeGridLayout?.grid.map(({ id }) => id) ?? []
              }
              strategy={rectSortingStrategy}
            >
              <DndGrid columns={store.gridStore.activeColumns}>
                {store.gridStore.activeGridLayout === null && (
                  <Box
                    sx={{
                      gridColumn: `1 / -1`,
                      textAlign: "center",
                      py: 4,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() =>
                        store.gridStore.addGridLayout(
                          store.gridStore.activeGridLayoutKey
                        )
                      }
                    >
                      Ajouter le breakpoint {store.gridStore.activeGridLayoutKey}
                    </Button>
                  </Box>
                )}
                {(store.gridStore.activeGridLayout?.grid ?? []).map(
                  ({ id, gridIdentifier }, index, array) => {
                    // Only render the first item of each group, hide the rest
                    const isFirstOfGroup =
                      index === 0 ||
                      array[index - 1].gridIdentifier !== gridIdentifier;

                    if (!isFirstOfGroup) {
                      // Hide duplicate items - they're part of the merged block
                      return (
                        <Box
                          key={id}
                          sx={{
                            display: "none",
                          }}
                        />
                      );
                    }

                    // Count how many consecutive items have the same gridIdentifier starting from this index
                    let span = 1;
                    let currentIndex = index;
                    while (
                      currentIndex < array.length - 1 &&
                      array[currentIndex + 1].gridIdentifier === gridIdentifier
                    ) {
                      span++;
                      currentIndex++;
                    }

                    return (
                      <Box
                        key={id}
                        sx={{
                          position: "relative",
                          gridColumn: `span ${span}`,
                          "&:hover .block-toolbar": {
                            opacity: 1,
                          },
                          "&:hover .resize-handle": {
                            opacity: 0.6,
                          },
                        }}
                      >
                        <BlockResizeHandle
                          blockId={id}
                          side="left"
                          gridIdentifier={gridIdentifier}
                        />
                        <BlockResizeHandle
                          blockId={id}
                          side="right"
                          gridIdentifier={gridIdentifier}
                        />
                        <BlockToolbar
                          store={store}
                          blockId={id}
                          gridIdentifier={gridIdentifier}
                        />
                        <DndSortableItem id={id} displayName={gridIdentifier} />
                      </Box>
                    );
                  }
                )}
              </DndGrid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
              {store.gridStore.activeId ? (
                <DndItem
                  id={store.gridStore.activeId}
                  isDragging
                  displayName={store.gridStore.activeGridIdentifier}
                />
              ) : null}
            </DragOverlay>
          </DndContext>

        {/* Floating Action Button for Adding Blocks */}
        <Fab
          color="primary"
          aria-label="add block"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
          }}
          onClick={() => setBlockPaletteOpen(true)}
        >
          <Add />
        </Fab>
      </Box>

      {/* Drawers */}
      <PageMetadataDrawer
        store={store}
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      <BlockPaletteDrawer
        store={store}
        cmsConfig={cmsConfig}
        open={blockPaletteOpen}
        onClose={() => setBlockPaletteOpen(false)}
      />
      <BlockPropertiesPanel store={store} />

      {/* Layout Props Modal (kept as modal for now) */}
      <EditLayoutPropsModal store={store} />
    </Box>
  );
});
