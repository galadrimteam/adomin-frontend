import { ContentCopy, Delete, Edit, MoreVert } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CmsPageStore } from "./CmsPageStore";

interface Props {
  store: CmsPageStore;
  blockId: string;
  gridIdentifier: string;
}

export const BlockToolbar = ({ store, blockId, gridIdentifier }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    store.gridStore.setBlockIdToEdit(blockId);
    handleClose();
  };

  const handleDelete = () => {
    store.gridStore.remove(blockId);
    handleClose();
  };

  const handleDuplicate = () => {
    store.gridStore.duplicate(blockId);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Actions">
        <IconButton
          size="small"
          onClick={handleClick}
          className="block-toolbar"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "background.paper",
            boxShadow: 2,
            zIndex: 10,
            opacity: 0,
            transition: "opacity 0.2s",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <MoreVert fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">Modifier</Typography>
        </MenuItem>
        <MenuItem onClick={handleDuplicate}>
          <ContentCopy fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">Dupliquer</Typography>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">Supprimer</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

