import CreditCardIcon from '@mui/icons-material/CreditCard';
import ErrorIcon from '@mui/icons-material/Error';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import { useMemo } from 'react';
import type { MenuSection } from '..';

const usePages = () => {
  const pages: MenuSection = useMemo(() => {
    return {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          path: '/authentication',
          icon: <LockIcon />,
          children: [
            {
              title: 'Register',
              path: '/authentication/register?disableGuard=true',
            },
            {
              title: 'Login',
              path: '/authentication/login?disableGuard=true',
            },
          ],
        },
        {
          title: 'Pricing',
          path: '/dashboard/pricing',
          icon: <CreditCardIcon />,
        },
        {
          title: 'Contact',
          path: '/contact',
          icon: <MailIcon />,
        },
        {
          title: 'Error',
          path: '/error',
          icon: <ErrorIcon />,
          children: [
            {
              title: '401',
              path: '/401',
            },
            {
              title: '404',
              path: '/404',
            },
            {
              title: '500',
              path: '/500',
            },
          ],
        },
      ],
    };
  }, []);

  return { pages };
};

export default usePages;
