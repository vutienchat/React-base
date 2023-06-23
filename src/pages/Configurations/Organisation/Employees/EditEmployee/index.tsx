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
import useNotification from 'hooks/useNotification';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { DialogRef } from 'types/refs';
import Logger from 'utils/Logger';
import sleep from 'utils/sleep';
import Validation from 'utils/Validation';
import { getEmployee, updateEmployee } from '../utils/services';
import type { Employee } from '../utils/types';

interface FormValues {
  email: string;
}

const schema = Validation.shape({
  email: Validation.email(),
});

interface Props {
  refetch: VoidFunction;
}

const EditEmployee = forwardRef<DialogRef<Employee>, Props>((props, ref) => {
  const { refetch } = props;
  const { t } = useTranslation();
  const setNotification = useNotification();

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

  const handleEdit = (employee: Employee) => {
    setEmployee(employee);
    setOpenDialog(true);
  };

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
    edit: handleEdit,
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

  const onSubmit = async (values: FormValues) => {
    if (!employee) {
      setNotification({ error: t('Employee is invalid') });
      return;
    }

    try {
      // Validate values before call api
      await updateEmployee({
        id: employee.id,
        ...values,
      });

      setNotification({
        message: t('Employee was successfully updated'),
      });

      handleClose();
      refetch();
    } catch (error) {
      Logger.log(error);
    }
  };

  return (
    <DialogContainer open={openDialog} onClose={handleClose} fullWidth>
      <ProForm<FormValues> form={form} onFinish={onSubmit}>
        <DialogHeader onClose={handleClose}>{t('Edit employee')}</DialogHeader>
        <DialogContent loading={isLoading}>
          <ProFormItem>
            <Grid container alignItems="flex-start" spacing={[2, 3]}>
              <Grid item xs={12} sm={6} md={6}>
                <ProFormLabel
                  required
                  title={t('Email address')}
                  name="email"
                />
                <ProFormTextField
                  name="email"
                  placeholder={t('Enter email address')}
                />
              </Grid>
            </Grid>
          </ProFormItem>
        </DialogContent>
        <DialogFooter>
          <ActionButton actionType="cancel" onClick={handleClose}>
            {t('Close')}
          </ActionButton>
          <ActionButton
            actionType="save"
            loading={form.formState.isSubmitting}
            type="submit"
            disabled={!form.formState.isValid}
          >
            {t('Update')}
          </ActionButton>
        </DialogFooter>
      </ProForm>
    </DialogContainer>
  );
});

export default EditEmployee;
