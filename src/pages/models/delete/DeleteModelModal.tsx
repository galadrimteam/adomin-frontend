import { LoadingButton } from "@mui/lab";
import { Alert, Button } from "@mui/material";
import { SimpleModal } from "../../../components/SimpleModal";

interface Props {
  deleteId: unknown;
  setDeleteId: (id: unknown) => void;
  deleteRowMutationIsLoading: boolean;
  handleDeleteRow: () => void;
}

export const DeleteModelModal = ({
  deleteId,
  setDeleteId,
  deleteRowMutationIsLoading,
  handleDeleteRow,
}: Props) => {
  return (
    <SimpleModal
      onClose={() => setDeleteId(null)}
      open={deleteId !== null}
      width={420}
    >
      <div className="w-full flex flex-col justify-center">
        <Alert severity="warning">
          La suppression est définitive, on continue ?
        </Alert>

        <div className="flex justify-center mt-6">
          <Button sx={{ mr: 2 }} onClick={() => setDeleteId(null)}>
            Annuler
          </Button>
          <LoadingButton
            sx={{ ml: 2 }}
            loading={deleteRowMutationIsLoading}
            onClick={handleDeleteRow}
            variant="contained"
            color="error"
          >
            Supprimer
          </LoadingButton>
        </div>
      </div>
    </SimpleModal>
  );
};
