import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ActionButton from 'components/ProButton/ActionButton';
import ProForm from 'components/ProForm';
import ProFormGroup from 'components/ProForm/ProFormGroup';
import ProFormLabel from 'components/ProForm/ProFormLabel';
import ProFormTextField from 'components/ProForm/ProFormTextField';
import useAuthState from 'hooks/useAuthState';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { MouseEvent } from 'types/react';
import Logger from 'utils/Logger';
import Validation from 'utils/Validation';

interface FormValues {
  userName: string;
  password: string;
}

const LoginForm = () => {
  const { login } = useAuthState();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<FormValues>({
    mode: 'onChange',
  });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword: MouseEvent = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      await login(values);
    } catch (error) {
      Logger.log(error);
    }
  };

  return (
    <ProForm form={form} onFinish={handleSubmit}>
      <ProFormGroup>
        <ProFormLabel required title="Email address" name="userName">
          <ProFormTextField
            name="userName"
            validate={Validation.email()}
            type="email"
          />
        </ProFormLabel>
        <ProFormLabel required title="Password" name="password">
          <ProFormTextField
            name="password"
            validate={Validation.string()}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </ProFormLabel>
      </ProFormGroup>
      <Box sx={{ mt: 3 }}>
        <ActionButton
          size="large"
          type="submit"
          fullWidth
          actionType="login"
          loading={form.formState.isSubmitting}
        >
          Log In
        </ActionButton>
      </Box>
    </ProForm>
  );
};

export default LoginForm;
