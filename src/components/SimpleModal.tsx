import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import { PropsWithChildren } from "react";

export interface SimpleModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  width?: string | number;
}

export const SimpleModal = ({
  onClose,
  open,
  children,
  width = 400,
}: SimpleModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        backdropFilter: "blur(3px)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width,
          maxHeight: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4.5,
          borderRadius: 4,
          overflowY: "scroll",
          msOverflowStyle: "none",
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Tooltip title="Retour">
          <IconButton
            style={{ position: "absolute", top: 5, right: 5 }}
            onClick={() => onClose()}
          >
            <Close />
          </IconButton>
        </Tooltip>
        {children}
      </Box>
    </Modal>
  );
};
