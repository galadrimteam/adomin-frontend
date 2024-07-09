import { Add, Delete, Edit, Refresh } from "@mui/icons-material";
import { Box, IconButton, Link as MuiLink, Tooltip } from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { Link } from "react-router-dom";
import { ADOMIN_CMS_PATH } from "../../../adominPaths";
import { getApiUrl } from "../../../axios/privateAxios";
import { BooleanCell } from "../../../components/cells/BooleanCell";
import { DateCell } from "../../../components/cells/DateCell";
import { CmsPage } from "../utils/cms.types";
import { DeletePageModal } from "./DeletePageModal";
import { useCmsPages } from "./hooks/useCmsPages";
import { useDeletePage } from "./hooks/useDeletePage";

const COLUMNS: MRT_ColumnDef<CmsPage>[] = [
  {
    accessorKey: "title",
    header: "Titre",
  },
  {
    accessorKey: "url",
    header: "URL",
    Cell: ({ cell }) => {
      const url = cell.getValue() as string;

      return (
        <MuiLink href={getApiUrl() + url} target="_blank">
          {url}
        </MuiLink>
      );
    },
  },
  {
    accessorKey: "internal_label",
    header: "Label",
  },
  {
    accessorKey: "views",
    header: "Vues",
    filterVariant: "range",
  },
  {
    accessorKey: "is_published",
    header: "Publié",
    filterVariant: "checkbox",
    Cell: BooleanCell as MRT_ColumnDef<CmsPage>["Cell"],
  },
  {
    accessorKey: "created_at",
    header: "Créé le",
    filterVariant: "date",
    Cell: DateCell as MRT_ColumnDef<CmsPage>["Cell"],
  },
  {
    accessorKey: "updated_at",
    header: "Mis à jour le",
    filterVariant: "date",
    Cell: DateCell as MRT_ColumnDef<CmsPage>["Cell"],
  },
];

export const PagesListTable = () => {
  const listQuery = useCmsPages();
  const deletePageProps = useDeletePage();
  const table = useMaterialReactTable({
    localization: MRT_Localization_FR,
    columns: COLUMNS,
    data: listQuery.data ?? [],
    enableRowActions: true,
    renderRowActions: ({ row }) => {
      return (
        <Box sx={{ display: "flex" }}>
          <Tooltip arrow placement="left" title="Editer">
            <Link to={`${ADOMIN_CMS_PATH}/pages/${row.original.id}`}>
              <IconButton>
                <Edit />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip arrow placement="right" title="Supprimer">
            <IconButton
              color="error"
              onClick={() => deletePageProps.setDeleteId(row.original.id)}
            >
              <Delete />
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
        <Link to={`${ADOMIN_CMS_PATH}/pages/create`}>
          <IconButton>
            <Add />
          </IconButton>
        </Link>
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
      <DeletePageModal {...deletePageProps} />
    </>
  );
};
