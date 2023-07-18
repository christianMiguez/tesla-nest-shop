import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/get-raw-headers.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() req: Express.Request,
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @RawHeaders() headers: string[],
    // @Headers() headers: string[],
  ) {
    return {
      ok: true,
      message: 'This is a private route',
      user: user,
      userEmail,
      headers,
    };
  }

  @Get('private2')
  @RoleProtected(ValidRoles.ADMIN, ValidRoles.SUPER_USER)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRouteScoped(@GetUser() user: User) {
    return {
      ok: true,
      message: 'This is a private route scoped',
    };
  }

  @Get('private3')
  @Auth(ValidRoles.ADMIN)
  testingPrivateRouteScoped3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
