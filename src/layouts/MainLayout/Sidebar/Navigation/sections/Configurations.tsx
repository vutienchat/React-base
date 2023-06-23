import TuneIcon from '@mui/icons-material/Tune';
import { useMemo } from 'react';
import type { MenuSection } from '..';

const useConfigurations = () => {
  const configurations: MenuSection = useMemo(() => {
    return {
      title: 'Configurations',
      items: [
        {
          title: 'Configurations',
          path: '/configurations',
          icon: <TuneIcon />,
          children: [
            {
              title: 'Organisation',
              path: '/configurations/organisation',
              children: [
                {
                  title: 'Employees',
                  path: '/configurations/organisation/employees',
                },
                {
                  title: 'Company',
                  path: '/configurations/organisation/company',
                },
              ],
            },
            {
              title: 'Security',
              path: '/configurations/security',
              children: [
                {
                  title: 'Roles & Permissions',
                  path: '/configurations/security/roles-ermissions',
                },
                {
                  title: 'Authentication',
                  path: '/configurations/security/authentication',
                },
                {
                  title: 'Logs',
                  path: '/configurations/security/logs',
                },
              ],
            },
            {
              title: 'Notifications',
              path: '/configurations/notifications',
            },
          ],
        },
      ],
    };
  }, []);

  return { configurations };
};

export default useConfigurations;
