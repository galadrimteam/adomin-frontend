import { LoadingButton } from "@mui/lab";
import { Alert, Button, Divider } from "@mui/material";
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
      width={365}
    >
      <div className="w-full flex flex-col justify-center px-2">
        <h2 className="text-xl">Confirmation</h2>

        <Divider sx={{ mt: 2 }} />

        <Alert severity="warning" sx={{ my: 2 }}>
          La suppression est définitive
        </Alert>

        <div className="flex justify-center">
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
