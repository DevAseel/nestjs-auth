import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayLoad } from 'src/auth/types';

export const getCurrentUserId = createParamDecorator((_: undefined, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as JwtPayLoad;
  return user.sub;
});
