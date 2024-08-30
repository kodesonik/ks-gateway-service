import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

export async function msResponseFormatter(request: any) {
  const res: any = await makeRequest(request);
  console.log(res);
  if (res.error) {
    if (res.status >= 400 && res.status < 500) {
      throw new BadRequestException(res.error);
    }
    if (res.status >= 500) {
      throw new InternalServerErrorException(res.error);
    }
  }

  return res;
}

const makeRequest = async (request: any) => {
  try {
    return await firstValueFrom(request);
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException(error.message);
  }
};
