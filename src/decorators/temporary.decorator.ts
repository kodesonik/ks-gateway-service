import { SetMetadata } from '@nestjs/common';

export const IS_TEMPORARY_KEY = 'isTemporary';
export const Temporary = () => SetMetadata(IS_TEMPORARY_KEY, true);
