import ActionIconButton from 'components/ProButton/ActionIconButton';
import { Tag } from 'components/ProComponents/Tags';
import ProMenu from 'components/ProMenu';
import HeaderIconAction from 'components/ProTable/components/HeaderIconAction';
import Index from 'components/ProTable/components/Index';
import type { HeadCell, ProColumn } from 'components/ProTable/types';
import { getColumnHelper } from 'components/ProTable/utils/getColumnHelper';
import useDialog from 'hooks/useDialog';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DateTime from 'utils/DateTime';
import TypedArrray from 'utils/TypedArrray';
import { STATUS } from './utils/constants';
import type { Employee } from './utils/types';

const columnHelper = getColumnHelper<Employee>();

const HEAD_CELLS: HeadCell<Employee> = {
  index: 'STT',

  fullName: 'Full name',
  avatar: 'Avatar',
  birthday: 'Date of birth',
  email: 'Email address',
  firstName: 'First name',
  lastName: 'Last Name',
  prefix: 'Prefix',
  sex: 'Sex',
  jobTitle: 'Job title',
  status: 'Status',

  actions: '#',
};

interface Props {
  pageIndex: number;
  pageSize: number;
  onEdit: (employee: Employee) => () => void;
  onShowDetail: (employee: Employee) => () => void;
  onDelete: (employee: Employee) => () => Promise<void>;
}

const useTableColumns = (props: Props) => {
  const { pageIndex, pageSize, onEdit, onShowDetail, onDelete } = props;
  const { t } = useTranslation();
  const dialog = useDialog();

  const columns: ProColumn<Employee> = useMemo(() => {
    return [
      Index<Employee>(pageIndex, pageSize),

      columnHelper.display({
        id: 'prefix',
        size: 150,
        enableSorting: true,
        header: () => HEAD_CELLS.fullName,
        cell: (context) => {
          const { prefix, firstName, lastName } = context.row.original;
          return TypedArrray.join([prefix, firstName, lastName]);
        },
        meta: {
          title: HEAD_CELLS.fullName,
        },
      }),
      columnHelper.accessor('email', {
        id: 'email',
        size: 150,
        enableSorting: true,
        header: () => HEAD_CELLS.email,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.email,
        },
      }),
      columnHelper.accessor('sex', {
        id: 'sex',
        size: 150,
        enableSorting: true,
        header: () => HEAD_CELLS.sex,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.sex,
        },
      }),
      columnHelper.accessor('jobTitle', {
        id: 'jobTitle',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.jobTitle,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.jobTitle,
        },
      }),
      columnHelper.accessor('birthday', {
        id: 'birthday',
        size: 100,
        enableSorting: true,
        header: () => HEAD_CELLS.birthday,
        cell: (context) => DateTime.Format(context.getValue()),
        meta: {
          title: HEAD_CELLS.birthday,
        },
      }),
      columnHelper.accessor('status', {
        id: 'status',
        size: 150,
        enableSorting: false,
        header: () => HEAD_CELLS.status,
        cell: (context) => {
          const status = context.getValue();
          const isActive = status === STATUS.ACTIVE;
          return (
            <Tag color={isActive ? 'success' : 'error'}>
              {isActive ? t('Active') : t('Inactive')}
            </Tag>
          );
        },
        meta: {
          title: HEAD_CELLS.status,
        },
      }),

      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => <HeaderIconAction />,
        cell: (context) => {
          const employee = context.row.original;

          const handleDelete = () => {
            dialog({
              headline: t('Delete employee'),
              supportingText: t(
                'Are you sure you want to delete this employee?'
              ),
              onConfirm: onDelete(employee),
            });
          };

          return (
            <ProMenu
              position="left"
              items={[
                {
                  label: t('View detail'),
                  value: 1,
                  onSelect: onShowDetail(employee),
                  actionType: 'view',
                },
                {
                  label: t('Edit'),
                  value: 2,
                  onSelect: onEdit(employee),
                  actionType: 'edit',
                },
                {
                  label: t('Delete'),
                  value: 3,
                  onSelect: handleDelete,
                  actionType: 'delete',
                },
              ]}
            >
              <ActionIconButton actionType="action" />
            </ProMenu>
          );
        },
        meta: {
          title: HEAD_CELLS.actions,
          align: 'center',
        },
      },
    ];
  }, [pageIndex, pageSize, onEdit, onShowDetail, onDelete, dialog, t]);

  return { columns };
};

export default useTableColumns;
