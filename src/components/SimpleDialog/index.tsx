import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface IDialogData {
  title: string;
  text: string;
  actions?: {
    confirmText: string;
    cancelText: string;
    handleConfirm: () => void;
    handleCancel: () => void;
  };
}

interface IParams {
  dialogData?: IDialogData;
  open: boolean;
  handleClose: () => void;
}

const SimpleDialog = ({ dialogData, open, handleClose }: IParams) => (
  <Dialog open={open} onClose={handleClose} role="banner">
    <DialogTitle>{dialogData?.title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{dialogData?.text}</DialogContentText>
    </DialogContent>

    {dialogData?.actions && (
      <DialogActions>
        <Button onClick={dialogData.actions.handleCancel} autoFocus color="inherit">
          {dialogData.actions.cancelText}
        </Button>
        <Button autoFocus onClick={dialogData.actions.handleConfirm} variant="contained">
          {dialogData.actions.confirmText}
        </Button>
      </DialogActions>
    )}
  </Dialog>
);

export default SimpleDialog;
