import type { Employee } from './types';

export const STATUS = {
  ACTIVE: 1,
  INACTIVE: 2,
  ALL: 0,
};

export const GENDER = {
  FEMALE: 0,
  MALE: 1,
};

export const hiddenColumns: (keyof Employee)[] = [];
