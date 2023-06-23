import type { DensitySeverity, HeadAction } from '../types';

export const DENSITY: Record<DensitySeverity, DensitySeverity> = {
  default: 'default',
  normal: 'normal',
  dense: 'dense',
};

export const HEAD_ACTIONS: Record<HeadAction, HeadAction> = {
  unsort: 'unsort',
  asc: 'asc',
  desc: 'desc',
  hide: 'hide',
  pinLeft: 'pinLeft',
  pinRight: 'pinRight',
  unpin: 'unpin',
};
