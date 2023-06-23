import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import type { CSSObject, Theme } from '@mui/material/styles';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Fragment, useEffect, useMemo } from 'react';
import { toggleMobileOpen, toggleSidebarOpen } from 'slices/menu';
import { useTypedDispatch, useTypedSelector } from 'store';
import { DrawerHeader } from '..';
import Navigation from './Navigation';

const Sidebar = () => {
  const dispatch = useTypedDispatch();
  const theme = useTheme();
  const sidebarOpen = useTypedSelector((state) => state.menu.sidebarOpen);
  const mobileOpen = useTypedSelector((state) => state.menu.mobileOpen);
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const handleToggleMobileOpen = () => {
    dispatch(toggleMobileOpen(!mobileOpen));
  };

  useEffect(() => {
    if (!lgUp) {
      dispatch(toggleSidebarOpen(true));
    }
  }, [lgUp, dispatch]);

  const content = useMemo(() => {
    return (
      <Fragment>
        <DrawerHeader>
          <Toolbar sx={{ px: [1] }}>Origin Portal</Toolbar>
        </DrawerHeader>
        <Divider />
        <Navigation />
      </Fragment>
    );
  }, []);

  if (lgUp) {
    return (
      <CollapsibleSidebar variant="permanent" open={sidebarOpen}>
        {content}
      </CollapsibleSidebar>
    );
  }

  return (
    <NormalSidebar
      variant="temporary"
      open={mobileOpen}
      onClose={handleToggleMobileOpen}
      ModalProps={{ keepMounted: true }}
    >
      {content}
    </NormalSidebar>
  );
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: theme.config.sidebarWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7.5)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8.5)} + 1px)`,
  },
});

const NormalSidebar = styled(Drawer)(({ theme }) => ({
  width: theme.config.sidebarWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: theme.config.sidebarWidth,
    overflowX: 'hidden',
  },
}));

const CollapsibleSidebar = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: theme.config.sidebarWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default Sidebar;
