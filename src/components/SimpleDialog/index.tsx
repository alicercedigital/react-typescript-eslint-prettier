import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export interface IDialogData {
  title: string;
  text: string;
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
  </Dialog>
);

export default SimpleDialog;
