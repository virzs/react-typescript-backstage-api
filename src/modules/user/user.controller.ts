import { Result } from '../../common/interface/result.interface';
import { DefaultDTOValidationPipe } from '../../common/pipes/DefaultDTOValidationPipe';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDTO } from './dto/page.dto';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get()
  @ApiOperation({ summary: '获取当前登录用户数据' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(DefaultDTOValidationPipe)
  getDetail(@Req() req) {
    return this.UserService.getDetail(req);
  }

  @Post('page')
  @ApiOperation({ summary: '获取用户分页' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(DefaultDTOValidationPipe)
  getPage(@Body() body: PageDTO): Promise<Result> {
    return this.UserService.getPage(body);
  }
}
