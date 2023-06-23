import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from '@mui/material/Badge';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { usePrevious } from 'react-use';
import { toggleMobileOpen } from 'slices/menu';
import { useTypedDispatch, useTypedSelector } from 'store';
import type { MouseEvent } from 'types/react';
import type { MenuItem } from '..';

interface NavigationSectionProps {
  title: string;
  items: MenuItem[];
  pathname: string;
}

const NavigationSection = (props: NavigationSectionProps) => {
  const { title, items, pathname, ...rest } = props;

  // return (
  //   <List
  //     subheader={
  //       <ListSubheader disableSticky>
  //         <Typography variant="body2" sx={{ mb: 1, ml: 1 }}>
  //           {title}
  //         </Typography>
  //       </ListSubheader>
  //     }
  //     sx={{ mt: 2, '& + &': { mt: 2 } }}
  //     {...rest}
  //   >
  //     <NavigationSectionItems items={items} pathname={pathname} />
  //   </List>
  // );

  return (
    <List disablePadding {...rest}>
      <NavigationSectionItems items={items} pathname={pathname} />
    </List>
  );
};

interface NavigationSectionItemsProps {
  items: MenuItem[];
  pathname: string;
  level?: number;
}
const NavigationSectionItems = (props: NavigationSectionItemsProps) => {
  const { items, pathname, level = 0 } = props;

  return (
    <List disablePadding>
      {items.reduce<ReactNode[]>((acc, item, i) => {
        const { title, path, children, info, icon } = item;
        const key = `${title}-${level}-${i}`;
        const partialMatch = pathname.startsWith(path);
        const exactMatch = pathname === path;

        if (children) {
          acc.push(
            <NavigationSectionItem
              key={key}
              title={title}
              active={partialMatch}
              match={partialMatch}
              level={level}
              icon={icon}
              info={info}
              path={path}
              pathname={pathname}
            >
              <NavigationSectionItems
                items={children}
                pathname={pathname}
                level={level + 1}
              />
            </NavigationSectionItem>
          );
        } else {
          acc.push(
            <NavigationSectionItem
              key={key}
              title={title}
              active={exactMatch}
              level={level}
              icon={icon}
              info={info}
              path={path}
              pathname={pathname}
            />
          );
        }
        return acc;
      }, [])}
    </List>
  );
};

interface NavigationSectionItemProps {
  title: string;
  active?: boolean;
  children?: ReactNode;
  level: number;
  icon?: ReactNode;
  info?: () => JSX.Element;
  match?: boolean;
  path: string;
  pathname: string;
}
const NavigationSectionItem = (props: NavigationSectionItemProps) => {
  const {
    title,
    active,
    children,
    level,
    icon,
    info: Info,
    match,
    path,
    pathname,
  } = props;

  const dispatch = useTypedDispatch();
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<boolean>(Boolean(match));
  const openSidebar = useTypedSelector((state) => state.menu.sidebarOpen);
  const mobileOpen = useTypedSelector((state) => state.menu.mobileOpen);
  const prevPathName = usePrevious(pathname);

  useEffect(() => {
    if (prevPathName !== pathname && !openSidebar) {
      setAnchor(null);
    }
  }, [pathname, prevPathName, openSidebar]);

  const handleOpenMenu: MouseEvent<HTMLDivElement> = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const handleToggleExpanded = () => {
    setExpanded((expanded) => !expanded);
  };

  const handleCloseSidebar = () => {
    if (!mobileOpen) return;
    dispatch(toggleMobileOpen(false));
  };

  const paddingLeftNormal =
    level === 0 ? 3 : level === 1 ? 7.5 : 4.5 + 2.5 * level;
  const paddingLeftDense = level === 0 || level === 1 ? 3 : 2.5 * level;

  // Branch
  if (children) {
    return (
      <ListItem
        disablePadding
        disableGutters
        sx={{
          display: 'block',
          position: 'relative',
          '&:after': {
            position: 'absolute',
            display: level === 0 && active ? 'block' : 'none',
            content: '""',
            top: 0,
            left: 0,
            width: 4,
            height: 1,
            bgcolor: 'primary.main',
          },
        }}
      >
        <ListItemButton
          selected={active}
          onClick={
            openSidebar || level !== 0 ? handleToggleExpanded : handleOpenMenu
          }
          sx={{
            minHeight: 46,
            justifyContent: openSidebar ? 'initial' : 'center',
            pl: openSidebar ? paddingLeftNormal : paddingLeftDense,
            '&.Mui-selected': {
              bgcolor: 'revert',
              color: 'primary.main',
            },
          }}
        >
          {icon && (
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: openSidebar ? 2 : 'auto',
                justifyContent: 'center',
                color: active ? 'inherit' : void 0,
              }}
            >
              {!openSidebar && Info ? (
                <Badge color="info" variant="dot">
                  {icon}
                </Badge>
              ) : (
                icon
              )}
            </ListItemIcon>
          )}
          {(openSidebar || (!openSidebar && level > 0)) && (
            <ListItemText
              primary={title}
              primaryTypographyProps={{ variant: 'subtitle2' }}
            />
          )}
          {openSidebar || (!openSidebar && level > 0) ? (
            expanded ? (
              <ChevronLeftIcon sx={{ ml: 1.5 }} />
            ) : (
              <ExpandMoreIcon sx={{ ml: 1.5 }} />
            )
          ) : null}
        </ListItemButton>
        {openSidebar || level !== 0 ? (
          <Collapse in={expanded} timeout="auto">
            {children}
          </Collapse>
        ) : (
          <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            PaperProps={{ sx: { ml: 1 } }}
            MenuListProps={{ dense: true }}
          >
            {children}
          </Menu>
        )}
      </ListItem>
    );
  }

  // Standalone
  return (
    <ListItemButton
      selected={active}
      onClick={handleCloseSidebar}
      sx={{
        minHeight: 46,
        justifyContent: openSidebar ? void 0 : 'center',
        pl: openSidebar ? paddingLeftNormal : paddingLeftDense,
        '&.Mui-selected': {
          color: 'primary.main',
        },
      }}
      {...(path && {
        component: RouterLink,
        to: path,
      })}
    >
      {icon && (
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: openSidebar ? 2 : 'auto',
            justifyContent: 'center',
            color: active ? 'inherit' : void 0,
          }}
        >
          {!openSidebar && Info ? (
            <Badge color="info" variant="dot">
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </ListItemIcon>
      )}
      {(openSidebar || (!openSidebar && level > 0)) && (
        <ListItemText
          primary={title}
          primaryTypographyProps={{ variant: 'subtitle2' }}
        />
      )}
      {openSidebar && Info && <Info />}
    </ListItemButton>
  );
};

export default NavigationSection;
