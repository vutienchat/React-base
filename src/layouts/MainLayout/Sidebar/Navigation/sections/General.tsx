import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import Typography from '@mui/material/Typography';
import { useEffect, useMemo, useState } from 'react';
import sleep from 'utils/sleep';
import type { MenuSection } from '..';

const useGeneral = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    sleep(1500).then(() => {
      setCount(100);
    });

    return () => {
      console.log('Unmounted: General');
    };
  }, []);

  const general: MenuSection = useMemo(() => {
    return {
      title: 'General',
      items: [
        {
          title: 'Overview',
          path: '/',
          icon: <HomeIcon />,
        },
        {
          title: 'Analytics',
          path: '/analytics',
          icon: <BarChartIcon />,
        },
        {
          title: 'Finance',
          path: '/finance',
          icon: <PaymentIcon />,
        },
        {
          title: 'Logistics',
          path: '/logistics',
          icon: <LocalShippingIcon />,
          info: () => {
            return <Typography variant="subtitle2">{count}</Typography>;
          },
        },
        {
          title: 'Account',
          path: '/account',
          icon: <AccountCircleIcon />,
        },
      ],
    };
  }, [count]);

  return { general };
};

export default useGeneral;
