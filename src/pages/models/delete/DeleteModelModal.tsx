import { LoadingButton } from "@mui/lab";
import { Alert, Button, Divider } from "@mui/material";
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
      width={365}
    >
      <div className="w-full flex flex-col justify-center px-2">
        <h2 className="text-xl">Confirmation</h2>

        <Divider sx={{ mt: 2 }} />

        <Alert severity="warning" sx={{ my: 4 }}>
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
