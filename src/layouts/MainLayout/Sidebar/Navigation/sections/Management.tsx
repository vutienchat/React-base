import LocalMallIcon from '@mui/icons-material/LocalMall';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useMemo } from 'react';
import type { MenuSection } from '..';

const useManagement = () => {
  const management: MenuSection = useMemo(() => {
    return {
      title: 'Management',
      items: [
        {
          title: 'Customers',
          path: '/customers',
          icon: <PeopleIcon />,
          children: [
            {
              title: 'List',
              path: '/customers',
            },
            {
              title: 'Details',
              path: '/customers/1',
            },
            {
              title: 'Edit',
              path: '/customers/1/edit',
            },
          ],
        },
        {
          title: 'Products',
          path: '/dashboard/products',
          icon: <LocalMallIcon />,
          children: [
            {
              title: 'List',
              path: '/dashboard/products',
            },
            {
              title: 'Create',
              path: '/dashboard/products/new',
            },
          ],
        },
        {
          title: 'Orders',
          icon: <ShoppingCartIcon />,
          path: '/dashboard/orders',
          children: [
            {
              title: 'List',
              path: '/dashboard/orders',
            },
            {
              title: 'Details',
              path: '/dashboard/orders/1',
            },
          ],
        },
        {
          title: 'Invoices',
          path: '/dashboard/invoices',
          icon: <ReceiptIcon />,
          children: [
            {
              title: 'List',
              path: '/dashboard/invoices',
            },
            {
              title: 'Details',
              path: '/dashboard/invoices/1',
            },
          ],
        },
      ],
    };
  }, []);

  return { management };
};

export default useManagement;
