import {
  BadGatewayException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles) {
      return true;
    }

    if (validRoles.length === 0) {
      return true;
    }

    // check if user has valid roles:
    const user: User = context.switchToHttp().getRequest().user;

    if (!user) {
      throw new BadGatewayException('User not found');
    }

    const hasRole = () => user.roles.some((role) => validRoles.includes(role));

    if (!hasRole()) {
      throw new BadGatewayException('User not allowed: ' + user.roles);
    }
    return hasRole();
  }
}
