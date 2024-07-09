import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { ContentCopy, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, IconButton } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ADOMIN_CMS_PAGES_PATH } from "../../../adominPaths";
import { CheckboxWrapper } from "../../../components/form/CheckboxRhf";
import { DoubleFields } from "../../../components/form/MultipleFields";
import { TextFieldWrapper } from "../../../components/form/TextFieldRhf";
import {
  numberToString,
  stringToNumber,
} from "../../../components/form/TextFieldRhfUtils";
import { BasicSelect } from "../../../components/form/selects/BasicSelect";
import { CmsConfig, CmsPage } from "../utils/cms.types";
import { CmsPageStore } from "./CmsPageStore";
import { DndGrid } from "./dndUtils/DndGrid";
import Item from "./dndUtils/Item";
import SortableItem from "./dndUtils/SortableItem";
import { useSortBlocs } from "./dndUtils/useSortBlocs";

interface Props {
  cmsConfig: CmsConfig;
  page?: CmsPage;
}

export const CreateOrUpdateCmsPage = observer<Props>(({ page, cmsConfig }) => {
  const store = useMemo(
    () => new CmsPageStore(cmsConfig, page),
    [cmsConfig, page]
  );

  const { sensors, handleDragStart, handleDragEnd, handleDragCancel } =
    useSortBlocs({ store });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("submit");
  };

  return (
    <form
      className="bg-white rounded-md w-[80%] mt-8 p-4"
      onSubmit={handleSubmit}
    >
      <DoubleFields my={2}>
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
      </DoubleFields>
      <DoubleFields my={2}>
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
      </DoubleFields>
      <DoubleFields my={2}>
        <BasicSelect
          options={store.layoutOptions}
          label="Choisir un layout"
          value={store.page.config.layout?.name ?? ""}
          onChange={(v) => store.setLayout(v)}
        />

        <BasicSelect
          options={store.blockOptions}
          label="Ajouter un bloc"
          value={""}
          onChange={(v) => store.addBlock(v)}
        />
      </DoubleFields>

      <DoubleFields my={2}>
        <TextFieldWrapper
          type="number"
          label="Nombre de colonnes"
          value={store.gridStore.columns}
          onChange={(v) => store.gridStore.setColumns(v)}
          stringToValue={stringToNumber}
          valueToString={numberToString}
        />
        <BasicSelect
          options={store.gridStore.gridLayoutsOptions}
          label="Choisir un breakpoint"
          value={store.gridStore.activeGridLayoutKey}
          onChange={(v) => store.gridStore.setActiveGridLayoutKey(v)}
        />
      </DoubleFields>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={store.blocks} strategy={rectSortingStrategy}>
          <DndGrid columns={store.gridStore.columns}>
            {(store.gridStore.activeGridLayout ?? []).map(
              ({ id, gridIdentifier }) => (
                <div key={id}>
                  <IconButton
                    sx={{
                      position: "relative",
                      top: 40,
                      right: 0,
                    }}
                    onClick={() => store.removeBlock(id)}
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    sx={{
                      position: "relative",
                      top: 40,
                    }}
                    onClick={() => store.duplicateBlock(id)}
                  >
                    <ContentCopy />
                  </IconButton>
                  <SortableItem id={id} displayName={gridIdentifier} />
                </div>
              )
            )}
          </DndGrid>
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
          {store.gridStore.activeId ? (
            <Item
              id={store.gridStore.activeId}
              isDragging
              displayName={store.gridStore.activeGridIdentifier}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="flex justify-center gap-4">
        <Link to={ADOMIN_CMS_PAGES_PATH}>
          <Button>Annuler</Button>
        </Link>
        <LoadingButton loading={false} type="submit" variant="contained">
          Sauvegarder
        </LoadingButton>
      </div>
    </form>
  );
});
