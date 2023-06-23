import Box from '@mui/material/Box';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationScrollbar from './components/NavigationScrollbar';
import NavigationSection from './components/NavigationSection';
import useConfigurations from './sections/Configurations';
import useGeneral from './sections/General';

export interface MenuItem {
  title: string;
  path: string;
  children?: MenuItem[];
  info?: () => JSX.Element;
  icon?: ReactNode;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

const Navigation = () => {
  const { pathname } = useLocation();
  const { general } = useGeneral();
  const { configurations } = useConfigurations();

  const sections: MenuSection[] = [general, configurations];

  return (
    <NavigationScrollbar>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
        <Box sx={{ flexGrow: 1, pt: 2 }}>
          {sections.map((section, i) => (
            <NavigationSection key={i} pathname={pathname} {...section} />
          ))}
        </Box>
      </Box>
    </NavigationScrollbar>
  );
};

export default Navigation;
