import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  title?: string;
}

const HeadInfo = (props: Props) => {
  const { title } = props;

  if (!title) {
    return null;
  }

  return (
    <Tooltip title={title} arrow>
      <IconButton
        size="small"
        sx={{
          ml: 0.75,
          mr: 'auto',
          p: 0,
          borderRadius: '50%',
        }}
        disableRipple
        color="info"
      >
        <InfoOutlinedIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
};

export default HeadInfo;
