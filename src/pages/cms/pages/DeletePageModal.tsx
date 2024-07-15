import { LoadingButton } from "@mui/lab";
import { Alert, Button } from "@mui/material";
import { SimpleModal } from "../../../components/SimpleModal";

export interface DeletePageModalProps {
  deleteRowMutationIsLoading: boolean;
  handleDeleteRow: () => void;
  deleteId: number | null;
  setDeleteId: (deleteId: number | null) => void;
}

export const DeletePageModal = ({
  deleteId,
  setDeleteId,
  deleteRowMutationIsLoading,
  handleDeleteRow,
}: DeletePageModalProps) => {
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
