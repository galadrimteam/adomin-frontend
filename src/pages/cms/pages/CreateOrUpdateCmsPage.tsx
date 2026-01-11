import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Button, Box, Paper, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ADOMIN_CMS_PAGES_PATH } from "../../../adominPaths";
import {
  numberToString,
  stringToNumber,
} from "../../../components/form/TextFieldRhfUtils";
import { TextFieldWrapper } from "../../../components/form/TextFieldRhf";
import { notifyApiError } from "../../../errors/notifyApiError";
import { CmsConfig, CmsPage } from "../utils/cms.types";
import { CmsPageStore } from "./CmsPageStore";
import { EditLayoutPropsModal } from "./EditLayoutPropsModal";
import { PageMetadataSidebar } from "./PageMetadataSidebar";
import { BlockPalette } from "./BlockPalette";
import { BlockPropertiesPanel } from "./BlockPropertiesPanel";
import { BlockToolbar } from "./BlockToolbar";
import { DndGrid } from "./dndUtils/DndGrid";
import { DndItem } from "./dndUtils/DndItem";
import { DndSortableItem } from "./dndUtils/DndSortableItem";
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

  const { sensors, handleDragStart, handleDragEnd, handleDragCancel } =
    useSortBlocs({ store });

  const handleSubmit = () => {
    if (typeof store.formDto === "string") {
      notifyApiError({ error: store.formDto });
      return;
    }

    updatePageMutation.mutate(store.formDto);
  };

  const showPropertiesPanel = store.blockIdToEdit !== null;
  const showBlockPalette = !showPropertiesPanel;

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left Sidebar - Page Metadata */}
      <PageMetadataSidebar store={store} />

      {/* Main Canvas Area */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Header with Save/Cancel */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 0,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {page ? "Modifier la page" : "Créer une nouvelle page"}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link to={ADOMIN_CMS_PAGES_PATH}>
              <Button variant="outlined">Annuler</Button>
            </Link>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={updatePageMutation.isPending}
            >
              {updatePageMutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </Box>
        </Paper>

        {/* Grid Controls Toolbar */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 120 }}>
                Colonnes:
              </Typography>
              <TextFieldWrapper
                type="number"
                label=""
                value={store.gridStore.activeColumns}
                onChange={(v) => store.gridStore.setColumns(v)}
                stringToValue={stringToNumber}
                valueToString={numberToString}
                sx={{ width: 80 }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ minWidth: 100 }}>
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

            {store.gridStore.activeGridLayout === null && (
              <Button
                variant="outlined"
                size="small"
                onClick={() =>
                  store.gridStore.addGridLayout(
                    store.gridStore.activeGridLayoutKey
                  )
                }
              >
                Ajouter le breakpoint {store.gridStore.activeGridLayoutKey}
              </Button>
            )}
          </Box>
        </Paper>

        {/* Canvas Area */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
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
                  ({ id, gridIdentifier }) => (
                    <Box
                      key={id}
                      sx={{
                        position: "relative",
                        "&:hover .block-toolbar": {
                          opacity: 1,
                        },
                      }}
                    >
                      <BlockToolbar
                        store={store}
                        blockId={id}
                        gridIdentifier={gridIdentifier}
                      />
                      <DndSortableItem id={id} displayName={gridIdentifier} />
                    </Box>
                  )
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
        </Box>
      </Box>

      {/* Right Sidebar - Block Palette or Properties Panel */}
      {showBlockPalette && <BlockPalette store={store} cmsConfig={cmsConfig} />}
      {showPropertiesPanel && <BlockPropertiesPanel store={store} />}

      {/* Layout Props Modal (kept as modal for now) */}
      <EditLayoutPropsModal store={store} />
    </Box>
  );
});
