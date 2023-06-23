import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LoginIcon from '@mui/icons-material/Login';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import type { LoadingButtonProps } from '@mui/lab/LoadingButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import Logger from 'utils/Logger';

const Icons = {
  search: SearchIcon,
  download: FileDownloadIcon,
  save: SaveIcon,
  cancel: CloseIcon,
  delete: DeleteIcon,
  check: CheckIcon,
  add: AddIcon,
  upload: UploadIcon,
  return: KeyboardReturnIcon,
  forward: ArrowForwardIcon,
  outward: ArrowOutwardIcon,
  login: LoginIcon,
  edit: EditIcon,
} as const;

interface Props extends LoadingButtonProps {
  actionType?: keyof typeof Icons;
  iconPosition?: 'start' | 'end';
  onSubmit?: () => Promise<void>;
}

const ActionButton = (props: Props) => {
  const {
    actionType,
    iconPosition = 'start',
    onSubmit,
    loading,
    ...rest
  } = props;

  const [submitting, setSubmitting] = useState<boolean>(false);

  const Icon = actionType && Icons[actionType];

  const handleSubmit = async () => {
    if (!onSubmit) {
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit();
    } catch (error) {
      Logger.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LoadingButton
      onClick={handleSubmit}
      loading={submitting || loading}
      {...(actionType && {
        loadingPosition: 'start',
        startIcon: Icon && iconPosition === 'start' ? <Icon /> : void 0,
        endIcon: Icon && iconPosition === 'end' ? <Icon /> : void 0,
        variant: actionType === 'cancel' ? 'outlined' : void 0,
      })}
      {...rest}
    />
  );
};

export default ActionButton;
