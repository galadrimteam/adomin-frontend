import { Alert, Box, Chip } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import type { ModelData } from '../../pages/models/model.types'
import { useModelConfig } from '../../pages/models/ModelConfigContext'

export const SelectArrayCell: MRT_ColumnDef<ModelData>['Cell'] = ({ cell }) => {
  const modelConfig = useModelConfig()
  const columnName = cell.getContext().column.id
  const field = modelConfig.fields.find((field) => field.name === columnName)
  const cellValue = cell.getValue()
  const stringArray = Array.isArray(cellValue) ? cellValue : []

  if (field?.adomin.type !== 'array' || !field.adomin.options) {
    return <Alert severity="error">Erreur lors du chargement du champ</Alert>
  }

  const options = field.adomin.options

  return (
    <Box>
      {stringArray.map((value) => (
        <Chip
          key={value}
          label={options.find((option) => option.value === value)?.label}
          size="small"
          className="m-1"
        />
      ))}
    </Box>
  )
}