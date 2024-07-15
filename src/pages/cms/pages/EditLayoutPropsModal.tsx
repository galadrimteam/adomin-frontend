import { JsonEditor } from "json-edit-react";
import { observer } from "mobx-react-lite";
import { SimpleModal } from "../../../components/SimpleModal";
import { useIsSmallScreen } from "../../../utils/useIsSmallScreen";
import { CmsPageStore } from "./CmsPageStore";

interface Props {
  store: CmsPageStore;
}

export const EditLayoutPropsModal = observer<Props>(({ store }) => {
  const handleClose = () => store.setEditLayoutProps(false);

  const isSmallScreen = useIsSmallScreen();

  return (
    <SimpleModal
      onClose={handleClose}
      open={store.editLayoutProps}
      width={isSmallScreen ? "90%" : 650}
    >
      {store.page.config.layout && (
        <JsonEditor
          data={store.page.config.layout.props}
          onUpdate={({ newData }) => {
            store.updateLayoutProps(newData);
          }}
        />
      )}
    </SimpleModal>
  );
});
