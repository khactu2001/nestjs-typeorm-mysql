import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateNormalUserDto } from './dto/create-user.dto';
import { UpdateNormalUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(@Query() params: any) {
    console.log(params);
    return this.userService.getUsers();
  }

  @Post('normal')
  createUser(@Body() normalUserDto: CreateNormalUserDto[]) {
    return this.userService.createUser(normalUserDto);
  }

  @Put('normal/:id')
  updateUser(@Param('id') id: number, @Body() body: UpdateNormalUserDto) {
    return this.userService.updateNormalUser(id, body);
  }

  @Get('normal/:id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
