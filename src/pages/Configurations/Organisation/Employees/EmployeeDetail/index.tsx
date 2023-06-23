import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import ActionButton from 'components/ProButton/ActionButton';
import DialogContainer from 'components/ProDialog/DialogContainer';
import DialogContent from 'components/ProDialog/DialogContent';
import DialogFooter from 'components/ProDialog/DialogFooter';
import DialogHeader from 'components/ProDialog/DialogHeader';
import ProForm from 'components/ProForm';
import ProFormItem from 'components/ProForm/ProFormItem';
import ProFormLabel from 'components/ProForm/ProFormLabel';
import ProFormTextField from 'components/ProForm/ProFormTextField';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { DialogRef } from 'types/refs';
import sleep from 'utils/sleep';
import Validation from 'utils/Validation';
import { getEmployee } from '../utils/services';
import type { Employee } from '../utils/types';

interface FormValues {
  email: string;
}

const schema = Validation.shape({
  email: Validation.email(),
});

interface Props {
  onEdit: (employee: Employee) => () => void;
}

const EmployeeDetail = forwardRef<DialogRef<Employee>, Props>((props, ref) => {
  const { onEdit } = props;
  const { t } = useTranslation();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee | null>(null);

  const form = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  // #region Dialog ref
  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = async () => {
    setOpenDialog(false);
    await sleep(350);
    setEmployee(null);
    form.reset(schema.getDefault());
  };

  const handleShowDetail = (customer: Employee) => {
    setEmployee(customer);
    setOpenDialog(true);
  };

  const handleEdit = async () => {
    if (!employee) return;
    await handleClose();
    onEdit(employee)();
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
    show: handleShowDetail,
  }));
  // #endregion

  const { data, isLoading } = useQuery(
    ['employee:detail', employee],
    () => getEmployee(employee?.id || ''),
    {
      enabled: Boolean(openDialog && employee),
      select: (response) => response.data,
    }
  );

  useEffect(() => {
    if (!data) return;
    form.reset({
      email: data.email || '',
    });
  }, [form, data]);

  return (
    <DialogContainer open={openDialog} onClose={handleClose} fullWidth>
      <ProForm<FormValues> form={form}>
        <DialogHeader onClose={handleClose}>
          {t('Employee detail')}
        </DialogHeader>
        <DialogContent loading={isLoading}>
          <ProFormItem>
            <Grid container alignItems="flex-start" spacing={[2, 3]}>
              <Grid item xs={12} sm={6} md={6}>
                <ProFormLabel title={t('Email address')} name="email" />
                <ProFormTextField
                  name="email"
                  placeholder={t('Enter email address')}
                  disabled
                />
              </Grid>
            </Grid>
          </ProFormItem>
        </DialogContent>
        <DialogFooter>
          <ActionButton actionType="cancel" onClick={handleClose}>
            {t('Close')}
          </ActionButton>
          <ActionButton actionType="edit" onClick={handleEdit}>
            {t('Edit employee')}
          </ActionButton>
        </DialogFooter>
      </ProForm>
    </DialogContainer>
  );
});

export default EmployeeDetail;
