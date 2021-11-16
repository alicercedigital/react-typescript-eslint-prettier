import { Drawer as MuiDrawer, Box } from '@mui/material';

import { FC, memo, ReactNode } from 'react';

interface IParams {
  open: boolean;
  children: ReactNode;
}

const RightDrawer: FC<IParams> = ({ open, children }) => (
  <MuiDrawer anchor="right" open={open}>
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
