import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import ProPopover from 'components/ProPopover';

const Settings = () => {
  return (
    <ProPopover
      element={
        <Tooltip title="Cài đặt">
          <IconButton>
            <SettingsIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      }
    >
      <Paper sx={{ p: 1.5 }}>Table settings</Paper>
    </ProPopover>
  );
};

export default Settings;
