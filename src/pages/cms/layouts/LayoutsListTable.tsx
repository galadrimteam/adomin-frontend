import { Refresh, Visibility } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useState } from "react";
import { getApiUrl } from "../../../axios/privateAxios";
import { HtmlPreview } from "../utils/HtmlPreview";
import { LayoutConfig } from "../utils/cms.types";
import { useCmsLayouts } from "../utils/useCmsConfig";

const COLUMNS: MRT_ColumnDef<LayoutConfig>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
];

export const LayoutsListTable = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const listQuery = useCmsLayouts();
  const table = useMaterialReactTable({
    localization: MRT_Localization_FR,
    columns: COLUMNS,
    data: listQuery.data?.layouts ?? [],
    enableRowActions: true,
    renderRowActions: ({ row }) => {
      return (
        <Box sx={{ display: "flex" }}>
          <Tooltip arrow placement="left" title="Aperçu">
            <IconButton
              onClick={() =>
                setPreviewUrl(
                  `${getApiUrl()}/adomin/api/cms/layouts/${
                    row.original.name
                  }?noHud=true&height=500&width=300`
                )
              }
            >
              <Visibility />
            </IconButton>
          </Tooltip>
        </Box>
      );
    },
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: "flex" }}>
        <Tooltip arrow title="Rafraîchir">
          <IconButton onClick={() => listQuery.refetch()}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    state: {
      isLoading: listQuery.isLoading,
      showAlertBanner: listQuery.isError,
      showProgressBars: listQuery.isRefetching,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <HtmlPreview url={previewUrl} close={() => setPreviewUrl(null)} />
    </>
  );
};
