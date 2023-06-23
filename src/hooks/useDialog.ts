import type { DialogContextValue } from 'contexts/Dialog';
import { DialogContext } from 'contexts/Dialog';
import { useContext } from 'react';

const useDialog = (): DialogContextValue => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('Forgot to wrap component in DialogProvider');
  }

  return context;
};

export default useDialog;
