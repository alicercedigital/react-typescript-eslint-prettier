import { Drawer as MuiDrawer, Box } from '@mui/material';

import { FC, memo, ReactNode } from 'react';

interface IParams {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
}

const RightDrawer: FC<IParams> = ({ open, handleClose, children }: IParams) => (
  <MuiDrawer anchor="right" open={open} onClose={handleClose}>
    <Box
      sx={{
        width: 360,
      }}
    >
      {children}
    </Box>
  </MuiDrawer>
);
export default memo(RightDrawer);
