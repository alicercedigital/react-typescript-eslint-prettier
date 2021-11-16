import { useCallback, useState } from 'react';

const useOpenCloseSwitch = (): [boolean, () => void, () => void] => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return [open, handleOpen, handleClose];
};

export default useOpenCloseSwitch;
