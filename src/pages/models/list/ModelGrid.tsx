import { Add, Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CenteredSpinner } from "../../../components/CenteredSpinner";
import { DeleteModelModal } from "../delete/DeleteModelModal";
import { useDeleteModel } from "../delete/useDeleteModel";
import { getColumn } from "../getColumn";
import { ModelFieldsConfig } from "../model.types";
import { useModelsListQuery } from "./useModelsListQuery";

interface ModelGridProps {
  modelConfig: ModelFieldsConfig;
}

export const ModelGrid = ({
  modelConfig: { fields, name: modelName },
}: ModelGridProps) => {
  const [validationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const columns = useMemo<MRT_ColumnDef[]>(
    () => fields.map((field) => getColumn(field, validationErrors)),
    [fields, validationErrors]
  );

  const queryProps = { modelName };

  const { listQuery } = useModelsListQuery(queryProps);
  const deleteModelProps = useDeleteModel(queryProps);

  if (listQuery.isError) {
    return (
      <div className="text-red-500">Erreur lors du chargement des données</div>
    );
  }

  if (listQuery.isLoading || listQuery.data === undefined) {
    return <CenteredSpinner />;
  }

  return (
    <>
      <MaterialReactTable
        localization={MRT_Localization_FR}
        columns={columns}
        data={listQuery.data}
        enableColumnOrdering
        enableRowActions={true}
        renderRowActions={({ row }) => (
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
        )}
        renderTopToolbarCustomActions={() => (
          <Link to={`/adomin/${modelName}/create`}>
            <IconButton>
              <Add />
            </IconButton>
          </Link>
        )}
      />
      <DeleteModelModal {...deleteModelProps} />
    </>
  );
};
