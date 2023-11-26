import { Add, Delete, Edit, Refresh } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { useQuery } from "@tanstack/react-query";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { privateAxios } from "../../../axios/privateAxios";
import { DeleteModelModal } from "../delete/DeleteModelModal";
import { useDeleteModel } from "../delete/useDeleteModel";
import { getColumn } from "../getColumn";
import { ModelData, ModelFieldsConfig } from "../model.types";
import { getModelListQueryString } from "./getModelListQueryString";
import { transformEnumValueToLabels } from "./transformEnumValueToLabels";

interface ModelGridProps {
  modelConfig: ModelFieldsConfig;
}

export interface ModelListResponse {
  data: ModelData[];
  meta: { total: number };
}

export const ModelGrid = ({
  modelConfig: { fields, name: modelName },
}: ModelGridProps) => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [validationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  // eslint-disable-next-line @typescript-eslint/ban-types
  const columns = useMemo<MRT_ColumnDef<ModelData>[]>(
    () => fields.map((field) => getColumn(field, validationErrors)),
    [fields, validationErrors]
  );

  const listQuery = useQuery({
    queryKey: [
      "models",
      modelName,
      columnFilters, //refetch when columnFilters changes
      globalFilter, //refetch when globalFilter changes
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      sorting, //refetch when sorting changes
    ],
    queryFn: async () => {
      const queryParams = getModelListQueryString(fields, {
        columnFilters,
        globalFilter,
        pagination,
        sorting,
      });

      const res = await privateAxios.get<ModelListResponse>(
        `/adomin/api/crud/${modelName}` + "?" + queryParams
      );
      return res.data;
    },
  });

  const deleteModelProps = useDeleteModel({ modelName });

  const tableRows: ModelData[] = useMemo(
    () => transformEnumValueToLabels(fields, listQuery.data?.data ?? []),
    [fields, listQuery.data]
  );

  const table = useMaterialReactTable({
    localization: MRT_Localization_FR,
    columns,
    data: tableRows,
    initialState: {},
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    enableRowActions: true,
    muiToolbarAlertBannerProps: listQuery.isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount: listQuery.data?.meta.total ?? 0,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex" }}>
        <Tooltip arrow placement="left" title="Editer">
          <Link to={`/adomin/${modelName}/${row.original.id}`}>
            <IconButton>
              <Edit />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip arrow placement="right" title="Supprimer">
          <IconButton
            color="error"
            onClick={() => deleteModelProps.setDeleteId(row.original.id)}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: "flex" }}>
        <Tooltip arrow title="Rafraîchir">
          <IconButton onClick={() => listQuery.refetch()}>
            <Refresh />
          </IconButton>
        </Tooltip>
        <Link to={`/adomin/${modelName}/create`}>
          <IconButton>
            <Add />
          </IconButton>
        </Link>
      </Box>
    ),
    state: {
      columnFilters,
      globalFilter,
      isLoading: listQuery.isLoading,
      pagination,
      showAlertBanner: listQuery.isError,
      showProgressBars: listQuery.isRefetching,
      sorting,
    },
  });

  if (listQuery.isError) {
    return (
      <div className="text-red-500">Erreur lors du chargement des données</div>
    );
  }

  return (
    <>
      <MaterialReactTable table={table} />
      <DeleteModelModal {...deleteModelProps} />
    </>
  );
};
