import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toggleMobileOpen, toggleSidebarOpen } from 'slices/menu';
import { useTypedDispatch, useTypedSelector } from 'store';

const Header = () => {
  const theme = useTheme();
  const dispatch = useTypedDispatch();
  const sidebarOpen = useTypedSelector((state) => state.menu.sidebarOpen);
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const handleToggleSidebar = () => {
    dispatch(toggleSidebarOpen());
  };

  const handleToggleMobileOpen = () => {
    dispatch(toggleMobileOpen());
  };

  const content = (
    <Toolbar>
      <IconButton
        size="medium"
        edge="start"
        onClick={lgUp ? handleToggleSidebar : handleToggleMobileOpen}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton>
        <Badge badgeContent={4}>
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  );

  if (lgUp) {
    return (
      <CollapsibleAppBar position="fixed" open={sidebarOpen} enableColorOnDark>
        {content}
      </CollapsibleAppBar>
    );
  }

  return (
    <NormalAppBar position="fixed" enableColorOnDark>
      {content}
    </NormalAppBar>
  );
};

const NormalAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const CollapsibleAppBar = styled(AppBar, {
  shouldForwardProp: (prop: string) => !['open'].includes(prop),
})<{ open: boolean }>(({ theme, open }) => ({
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!open && {
    width: `calc(100% - ${theme.spacing(7.5)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.spacing(8.5)} + 1px)`,
    },
  }),
  ...(open && {
    marginLeft: theme.config.sidebarWidth,
    width: `calc(100% - ${theme.config.sidebarWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default Header;
