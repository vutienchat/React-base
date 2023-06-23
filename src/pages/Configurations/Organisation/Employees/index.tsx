import PageBreadcrumbs from 'components/Page/PageBreadcrumbs';
import PageWrapper from 'components/Page/PageWrapper';
import ActionButton from 'components/ProButton/ActionButton';
import ProTable from 'components/ProTable';
import useNotification from 'hooks/useNotification';
import useRefresh from 'hooks/useRefresh';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { DialogRef, FiltersRef } from 'types/refs';
import Logger from 'utils/Logger';
import CreateEmployee from './CreateEmployee';
import EditEmployee from './EditEmployee';
import EmployeeDetail from './EmployeeDetail';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import { hiddenColumns } from './utils/constants';
import useFilters from './utils/filters';
import { deleteEmployee, fakeGetEmployees } from './utils/services';
import type { Employee } from './utils/types';

const EmployeeTable = () => {
  const { t } = useTranslation();
  const setNotification = useNotification();
  const [refresh, refetch] = useRefresh();
  const [loading, setLoading] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [total, setTotal] = useState<number>(0);

  const filtersRef = useRef<FiltersRef>(null);
  const createEmployeeRef = useRef<DialogRef<Employee>>(null);
  const editEmployeeRef = useRef<DialogRef<Employee>>(null);
  const employeeDetailRef = useRef<DialogRef<Employee>>(null);

  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } =
    useFilters();

  useEffect(() => {
    setLoading(true);
    fakeGetEmployees(filters)
      .then((response) => {
        const { data, total } = response;
        setEmployees(data || []);
        setTotal(total || 0);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filters, refresh]);

  const handleResetFilters = () => {
    filtersRef.current?.reset();
  };

  const handleSubmitFilters = () => {
    filtersRef.current?.submit();
  };

  const handleCreateEmployee = () => {
    createEmployeeRef.current?.open();
  };

  const handleEditEmployee = (employee: Employee) => () => {
    editEmployeeRef.current?.edit?.(employee);
  };

  const handleShowEmployeeDetail = (employee: Employee) => () => {
    employeeDetailRef.current?.show?.(employee);
  };

  const handleDeleteUser = (employee: Employee) => async () => {
    try {
      await deleteEmployee(employee.id);

      setNotification({
        message: t('Employee was successfully deleted'),
      });

      refetch();
    } catch (error) {
      Logger.log(error);
    }
  };

  const { columns } = useTableColumns({
    pageIndex: filters.pageIndex,
    pageSize: filters.pageSize,
    onEdit: handleEditEmployee,
    onShowDetail: handleShowEmployeeDetail,
    onDelete: handleDeleteUser,
  });

  return (
    <Fragment>
      <PageWrapper title={t('Employee')}>
        <PageBreadcrumbs title={t('Employee')} items={[]} />
        <ProTable<Employee>
          title={t('Employee')}
          loading={loading}
          columns={columns}
          data={employees}
          refetch={refetch}
          onSortingChange={onSortingChange}
          pagination={{
            page: filters.pageIndex,
            total,
            pageSize: filters.pageSize,
            onPageChange,
            onPageSizeChange,
          }}
          initialstate={{
            hiddenColumns,
            columnPinning: {
              left: ['prefix'],
            },
          }}
          filter={<FiltersForm ref={filtersRef} onSearch={onSearch} />}
          toolBar={
            <Fragment>
              <ActionButton variant="text" onClick={handleResetFilters}>
                {t('Clear filter')}
              </ActionButton>
              <ActionButton actionType="search" onClick={handleSubmitFilters}>
                {t('Search')}
              </ActionButton>
              <ActionButton actionType="add" onClick={handleCreateEmployee}>
                {t('Add employee')}
              </ActionButton>
            </Fragment>
          }
        />
      </PageWrapper>
      <EditEmployee ref={editEmployeeRef} refetch={refetch} />
      <CreateEmployee ref={createEmployeeRef} refetch={refetch} />
      <EmployeeDetail ref={employeeDetailRef} onEdit={handleEditEmployee} />
    </Fragment>
  );
};

export default EmployeeTable;
