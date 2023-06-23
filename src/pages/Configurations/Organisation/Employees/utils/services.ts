import Endpoints from 'constants/endpoints';
import type { HttpResponse } from 'types/shared';
import HttpClient from 'utils/HttpClient';
import type { FilterParams } from './filters';
import type { Employee } from './types';
import { generateEmployee } from './__mock__';

// Get list employee
export const getEmployees = async (params: FilterParams) => {
  return HttpClient.post<typeof params, HttpResponse<Employee[]>>(
    Endpoints.employee.search,
    params
  );
};

export const fakeGetEmployees = async (params: FilterParams) => {
  console.log(params);
  return {
    data: Array.from({ length: 35 }, () => generateEmployee()),
    message: null,
    messageCode: null,
    success: true,
    total: 35,
  };
};

// Create employee
interface CreateEmployeeParams {}
export const createEmployee = async (params: CreateEmployeeParams) => {
  return HttpClient.post<typeof params, HttpResponse>(
    Endpoints.employee.create,
    params
  );
};

// Update employee
export const updateEmployee = async (
  params: CreateEmployeeParams & { id: string }
) => {
  return HttpClient.put<typeof params, HttpResponse>(
    Endpoints.employee.update,
    params
  );
};

// Get employee detail
export const getEmployee = async (id: string) => {
  return HttpClient.get<HttpResponse<Employee>>(Endpoints.employee.detail, {
    params: { id },
  });
};

// Update employee status
interface UpdateEmployeeStatus {
  id: number;
  status: number;
}
export const updateEmployeeStatus = async (params: UpdateEmployeeStatus) => {
  return HttpClient.put<typeof params, HttpResponse>(
    Endpoints.employee.status,
    params
  );
};

// Delete employee
export const deleteEmployee = async (id: string) => {
  return HttpClient.delete<HttpResponse>(Endpoints.employee.delete, {
    params: { id },
  });
};
