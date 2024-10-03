import { JsonEditor } from "json-edit-react";
import { observer } from "mobx-react-lite";
import { SimpleModal } from "../../../components/SimpleModal";
import { useIsSmallScreen } from "../../../utils/useIsSmallScreen";
import { CmsPageStore } from "./CmsPageStore";

interface Props {
  store: CmsPageStore;
}

export const EditBlockPropsModal = observer<Props>(({ store }) => {
  const handleClose = () => store.setBlockIdToEdit(null);

  const isSmallScreen = useIsSmallScreen();

  return (
    <SimpleModal
      onClose={handleClose}
      open={store.blockIdToEdit !== null}
      width={isSmallScreen ? "90%" : 650}
    >
      {store.blockPropsToEdit && (
        <JsonEditor
          data={store.blockPropsToEdit}
          onUpdate={({ newData }) => {
            store.updateBlockProps(newData as object);
          }}
          restrictDelete={({ key }) => key === "gridIdentifier"}
        />
      )}
    </SimpleModal>
  );
});
