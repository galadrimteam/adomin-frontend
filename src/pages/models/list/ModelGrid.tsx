import { Add, Delete, Edit, Refresh } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { useMutation, useQuery } from "@tanstack/react-query";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getModelPath } from "../../../adominPaths";
import { privateAxios } from "../../../axios/privateAxios";
import { DeleteModelModal } from "../delete/DeleteModelModal";
import { useDeleteModel } from "../delete/useDeleteModel";
import { getColumn } from "../getColumn";
import { ModelData, ModelFieldsConfig } from "../model.types";
import { AdominAction } from "./AdominAction";
import { ExportButton } from "./ExportButton";
import { ExportFileType } from "./ExportDialog";
import { getModelListQueryString } from "./getModelListQueryString";
import { transformEnumValueToLabels } from "./transformEnumValueToLabels";
import { useActionMutation } from "./useActionMutation";
import { useModelGridParams } from "./useModelGridParams";

interface ModelGridProps {
  modelConfig: ModelFieldsConfig;
}

export interface ModelListResponse {
  data: ModelData[];
  meta: { total: number };
}

export const ModelGrid = ({
  modelConfig: {
    fields,
    name: modelName,
    staticRights,
    globalActions = [],
    instanceActions = [],
    primaryKey,
  },
}: ModelGridProps) => {
  const {
    pagination,
    setPagination,
    globalFilter,
    setGlobalFilter,
    showGlobalFilter,
    setShowGlobalFilter,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
  } = useModelGridParams();

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
        `/adomin/api/models/crud/${modelName}` + "?" + queryParams
      );
      return res.data;
    },
  });

  const actionMutation = useActionMutation(modelName, listQuery.refetch);

  const downloadExportMutation = useMutation({
    mutationFn: async (fileType: ExportFileType) => {
      const queryParams = getModelListQueryString(fields, {
        columnFilters,
        globalFilter,
        pagination,
        sorting,
      });

      const fileName = `${modelName}_${Date.now()}.${fileType}`;

      const res = await privateAxios.post(
        `/adomin/api/models/crud/export/${modelName}` +
          "?" +
          queryParams +
          `&exportType=${fileType}`,
        null,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

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
    onShowGlobalFilterChange: setShowGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount: listQuery.data?.meta.total ?? 0,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex" }}>
        {staticRights.update && (
          <Tooltip arrow placement="left" title="Editer">
            <Link
              to={getModelPath({
                name: modelName,
                type: "update",
                primaryKeyValue: row.original[primaryKey],
              })}
            >
              <IconButton>
                <Edit />
              </IconButton>
            </Link>
          </Tooltip>
        )}
        {staticRights.delete && (
          <Tooltip arrow placement="right" title="Supprimer">
            <IconButton
              color="error"
              onClick={() =>
                deleteModelProps.setDeleteId(row.original[primaryKey])
              }
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}

        {instanceActions.map((a) => (
          <AdominAction
            key={a.name}
            action={a}
            actionMutation={actionMutation}
            primaryKeyValue={row.original[primaryKey]}
          />
        ))}
      </Box>
    ),
    renderTopToolbarCustomActions: () => (
      <Box sx={{ display: "flex" }}>
        <Tooltip arrow title="Rafraîchir">
          <IconButton onClick={() => listQuery.refetch()}>
            <Refresh />
          </IconButton>
        </Tooltip>
        <ExportButton mutation={downloadExportMutation} />
        {staticRights.create && (
          <Link to={getModelPath({ name: modelName, type: "create" })}>
            <IconButton>
              <Add />
            </IconButton>
          </Link>
        )}
        {globalActions.map((a) => (
          <AdominAction
            key={a.name}
            action={a}
            actionMutation={actionMutation}
          />
        ))}
      </Box>
    ),
    state: {
      columnFilters,
      globalFilter,
      showGlobalFilter,
      isLoading: listQuery.isLoading,
      pagination,
      showAlertBanner: listQuery.isError,
      showProgressBars: listQuery.isRefetching,
      sorting,
    },
    muiPaginationProps: {
      color: "primary",
      shape: "rounded",
      variant: "outlined",
    },
    paginationDisplayMode: "pages",
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: 3,
        borderWidth: 1,
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#F8FAFC",
      },
    },
    muiTableBodyProps: {
      sx: {
        "& tr:nth-of-type(odd) > td": {
          backgroundColor: "#FFFFFF",
        },
        "& tr:nth-of-type(even) > td": {
          backgroundColor: "#F8FAFC",
        },
      },
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
